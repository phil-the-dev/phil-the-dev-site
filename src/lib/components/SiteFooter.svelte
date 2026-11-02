<!--
	Footer for the home page (D1) and the holding page: Mark B, optional links
	elsewhere, and the theme shortcut hint pushed right. 13px, `text-faint`.
	Mark B keeps its fixed colours in both themes; it is never recoloured.
-->
<script lang="ts">
	import type { Link } from '#lib/site.ts';

	type Props = { links?: Link[]; class?: string };
	let { links = [], class: className = '' }: Props = $props();
</script>

<footer
	class="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-[20px] pb-6 text-meta text-text-faint {className}"
>
	<img src="/mark-b.svg" width="24" height="24" alt="phil-the-dev" class="block rounded-sm" />
	{#if links.length}
		<nav aria-label="Elsewhere">
			<ul class="m-0 flex list-none flex-wrap gap-4 p-0">
				{#each links as link (link.label)}
					<li>
						<a href={link.href} class="text-text-faint no-underline hover:underline">{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
	<p class="m-0 ml-auto">
		Press <kbd
			class="rounded-sm border border-line-strong px-[5px] font-mono text-badge text-text-muted"
			>D</kbd
		> to switch theme
	</p>
</footer>
