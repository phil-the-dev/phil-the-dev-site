import { articles } from '#lib/content.ts';
import { siteUrl } from '#lib/site.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

const esc = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

/** RSS 2.0 feed of published articles, linked from the nav. */
export const GET: RequestHandler = () => {
	const items = articles()
		.filter((a) => !a.draft)
		.map((a) => {
			const link = `${siteUrl}/writing/${a.slug}`;
			return `
		<item>
			<title>${esc(a.title)}</title>
			<link>${esc(link)}</link>
			<guid>${esc(link)}</guid>
			<pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate>${
				a.description ? `\n\t\t\t<description>${esc(a.description)}</description>` : ''
			}
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>phil-the-dev</title>
		<link>${esc(siteUrl)}</link>
		<description>Careful about the boring parts.</description>
		<language>en</language>${items}
	</channel>
</rss>
`;
	return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
};
