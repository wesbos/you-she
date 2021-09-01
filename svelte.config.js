import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-cloudflare-workers';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
    adapter: vercel()
	},
};

export default config;
