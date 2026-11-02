/** Site-wide links. Phil writes the real values; every placeholder starts with "TODO:". */
export type Link = { label: string; href: string };

export const nav: Link[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Work', href: '/#work' },
	{ label: 'Writing', href: '/writing' },
	{ label: 'About', href: '/#about' }
];

export const email = 'TODO: email address';

// TODO: LinkedIn, Bluesky and mailto URLs.
export const elsewhere: Link[] = [
	{ label: 'GitHub', href: 'https://github.com/phil-the-dev' },
	{ label: 'LinkedIn', href: '#' },
	{ label: 'Bluesky', href: '#' },
	{ label: 'Email', href: '#' }
];
