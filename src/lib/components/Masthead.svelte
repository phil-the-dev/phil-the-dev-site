<!--
	The masthead (D1): the wordmark as the page's h1, the tagline and the word strip,
	closed by a `line` hairline. Shared by the home page and the holding page.
	Role tokens only, so it follows the active theme like every other section.
	The copy is fixed by the design system.
-->
<script lang="ts">
	import Wordmark from './Wordmark.svelte';

	let { class: className = '' }: { class?: string } = $props();
</script>

<header class="masthead {className}">
	<Wordmark as="h1" size="custom" class="mark" />
	<p class="tagline"><u>Careful</u> about the boring parts.</p>
	<p class="strip">practical · maintained · documented</p>
</header>

<style>
	.masthead {
		padding-bottom: 28px;
		border-bottom: 1px solid var(--line);
	}
	.masthead :global(.mark) {
		color: var(--text);
		font-weight: 800;
		font-size: clamp(2rem, 7vw, 3.25rem);
		line-height: 1;
		letter-spacing: -0.04em;
	}
	.tagline {
		margin: 18px 0 0;
		color: var(--text);
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 22px;
		line-height: 1.25;
		letter-spacing: -0.01em;
	}
	.tagline u {
		text-decoration-color: var(--accent);
		text-decoration-thickness: 0.12em;
		text-underline-offset: 0.18em;
	}
	.strip {
		margin: 10px 0 0;
		color: var(--text-muted);
		font-size: 15px;
	}
</style>
