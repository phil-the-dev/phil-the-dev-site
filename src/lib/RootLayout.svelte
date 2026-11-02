<!-- Root layout shared by src/routes and src/routes-holding: global styles and the D theme shortcut. -->
<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { handleThemeKey, handleThemeStorage } from '#lib/theme.ts';

	let { children }: { children: Snippet } = $props();

	/** Announced to screen readers when D switches the theme. */
	let announcement = $state('');

	function onkeydown(e: KeyboardEvent) {
		const next = handleThemeKey(e);
		if (next) announcement = next === 'dark' ? 'Dark theme' : 'Light theme';
	}
</script>

<svelte:window {onkeydown} onstorage={handleThemeStorage} />

{@render children()}

<p class="sr-only" aria-live="polite">{announcement}</p>
