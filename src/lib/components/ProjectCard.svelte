<!-- One project in the Selected work grid: title, one line, status, tech tags, links. -->
<script lang="ts">
	import type { Link } from '#lib/site.ts';
	import Badge, { type Status } from './Badge.svelte';
	import TextLink from './TextLink.svelte';

	type Props = {
		title: string;
		href: string;
		description: string;
		status: Status;
		/** Up to three. */
		tags?: string[];
		/** Source, Write-up, Live. */
		links?: Link[];
	};
	let { title, href, description, status, tags = [], links = [] }: Props = $props();
</script>

<article
	class="flex min-w-0 flex-col gap-3 rounded-sm border border-line bg-surface p-5 hover:border-line-strong"
>
	<h3 class="m-0 font-display text-heading">
		<a
			{href}
			class="text-text no-underline hover:underline hover:decoration-accent hover:underline-offset-[0.18em]"
			>{title}</a
		>
	</h3>
	<p class="m-0 text-body-small text-text-muted">{description}</p>
	<div class="flex flex-wrap gap-2">
		<Badge {status} />
		{#each tags.slice(0, 3) as tag, i (i)}
			<Badge label={tag} />
		{/each}
	</div>
	{#if links.length}
		<p class="mt-auto mb-0 flex flex-wrap gap-4 pt-2 text-body-small">
			{#each links as link (link.label)}
				<TextLink href={link.href}>{link.label}</TextLink>
			{/each}
		</p>
	{/if}
</article>
