export interface Project {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  year?: number;
}

export const projects: Project[] = [
  {
    title: "containerised-trade",
    description:
      "Analysis of UK containerised trade flows across critical straits, combining vessel Automatic Identification System (AIS) and shipping instructions data.",
    tags: ["python", "data-analysis", "government"],
    url: "https://www.ons.gov.uk/businessindustryandtrade/internationaltrade/bulletins/uktradeflowsofcontainerisedproductsthroughglobalmaritimepassages/2020to2024",
    year: 2025,
  },
  {
    title: "neural-oscillations",
    description:
      "PhD research on beta-band dynamics in the motor system using Magnetoencephalography (MEG).",
    tags: ["python", "matlab", "neuroscience", "neuroimaging", "MEG"],
    url: "https://orca.cardiff.ac.uk/id/eprint/161099/",
    year: 2023,
  },
  {
    title: "neuromancer",
    description:
      "This site — minimal personal site built with SvelteKit, statically deployed to GitHub Pages.",
    tags: ["svelte", "typescript", "css"],
    url: "https://github.com/JBarone90/neuromancer",
    year: 2026,
  },
];
