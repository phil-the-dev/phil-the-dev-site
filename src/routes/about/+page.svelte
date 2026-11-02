<!-- About: the portrait and bio, moved here from the home page unchanged. -->
<script lang="ts">
	import Band from '#lib/components/Band.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Portrait from '#lib/components/Portrait.svelte';
	import { elsewhere, innerNav } from '#lib/site.ts';
</script>

<svelte:head>
	<title>About · phil-the-dev</title>
	<meta name="description" content="TODO: one-sentence description of the About page." />
</svelte:head>

<Header nav={innerNav} />

<main>
	<Band id="about" title="About" level={1}>
		<div class="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-5 max-about:grid-cols-1">
			<Portrait />
			<div>
				<p class="mt-0 mb-4 max-w-measure">
					TODO: bio, in Phil's words. Two short paragraphs with real project names and numbers.
				</p>
				<p class="m-0 max-w-measure">TODO: second paragraph.</p>
			</div>
		</div>
	</Band>
</main>

<Footer links={elsewhere} />
