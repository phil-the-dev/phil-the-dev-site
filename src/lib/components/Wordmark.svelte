<!--
	The wordmark is type: phil-the-dev in JetBrains Mono 800, hyphens in `accent`.
	Always lowercase, always hyphenated.
-->
<script lang="ts">
	type Props = {
		as?: 'span' | 'a' | 'h1' | 'p';
		href?: string;
		size?: 'small' | 'large';
		class?: string;
		/** Class for the hyphens; defaults to the `accent` role token. */
		hyphenClass?: string;
		'aria-hidden'?: 'true';
	};
	let {
		as = 'span',
		href,
		size = 'small',
		class: className = '',
		hyphenClass = 'text-accent',
		...rest
	}: Props = $props();
</script>

<svelte:element
	this={as}
	href={as === 'a' ? href : undefined}
	class="m-0 font-mono whitespace-nowrap {size === 'small'
		? 'text-wordmark-small'
		: 'text-wordmark'} {className}"
	{...rest}>phil<span class={hyphenClass}>-</span>the<span class={hyphenClass}>-</span>dev</svelte:element
>
