import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.BASE_PATH || ''
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore 404s for pages not yet created; match by suffix so it works with any base path
				if (/\/(projects|blog|about)\/?$/.test(path)) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
