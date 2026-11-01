<!-- The bar at the top of every page: small wordmark (links home) and main navigation. -->
<script lang="ts">
	import type { Link } from '#lib/site.ts';
	import Wordmark from './Wordmark.svelte';

	type Props = { nav: Link[]; current?: string };
	let { nav, current }: Props = $props();
</script>

<header class="bg-surface">
	<div class="wrap">
		<div class="flex flex-wrap items-center justify-between gap-5 border-b border-line py-5">
			<Wordmark as="a" href="/" class="text-text no-underline" />
			<nav aria-label="Main" class="flex flex-wrap gap-5">
				{#each nav as item (item.href)}
					<a
						href={item.href}
						aria-current={item.href === current ? 'page' : undefined}
						class="text-body-small text-text-muted no-underline hover:text-text aria-[current=page]:text-text aria-[current=page]:underline aria-[current=page]:decoration-line-strong aria-[current=page]:underline-offset-[0.3em]"
						>{item.label}</a
					>
				{/each}
			</nav>
		</div>
	</div>
</header>
