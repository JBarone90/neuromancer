import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		lightningcss: {
			// Tachyons contains a legacy *zoom IE hack that LightningCSS rejects
			errorRecovery: true
		}
	}
});
