<!--
	Home (D1, "index"): one centred column with the nav, the masthead, an intro,
	a list of work, the latest writing and the footer. Role tokens only.
-->
<script lang="ts">
	import Badge from '#lib/components/Badge.svelte';
	import HomeNav from '#lib/components/HomeNav.svelte';
	import Masthead from '#lib/components/Masthead.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import TextLink from '#lib/components/TextLink.svelte';
	import { articles, featuredProjects } from '#lib/content.ts';
	import { elsewhere, nav } from '#lib/site.ts';

	const projects = featuredProjects();
	const posts = articles().slice(0, 5);
	const placeholderPosts = 3;

	const rowLink = 'text-text no-underline underline-offset-[0.18em] hover:underline';
</script>

<svelte:head>
	<title>phil-the-dev</title>
	<meta name="description" content="TODO: one-sentence site description." />
</svelte:head>

<div class="bg-surface text-text">
	<div class="column">
		<HomeNav {nav} />

		<main>
			<Masthead class="mt-[72px]" />

			<p class="mt-6 mb-0 max-w-[58ch] text-[18px] leading-[1.6]">
				Hi, I'm Phil. TODO: two sentences in your words, with one specific thing you build and one
				you keep running.
			</p>

			<section id="work" aria-labelledby="work-title" class="mt-[72px]">
				<h2 id="work-title" class="m-0 font-display text-heading">Work</h2>
				<ul class="mt-3 mb-0 list-none p-0">
					{#each projects as project (project.slug)}
						<li class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line py-[14px]">
							<a href="/projects/{project.slug}" class="flex-[1_1_260px] font-medium {rowLink}"
								>{project.title}</a
							>
							<p class="m-0 flex-[999_1_200px] text-body-small text-text-muted">
								{project.description ?? ''}
							</p>
							<span class="flex-none"><Badge status={project.status} /></span>
						</li>
					{/each}
				</ul>
			</section>

			<section id="writing" aria-labelledby="writing-title" class="mt-[56px]">
				<h2 id="writing-title" class="m-0 font-display text-heading">Writing</h2>
				<ul class="mt-3 mb-0 list-none p-0">
					{#each posts as post (post.slug)}
						<li class="flex items-baseline border-t border-line py-[10px]">
							<time datetime={post.date} class="w-[96px] flex-none text-meta text-text-faint"
								>{post.date}</time
							>
							<a href="/writing/{post.slug}" class="min-w-0 {rowLink}">{post.title}</a>
						</li>
					{:else}
						{#each { length: placeholderPosts }, i (i)}
							<li class="flex items-baseline border-t border-line py-[10px]">
								<span class="w-[96px] flex-none text-meta text-text-faint">TODO: date</span>
								<span class="min-w-0">TODO: post title</span>
							</li>
						{/each}
					{/each}
				</ul>
				<p class="mt-4 mb-0"><TextLink href="/writing">All writing</TextLink></p>
			</section>
		</main>

		<SiteFooter links={elsewhere} class="mt-[72px]" />
	</div>
</div>
