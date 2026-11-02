import { error } from '@sveltejs/kit';
import { projects, projectBodyFor } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects().map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const entry = projects().find((e) => e.slug === params.slug);
	const body = entry && projectBodyFor(params.slug);
	if (!entry || !body) error(404, 'Not found');
	return { entry, body };
};
