<!-- Inline code: the same mono at 0.88em on `surface-code`. Styles in app.css (.code-inline). -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<code class="code-inline">{@render children()}</code>
