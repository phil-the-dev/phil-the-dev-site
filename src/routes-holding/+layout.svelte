<!-- Route tree used only when UNDER_CONSTRUCTION is on (see vite.config.ts and README). -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import RootLayout from '#lib/RootLayout.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<RootLayout>{@render children()}</RootLayout>
