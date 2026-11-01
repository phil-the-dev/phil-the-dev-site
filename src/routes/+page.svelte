<script lang="ts">
	import Band from '#lib/components/Band.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Portrait from '#lib/components/Portrait.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import TextLink from '#lib/components/TextLink.svelte';
	import type { Status } from '#lib/components/Badge.svelte';
	import { elsewhere, email, nav } from '#lib/site.ts';

	type Project = {
		title: string;
		href: string;
		description: string;
		status: Status;
		tags: string[];
		links: { label: string; href: string }[];
	};

	// TODO: Phil's four projects. Statuses vary only to show each badge; replace with the real ones.
	const projects: Project[] = [
		{
			title: 'TODO: project name',
			href: '#',
			description: 'TODO: one line on what it does and who it is for.',
			status: 'maintained',
			tags: ['TODO: tech', 'TODO: tech'],
			links: [
				{ label: 'Source', href: '#' },
				{ label: 'Write-up', href: '#' }
			]
		},
		{
			title: 'TODO: project name',
			href: '#',
			description: 'TODO: one line on what it does and who it is for.',
			status: 'experimental',
			tags: ['TODO: tech'],
			links: [{ label: 'Source', href: '#' }]
		},
		{
			title: 'TODO: project name',
			href: '#',
			description: 'TODO: one line on what it does and who it is for.',
			status: 'maintained',
			tags: ['TODO: tech', 'TODO: tech', 'TODO: tech'],
			links: [
				{ label: 'Source', href: '#' },
				{ label: 'Live', href: '#' }
			]
		},
		{
			title: 'TODO: project name',
			href: '#',
			description: 'TODO: one line on what it does and who it is for.',
			status: 'archived',
			tags: ['TODO: tech'],
			links: [
				{ label: 'Source', href: '#' },
				{ label: 'Write-up', href: '#' }
			]
		}
	];
</script>

<svelte:head>
	<title>phil-the-dev</title>
	<meta name="description" content="TODO: one-sentence site description." />
</svelte:head>

<Header {nav} />

<main>
	<Hero />

	<Band id="about" title="About">
		<div class="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-5 max-about:grid-cols-1">
			<Portrait />
			<div>
				<p class="mt-0 mb-4 max-w-measure">
					TODO: bio, in Phil's words. Two short paragraphs with real project names and numbers.
				</p>
				<p class="m-0 max-w-measure">TODO: second paragraph.</p>
			</div>
		</div>
	</Band>

	<Band id="work" title="Selected work" alt>
		<div class="grid grid-cols-2 gap-5 max-cards:grid-cols-1">
			{#each projects as project, i (i)}
				<ProjectCard {...project} />
			{/each}
		</div>
	</Band>

	<Band id="elsewhere" title="Elsewhere">
		<ul class="m-0 flex list-none flex-wrap gap-4 p-0">
			{#each elsewhere as link (link.label)}
				<li><TextLink href={link.href}>{link.label}</TextLink></li>
			{/each}
		</ul>
		<p class="mt-4 mb-0 text-text-muted">{email}</p>
	</Band>
</main>

<Footer links={elsewhere} />
