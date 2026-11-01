<!--
	A page section: the title in a left heading column, content on the right.
	One column under 860px. Alternate `surface` and `surface-alt` between neighbours.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		id: string;
		title: string;
		note?: string;
		alt?: boolean;
		children: Snippet;
	};
	let { id, title, note, alt = false, children }: Props = $props();
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
			<h2 id="{id}-title" class="m-0 mb-3 font-display text-title">{title}</h2>
			{#if note}
				<p class="m-0 max-w-[36ch] text-body-small text-text-muted">{note}</p>
			{/if}
		</div>
		<div>{@render children()}</div>
	</div>
</section>
