<!--
	The About portrait: 4:5, radius-md, on an Ash backdrop (Band README).
	Until the real photo arrives, a labelled placeholder holds the space.
-->
<script lang="ts">
	type Props = { src?: string; alt?: string };
	let { src, alt = '' }: Props = $props();
</script>

{#if src}
	<img class="portrait object-cover" {src} {alt} width="160" height="200" />
{:else}
	<div class="portrait placeholder" role="img" aria-label="Portrait placeholder">Portrait</div>
{/if}

<style>
	.portrait {
		width: 160px;
		max-width: 100%;
		aspect-ratio: 4 / 5;
		border-radius: var(--radius-md);
		background: var(--ash);
	}
	.placeholder {
		display: grid;
		place-items: center;
		color: var(--stone);
		font-size: var(--type-meta-size);
	}
</style>
