<!--
	The project or article page (pages.md): Header, the title in the `title` style with the
	date and reading time below in `meta` / `text-faint`, a project's status Badge and tech
	tags under that, the Markdown body held to `measure`, then the Footer. No hero.
-->
<script lang="ts">
	import type { Component } from 'svelte';
	import type { Entry, Project } from '#lib/content.ts';
	import { elsewhere, nav } from '#lib/site.ts';
	import Badge from './Badge.svelte';
	import Band from './Band.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	type Props = { entry: Entry | Project; body: Component };
	let { entry, body: Body }: Props = $props();

	const project = $derived('status' in entry ? entry : undefined);
</script>

<svelte:head>
	<title>{entry.title} · phil-the-dev</title>
	{#if entry.description}<meta name="description" content={entry.description} />{/if}
</svelte:head>

<Header {nav} />

<main>
	<Band id="entry" title={entry.title} level={1}>
		{#snippet meta()}
			<p class="m-0 text-meta text-text-faint">
				<time datetime={entry.date}>{entry.date}</time> · {entry.readingMinutes} min read
			</p>
			{#if project}
				<div class="mt-3 flex flex-wrap gap-2">
					<Badge status={project.status} />
					{#each project.tags as tag, i (i)}
						<Badge label={tag} />
					{/each}
				</div>
			{/if}
		{/snippet}
		<div class="prose">
			<Body />
		</div>
	</Band>
</main>

<Footer links={elsewhere} />
