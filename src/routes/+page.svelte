<script lang="ts">
  import { base } from "$app/paths";
</script>

<svelte:head>
  <title>Jacopo Barone - Data Scientist</title>
</svelte:head>

<section class="hero">
  <h1>Jacopo Barone - Data Scientist</h1>

  <div class="intro">
    <p>
      I'm a Data Scientist working for the UK government, currently focused on
      containerised trade.
    </p>
    <p>
      My background is in cognitive neuroscience and I hold a PhD in
      neuroimaging, with research centred on neural oscillations in the motor
      system.
    </p>
    <p>I created this space to share my projects and ideas.</p>
    <p>
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

  <a href="{base}/projects/" class="cta">View projects →</a>
</section>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--color-text);
    margin: 0;
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-width: 60ch;
  }

  .intro p {
    font-size: var(--font-size-lg, 1.125rem);
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.7;
  }

  .social-icon-link {
    display: inline-flex;
    align-items: center;
    color: var(--color-accent);
    vertical-align: middle;
    line-height: 1;
    text-decoration: none;
  }

  .social-icon-link:hover {
    opacity: 0.75;
  }

  .cta {
    display: inline-block;
    align-self: flex-start;
    border: 1px solid var(--color-border);
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    text-decoration: none;
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }

  .cta:hover {
    color: var(--color-text);
    border-color: var(--color-accent);
  }
</style>
