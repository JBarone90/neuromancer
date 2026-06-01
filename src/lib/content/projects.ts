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
      "Experimental analysis of UK containerised trade flows, linking vessel AIS tracking with Bill of Lading records — a public-sector first.",
    tags: ["trade", "government", "AIS", "data-linkage", "PySpark", "python"],
    url: "https://www.ons.gov.uk/businessindustryandtrade/internationaltrade/bulletins/uktradeflowsofcontainerisedproductsthroughglobalmaritimepassages/2020to2024",
    year: 2025,
  },
  {
    title: "neural-oscillations",
    description:
      "PhD research on beta-band dynamics in the human motor system using Magnetoencephalography (MEG), with a focus on rhythmic brain activity and motor performance.",
    tags: ["neuroscience", "neuroimaging", "MEG", "python", "matlab"],
    url: "https://orca.cardiff.ac.uk/id/eprint/161099/",
    year: 2023,
  },
  {
    title: "neuromancer",
    description: "This page: a minimal personal site built with Claude Code.",
    tags: ["portfolio", "claude", "svelte", "GSAP", "typescript", "css"],
    url: "https://github.com/JBarone90/neuromancer",
    year: 2026,
  },
];
