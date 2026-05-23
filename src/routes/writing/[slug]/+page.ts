import { error } from '@sveltejs/kit';
import type { PostMeta } from '../+page.js';

const postModules = import.meta.glob('/src/lib/posts/*.md');

export async function entries() {
	return Object.keys(postModules).map((path) => ({
		slug: path.split('/').pop()!.replace('.md', '')
	}));
}

export async function load({ params }) {
	const loader = postModules[`/src/lib/posts/${params.slug}.md`];
	if (!loader) error(404, 'Post not found');

	const mod = (await loader()) as { default: unknown; metadata: PostMeta };
	return {
		content: mod.default,
		meta: mod.metadata
	};
}
