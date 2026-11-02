<script lang="ts">
	import EntryPage from '#lib/components/EntryPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<EntryPage entry={data.entry} body={data.body} />
