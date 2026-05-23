# GSAP in this project

GSAP is used for animations that CSS and Svelte's built-in directives cannot handle well:
character-level text reveals (SplitText), scroll-triggered effects (ScrollTrigger), and
coordinated multi-element timelines. For simple hover states and enter/exit transitions,
prefer CSS `transition` or Svelte's `transition:`/`in:`/`out:` directives.

GSAP is installed: `npm install gsap` (SplitText, ScrollTrigger and all plugins are
bundled — no Club membership required since v3.12).

For detailed API reference, use the official skills:
`gsap-core`, `gsap-frameworks`, `gsap-plugins`, `gsap-timeline`, `gsap-scrolltrigger`.

## Project constraints

**SSR / prerender:** this site uses `adapter-static`. All GSAP DOM manipulation must live
inside `onMount`. `gsap.registerPlugin()` is safe at module level (it does not touch the DOM).

## Canonical pattern for this project

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { SplitText } from 'gsap/SplitText';

  gsap.registerPlugin(SplitText);

  onMount(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create('#target', { type: 'chars' });
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.from(split.chars, { opacity: 0, y: 10, stagger: 0.03, duration: 0.3 });
      return () => { split.revert(); tl.kill(); };
    });
    return () => mm.revert();
  });
</script>
```

When using SplitText, add `aria-label` on the parent element — SplitText wraps
characters in `<span>`s that can confuse screen readers.
