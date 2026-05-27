<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import OscillationWave from "$lib/components/OscillationWave.svelte";
  import SpikyRule from "$lib/components/SpikyRule.svelte";
  import { projects } from "$lib/content/projects";
  import gsap from "gsap";

  const roles = ["Data Scientist", "Neuroscientist"];

  function animateHero(node: HTMLElement) {
    let roleIndex = 0;
    let cycleTimeline: gsap.core.Timeline | null = null;
    let pending: gsap.core.Tween | null = null;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.from("#hero-name-text", { opacity: 0, y: 14, duration: 0.7 }, 0.1)
          .from("#hero-subtitle",  { opacity: 0, duration: 0.4 }, "-=0.2")
          .from(".wave-container",  { opacity: 0, duration: 0.6 }, "-=0.1")
          .from("#hero-bio",        { opacity: 0, y: 8,  duration: 0.5 }, "-=0.2")
          .from("#hero-cta",        { opacity: 0, y: 6,  duration: 0.4 }, "-=0.25")
          .call(scheduleNext);
      }, node);

      function scheduleNext() {
        pending = gsap.delayedCall(2.5, cycleRole);
      }

      function cycleRole() {
        const el = node.querySelector<HTMLElement>("#hero-subtitle");
        if (!el) return;
        const next = (roleIndex + 1) % roles.length;
        cycleTimeline = gsap.timeline({ onComplete: scheduleNext });
        cycleTimeline
          .to(el, { y: "100%", duration: 0.35, ease: "power2.in" })
          .call(() => { el.textContent = roles[next]; roleIndex = next; })
          .set(el, { y: "-100%" })
          .to(el, { y: "0%", duration: 0.35, ease: "power2.out" });
      }

      return () => {
        ctx.revert();
        cycleTimeline?.kill();
        pending?.kill();
      };
    });
    return () => mm.revert();
  }
</script>

<svelte:head>
  <title>Jacopo Barone — Data Scientist</title>
  <meta
    name="description"
    content="Data Scientist working for the UK government, focused on containerised trade. Background in cognitive neuroscience and PhD in neuroimaging."
  />
  <meta property="og:title" content="Jacopo Barone — Data Scientist" />
  <meta
    property="og:description"
    content="Data Scientist working for the UK government, focused on containerised trade. Background in cognitive neuroscience and PhD in neuroimaging."
  />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Jacopo Barone — Data Scientist" />
  <meta
    name="twitter:description"
    content="Data Scientist working for the UK government, focused on containerised trade. Background in cognitive neuroscience and PhD in neuroimaging."
  />
</svelte:head>

<section class="flex flex-column" style="gap: 2rem;" {@attach animateHero}>
  <h1
    id="hero-name"
    class="f1 fw7 lh-title ma0"
    style="font-size: clamp(2.5rem, 5vw, 3rem);"
    aria-label="Jacopo Barone — Data Scientist · Neuroscientist"
  >
    <span id="hero-name-text" class="hero-name">Jacopo Barone</span><br />
    <span class="role-clip" aria-live="polite" style="margin-top: 0.3em;">
      <span id="hero-subtitle" class="db font-mono role-text" style="font-size: 0.45em; letter-spacing: 0.04em;">
        Data Scientist
      </span>
    </span>
  </h1>

  <OscillationWave />

  <div id="hero-bio" class="flex flex-column mw6" style="gap: 1rem;">
    <p class="f4 theme-muted ma0 lh-copy">
      I'm a Data Scientist working for the UK government, currently focused on
      containerised trade.
    </p>
    <p class="f4 theme-muted ma0 lh-copy">
      My background is in cognitive neuroscience and I hold a PhD in
      neuroimaging, with research centred on neural oscillations in the motor
      system.
    </p>
    <p class="f4 theme-muted ma0 lh-copy">
      I created this space to share my projects and ideas.
    </p>
    <p class="f4 theme-muted ma0 lh-copy">
      You can reach me on
      <a
        href="https://www.linkedin.com/in/baronej/"
        target="_blank"
        rel="noopener noreferrer"
        class="social-icon-link"
        aria-label="LinkedIn"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          height="18"
          aria-hidden="true"
          ><path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          /></svg
        ></a
      >.
    </p>
  </div>

  <a
    id="hero-cta"
    href="#projects"
    class="dib ba b--theme-border pv2 ph3 f6 theme-muted cta-link font-mono"
    style="align-self: flex-start;"
  >
    View projects →
  </a>
</section>

<section
  id="projects"
  class="flex flex-column"
  style="gap: 2rem; padding-top: 5rem; padding-bottom: 3rem;"
>
  <div class="section-header">
    <h2 class="f3 fw6 ma0 font-mono" style="white-space: nowrap;">projects</h2>
    <SpikyRule />
  </div>
  <div class="projects-grid">
    {#each projects as project (project.title)}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<style>
  .hero-name {
    font-family: var(--font-serif);
  }

  /* Clips the subtitle text during its roll-in / roll-out GSAP animation */
  .role-clip {
    display: block;
    overflow: hidden;
  }
  .role-text {
    display: block;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .social-icon-link {
    display: inline-flex;
    align-items: center;
    color: var(--color-accent);
    vertical-align: middle;
  }
  .social-icon-link:hover { opacity: 0.75; }

  .cta-link {
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .cta-link:hover {
    color: var(--color-text);
    border-color: var(--color-accent);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
</style>
