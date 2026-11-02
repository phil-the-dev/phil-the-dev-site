<!-- An inline link in running text: the main place Ember appears. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = HTMLAnchorAttributes & { href: string; children: Snippet };
	let { href, children, class: className = '', ...rest }: Props = $props();
</script>

<a
	{href}
	class="text-link {className}"
	{...rest}>{@render children()}</a
>
