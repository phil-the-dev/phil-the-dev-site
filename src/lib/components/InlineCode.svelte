<!-- Inline code: the same mono at 0.88em on `surface-code`. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<code
	class="rounded-sm border border-line bg-surface-code px-[5px] py-px font-mono text-[0.88em]"
	>{@render children()}</code
>
