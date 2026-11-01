<!--
	A status word with a coloured dot (maintained, experimental, archived),
	or a neutral tech tag. The word is always shown; colour never carries meaning alone.
-->
<script lang="ts">
	export type Status = 'maintained' | 'experimental' | 'archived';
	type Props = { status: Status; label?: never } | { status?: never; label: string };
	let { status, label }: Props = $props();

	const statusColor: Record<Status, string> = {
		maintained: 'text-moss',
		experimental: 'text-dusk',
		archived: 'text-claret'
	};
	const base =
		'inline-flex items-center gap-1 whitespace-nowrap rounded-sm border px-2 py-[2px] font-mono text-badge';
</script>

{#if status}
	<span
		class="{base} border-current {statusColor[
			status
		]} before:size-[6px] before:flex-none before:rounded-full before:bg-current before:content-['']"
		>{status}</span
	>
{:else}
	<span class="{base} border-line text-text-muted">{label}</span>
{/if}
