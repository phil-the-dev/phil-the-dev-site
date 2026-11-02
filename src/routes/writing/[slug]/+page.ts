import { error } from '@sveltejs/kit';
import { articles, articleBodyFor } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => articles().map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const entry = articles().find((e) => e.slug === params.slug);
	const body = entry && articleBodyFor(params.slug);
	if (!entry || !body) error(404, 'Not found');
	return { entry, body };
};
