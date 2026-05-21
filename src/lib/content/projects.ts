export interface Project {
	title: string;
	description: string;
	tags: string[];
	url?: string;
	year?: number;
}

export const projects: Project[] = [
	{
		title: 'containerised-trade',
		description:
			'Analysis of UK containerised trade flows using vessel tracking and customs data.',
		tags: ['python', 'data-analysis', 'government'],
		year: 2024
	},
	{
		title: 'neural-oscillations',
		description:
			'PhD research on beta-band dynamics in the motor system via MEG/EEG neuroimaging.',
		tags: ['python', 'matlab', 'neuroimaging'],
		year: 2022
	},
	{
		title: 'neuromancer',
		description:
			'This site — minimal personal site built with SvelteKit, statically deployed to GitHub Pages.',
		tags: ['svelte', 'typescript', 'css'],
		url: 'https://github.com/baronej/jb-website',
		year: 2025
	}
];
