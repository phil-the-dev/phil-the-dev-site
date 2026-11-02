<script lang="ts">
	import RootLayout from '#lib/RootLayout.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<RootLayout>{@render children()}</RootLayout>
