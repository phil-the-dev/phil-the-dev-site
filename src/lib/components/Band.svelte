<!--
	A page section: the title in a left heading column, content on the right.
	One column under 860px. Alternate `surface` and `surface-alt` between neighbours.
	`level` is 2 for bands on Home and 1 for the title of an inner page.
	`meta` renders under the title (an inner page's date, reading time, badge and tags).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		id: string;
		title: string;
		level?: 1 | 2;
		note?: string;
		alt?: boolean;
		meta?: Snippet;
		children: Snippet;
	};
	let { id, title, level = 2, note, alt = false, meta, children }: Props = $props();
</script>

<section
	{id}
	aria-labelledby="{id}-title"
	class="border-t border-line py-band text-text {alt ? 'bg-surface-alt' : 'bg-surface'}"
>
	<div
		class="wrap grid grid-cols-[minmax(0,var(--heading-column))_minmax(0,1fr)] gap-7 *:min-w-0 max-band:grid-cols-1 max-band:gap-6"
	>
		<div>
			<svelte:element this={`h${level}`} id="{id}-title" class="m-0 mb-3 font-display text-title"
				>{title}</svelte:element
			>
			{#if note}
				<p class="m-0 max-w-[36ch] text-body-small text-text-muted">{note}</p>
			{/if}
			{@render meta?.()}
		</div>
		<div>{@render children()}</div>
	</div>
</section>
