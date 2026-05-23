export interface PostMeta {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
}

export async function load() {
	const modules = import.meta.glob('/src/lib/posts/*.md', { eager: true });

	const posts: PostMeta[] = Object.entries(modules).map(([path, mod]) => {
		const slug = path.split('/').pop()!.replace('.md', '');
		const { title, date, description, tags } = (mod as { metadata: PostMeta }).metadata;
		return { slug, title, date, description: description ?? '', tags: tags ?? [] };
	});

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts };
}
