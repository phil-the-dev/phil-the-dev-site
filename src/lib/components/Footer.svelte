<!-- The bottom of every page: small wordmark, links elsewhere, and the theme shortcut hint. -->
<script lang="ts">
	import type { Link } from '#lib/site.ts';
	import Wordmark from './Wordmark.svelte';

	type Props = { links: Link[] };
	let { links }: Props = $props();
</script>

<footer class="bg-surface">
	<div class="wrap">
		<div
			class="flex flex-wrap items-center justify-between gap-x-5 gap-y-4 border-t border-line py-6 text-body-small text-text-muted"
		>
			<Wordmark class="text-text" />
			<nav aria-label="Elsewhere" class="flex flex-wrap gap-4">
				{#each links as link (link.label)}
					<a href={link.href} class="text-text-muted no-underline hover:text-text hover:underline"
						>{link.label}</a
					>
				{/each}
			</nav>
			<p class="m-0 text-meta text-text-faint">
				Press <kbd
					class="rounded-sm border border-line-strong px-[5px] font-mono text-badge text-text-muted"
					>D</kbd
				> to switch theme
			</p>
		</div>
	</div>
</footer>
