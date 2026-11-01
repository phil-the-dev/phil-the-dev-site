<!--
	The home page opener: wordmark, tagline and word strip on a split of Paper and Char.
	Two stacked layers in one grid cell. The light layer holds the real h1; the dark
	layer repeats the content aria-hidden and is clipped to the right half (bottom
	half under 700px). Uses palette swatches so it looks the same in both themes.
	The copy is fixed by the design system.
-->
<script lang="ts">
	import Wordmark from './Wordmark.svelte';
</script>

<header class="hero">
	<div class="bg" aria-hidden="true"></div>
	<div class="layer light">
		<Wordmark as="h1" size="large" class="mark" hyphenClass="hy" />
		<p class="tagline"><u>Careful</u> about the boring parts.</p>
		<p class="strip">practical · maintained · documented</p>
	</div>
	<div class="layer dark" aria-hidden="true">
		<Wordmark as="p" size="large" class="mark" hyphenClass="hy" />
		<p class="tagline"><u>Careful</u> about the boring parts.</p>
		<p class="strip">practical · maintained · documented</p>
	</div>
</header>

<style>
	.hero {
		position: relative;
		display: grid;
		overflow: hidden;
		isolation: isolate;
		background: var(--paper);
	}
	.bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		background: linear-gradient(90deg, var(--paper) 0 50%, var(--char) 50% 100%);
	}
	.layer {
		grid-area: 1 / 1;
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: clamp(3rem, 9vw, 6rem) var(--gutter);
	}
	.dark {
		clip-path: inset(0 0 0 50%);
	}
	.tagline {
		font-family: var(--type-tagline-family);
		font-weight: var(--type-tagline-weight);
		font-size: var(--type-tagline-size);
		line-height: var(--type-tagline-line-height);
		letter-spacing: var(--type-tagline-tracking);
		margin: 1.75rem 0 0.5rem;
	}
	.tagline u {
		text-decoration-thickness: 0.12em;
		text-underline-offset: 0.18em;
	}
	.strip {
		margin: 0;
		font-size: 1rem;
	}

	.light :global(.mark),
	.light .tagline {
		color: var(--ink);
	}
	.light .tagline u {
		text-decoration-color: var(--ember);
	}
	.light :global(.hy) {
		color: var(--ember);
	}
	.light .strip {
		color: var(--stone);
	}

	.dark :global(.mark),
	.dark .tagline {
		color: var(--paper);
	}
	.dark .tagline u {
		text-decoration-color: var(--ember-glow);
	}
	.dark :global(.hy) {
		color: var(--ember-glow);
	}
	.dark .strip {
		color: var(--ash);
	}

	@media (max-width: 700px) {
		.bg {
			background: linear-gradient(180deg, var(--paper) 0 50%, var(--char) 50% 100%);
		}
		.dark {
			clip-path: inset(50% 0 0 0);
		}
		.layer :global(.mark) {
			font-size: clamp(1.6rem, 10vw, 3rem);
		}
	}
</style>
