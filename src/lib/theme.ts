/**
 * Light/dark theming (README, Themes).
 * - No saved choice: tokens.css follows prefers-color-scheme.
 * - A choice is saved in localStorage and applied before first paint by the
 *   inline script in app.html, as data-theme on <html>.
 */
export type Theme = 'light' | 'dark';

const KEY = 'theme';

export function currentTheme(): Theme {
	const set = document.documentElement.dataset.theme;
	if (set === 'light' || set === 'dark') return set;
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem(KEY, theme);
	} catch {
		// Storage can be blocked; the choice then lasts for this page view only.
	}
}

export function toggleTheme(): Theme {
	const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
	applyTheme(next);
	return next;
}

const TEXT_INPUT_TYPES = new Set([
	'text', 'search', 'email', 'url', 'tel', 'password', 'number',
	'date', 'datetime-local', 'month', 'week', 'time'
]);

/** True while focus is somewhere that typing "d" should type a "d". */
export function isTextField(el: Element | null): boolean {
	if (!(el instanceof HTMLElement)) return false;
	if (el.isContentEditable) return true;
	if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) return true;
	if (el instanceof HTMLInputElement) return TEXT_INPUT_TYPES.has(el.type);
	return false;
}

/** The D shortcut: no modifier held, not in a text field. Returns the new theme, or null. */
export function handleThemeKey(e: KeyboardEvent): Theme | null {
	if (e.key !== 'd' && e.key !== 'D') return null;
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return null;
	if (e.repeat || e.isComposing || e.defaultPrevented) return null;
	if (isTextField(document.activeElement)) return null;
	return toggleTheme();
}

/** Keep other open tabs in step when the choice changes. */
export function handleThemeStorage(e: StorageEvent): void {
	if (e.key !== KEY) return;
	if (e.newValue === 'light' || e.newValue === 'dark') {
		document.documentElement.dataset.theme = e.newValue;
	} else {
		delete document.documentElement.dataset.theme;
	}
}
