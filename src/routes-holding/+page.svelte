<!--
	Under-construction holding page, shown at / while UNDER_CONSTRUCTION is on (see README).
	Same column and tokens as the home page; fills the viewport with the content
	centred and the footer pinned to the bottom. No nav. Not indexed.
-->
<script lang="ts">
	import Masthead from '#lib/components/Masthead.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import TextLink from '#lib/components/TextLink.svelte';
	import { emailHref, githubUrl } from '#lib/site.ts';

	const para = 'mb-0 max-w-[58ch] text-[18px] leading-[1.6]';
</script>

<svelte:head>
	<title>phil-the-dev</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="bg-surface text-text">
	<div class="column flex min-h-dvh flex-col">
		<main class="flex flex-1 flex-col justify-center py-6">
			<Masthead />
			<p class="mt-6 {para}">
				I'm writing this site properly. Projects and posts will go up once each one has real
				details behind it.
			</p>
			<p class="mt-4 {para}">
				Until then, my code is on <TextLink href={githubUrl}>GitHub</TextLink>, and you can reach
				me by <TextLink href={emailHref}>email</TextLink>.
			</p>
			<p class="mt-[40px] mb-0 text-meta text-text-faint">Last updated TODO: date</p>
		</main>
		<SiteFooter />
	</div>
</div>
