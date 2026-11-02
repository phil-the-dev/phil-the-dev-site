<!--
	The wordmark is type: phil-the-dev in JetBrains Mono 800, hyphens in `accent`.
	Always lowercase, always hyphenated. `size="small"` is the header/footer style;
	`size="custom"` leaves the size to the caller (the Masthead).
-->
<script lang="ts">
	type Props = {
		as?: 'span' | 'a' | 'h1' | 'p';
		href?: string;
		size?: 'small' | 'custom';
		class?: string;
	};
	let { as = 'span', href, size = 'small', class: className = '' }: Props = $props();
</script>

<svelte:element
	this={as}
	href={as === 'a' ? href : undefined}
	class="m-0 font-mono whitespace-nowrap {size === 'small'
		? 'text-wordmark-small'
		: ''} {className}">phil<span class="text-accent">-</span>the<span class="text-accent">-</span>dev</svelte:element
>
