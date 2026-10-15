/**
 * Preview builds (e.g. the GitHub Pages test site, VITE_PREVIEW=true) behave
 * like local dev: owner-input markers are visible and test applications are
 * kept in the visitor's browser instead of being sent anywhere.
 */
export const IS_PREVIEW = import.meta.env.DEV || import.meta.env.VITE_PREVIEW === 'true'
