<!--
	A block of code on `surface-code`. Code fences in Markdown are highlighted at build
	time (#lib/markdown/highlight.ts); for code outside Markdown pass the `html` it returns.
	Without it the code renders unhighlighted. Long lines scroll inside the block.
	Styles live in app.css (.code-block) so both paths share them.
-->
<script lang="ts">
	type Props = { code: string; lang?: string; html?: string };
	let { code, lang, html }: Props = $props();
</script>

<div class="code-block" data-lang={lang}>
	{#if html}
		<!-- Shiki output, generated at build time from repository content. -->
		{@html html}
	{:else}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre tabindex="0"><code>{code}</code></pre>
	{/if}
</div>
