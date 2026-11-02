/** Site-wide links. Phil writes the real values; every placeholder starts with "TODO:". */
export type Link = { label: string; href: string };

/** Home page navigation (D1). The masthead is the wordmark there, so there is no Home link. */
export const nav: Link[] = [
	{ label: 'Work', href: '/#work' },
	{ label: 'Writing', href: '/writing' },
	{ label: 'About', href: '/about' },
	{ label: 'RSS', href: '/rss.xml' }
];

/** Inner pages keep the small-wordmark header, plus a Home link. */
export const innerNav: Link[] = [{ label: 'Home', href: '/' }, ...nav];

/** TODO: the site's public origin, used for absolute links in the RSS feed. */
export const siteUrl = 'https://TODO.invalid';

export const githubUrl = 'https://github.com/phil-the-dev';

/** TODO: email address. */
export const email = 'TODO: email address';
/** TODO: mailto:<address>. An empty mailto opens a blank message until then. */
export const emailHref = 'mailto:';

// TODO: LinkedIn and Bluesky URLs.
export const elsewhere: Link[] = [
	{ label: 'GitHub', href: githubUrl },
	{ label: 'LinkedIn', href: '#' },
	{ label: 'Bluesky', href: '#' },
	{ label: 'Email', href: emailHref }
];
