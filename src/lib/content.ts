/**
 * Articles and projects: Markdown files in src/content, edited through Sveltia CMS
 * and compiled by mdsvex. Front matter is validated here so a bad file fails the build.
 */
import type { Component } from 'svelte';
import type { Status } from '#lib/components/Badge.svelte';

type Meta = Record<string, unknown>;
type MdModule = { default: Component; metadata?: Meta };

const articleModules = import.meta.glob<MdModule>('/src/content/articles/*.md', { eager: true });
const articleRaw = import.meta.glob<string>('/src/content/articles/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const projectModules = import.meta.glob<MdModule>('/src/content/projects/*.md', { eager: true });
const projectRaw = import.meta.glob<string>('/src/content/projects/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export type Entry = {
	slug: string;
	title: string;
	/** YYYY-MM-DD */
	date: string;
	description?: string;
	draft: boolean;
	readingMinutes: number;
};

export type ProjectLinks = { source?: string; writeup?: string; live?: string };

export type Project = Entry & {
	status: Status;
	tags: string[];
	links: ProjectLinks;
	featured: boolean;
	order: number;
};

const STATUSES: Status[] = ['maintained', 'experimental', 'archived'];
const WORDS_PER_MINUTE = 225;

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');

function str(meta: Meta, key: string, path: string): string {
	const v = meta[key];
	if (typeof v !== 'string' || !v.trim()) throw new Error(`${path}: "${key}" is required`);
	return v;
}

function optStr(meta: Meta, key: string): string | undefined {
	const v = meta[key];
	return typeof v === 'string' && v.trim() ? v : undefined;
}

function date(meta: Meta, path: string): string {
	const v = meta.date;
	// An unquoted YAML date reaches us as a full ISO timestamp; keep the day.
	const iso = v instanceof Date ? v.toISOString() : typeof v === 'string' ? v : '';
	if (!/^\d{4}-\d{2}-\d{2}(T|$)/.test(iso)) throw new Error(`${path}: "date" must be YYYY-MM-DD`);
	return iso.slice(0, 10);
}

function readingMinutes(raw: string): number {
	const body = raw.replace(/^---[\s\S]*?---/, '');
	const words = body.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function toEntry(path: string, meta: Meta, raw: string): Entry {
	return {
		slug: slugOf(path),
		title: str(meta, 'title', path),
		date: date(meta, path),
		description: optStr(meta, 'description'),
		draft: meta.draft === true,
		readingMinutes: readingMinutes(raw)
	};
}

function toProject(path: string, meta: Meta, raw: string): Project {
	const status = meta.status;
	if (!STATUSES.includes(status as Status)) {
		throw new Error(`${path}: "status" must be one of ${STATUSES.join(', ')}`);
	}
	const tags = Array.isArray(meta.tags) ? meta.tags.filter((t) => typeof t === 'string') : [];
	if (tags.length > 3) throw new Error(`${path}: at most three tags`);
	const links = (typeof meta.links === 'object' && meta.links ? meta.links : {}) as Meta;
	return {
		...toEntry(path, meta, raw),
		status: status as Status,
		tags,
		links: {
			source: optStr(links, 'source'),
			writeup: optStr(links, 'writeup'),
			live: optStr(links, 'live')
		},
		featured: meta.featured === true,
		order: typeof meta.order === 'number' ? meta.order : 0
	};
}

/** Drafts are visible in dev and left out of production builds. */
const published = (e: Entry) => import.meta.env.DEV || !e.draft;
const newestFirst = (a: Entry, b: Entry) => b.date.localeCompare(a.date);

export function articles(): Entry[] {
	return Object.entries(articleModules)
		.map(([path, mod]) => toEntry(path, mod.metadata ?? {}, articleRaw[path]))
		.filter(published)
		.sort(newestFirst);
}

export function projects(): Project[] {
	return Object.entries(projectModules)
		.map(([path, mod]) => toProject(path, mod.metadata ?? {}, projectRaw[path]))
		.filter(published)
		.sort(newestFirst);
}

/** The Selected work cards on Home: featured projects by their order. */
export function featuredProjects(): Project[] {
	return projects()
		.filter((p) => p.featured)
		.sort((a, b) => a.order - b.order);
}

export function articleBodyFor(slug: string): Component | undefined {
	return articleModules[`/src/content/articles/${slug}.md`]?.default;
}

export function projectBodyFor(slug: string): Component | undefined {
	return projectModules[`/src/content/projects/${slug}.md`]?.default;
}

/** Card links in the order the ProjectCard spec lists them. */
export function projectLinkList(p: Project): { label: string; href: string }[] {
	const out: { label: string; href: string }[] = [];
	if (p.links.source) out.push({ label: 'Source', href: p.links.source });
	if (p.links.writeup) out.push({ label: 'Write-up', href: p.links.writeup });
	if (p.links.live) out.push({ label: 'Live', href: p.links.live });
	return out;
}
