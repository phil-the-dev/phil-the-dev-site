<!--
	A block of code on `surface-code`. Pass `html` produced by #lib/server/highlight
	(Shiki with the Ink & Ember VS Code theme, light and dark); without it the code
	renders unhighlighted. Long lines scroll inside the block, never the page.
-->
<script lang="ts">
	type Props = { code: string; lang?: string; html?: string };
	let { code, lang, html }: Props = $props();
</script>

<div class="code-block" data-lang={lang}>
	{#if html}
		<!-- Shiki output, generated at build time from trusted repository content. -->
		{@html html}
	{:else}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre tabindex="0"><code>{code}</code></pre>
	{/if}
</div>

<style>
	.code-block :global(pre) {
		margin: 0;
		padding: var(--space-4) var(--space-5);
		background: var(--surface-code) !important;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		font-family: var(--type-code-family);
		font-size: var(--type-code-size);
		line-height: var(--type-code-line-height);
		color: var(--text);
		overflow-x: auto;
		white-space: pre;
	}
	.code-block :global(code) {
		font: inherit;
	}

	/* Shiki dual themes (defaultColor: false): each token carries --shiki-light and --shiki-dark. */
	.code-block :global(.shiki span) {
		color: var(--shiki-light);
	}
	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .code-block :global(.shiki span) {
			color: var(--shiki-dark);
		}
	}
	:global(:root[data-theme='dark']) .code-block :global(.shiki span) {
		color: var(--shiki-dark);
	}
</style>
