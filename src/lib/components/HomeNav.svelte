<!--
	Home page navigation (D1): right-aligned links, no wordmark, because the masthead
	below is the wordmark. Inner pages use Header, which keeps the small wordmark.
-->
<script lang="ts">
	import type { Link } from '#lib/site.ts';

	let { nav }: { nav: Link[] } = $props();
</script>

<header class="flex justify-end pt-6">
	<nav aria-label="Main">
		<ul class="m-0 flex list-none flex-wrap gap-[20px] p-0">
			{#each nav as item (item.href)}
				<li>
					<a href={item.href} class="text-body-small text-text-muted no-underline hover:text-text"
						>{item.label}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>
