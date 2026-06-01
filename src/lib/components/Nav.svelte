<script lang="ts">
  import { page } from "$app/state";
  import { base } from "$app/paths";

  const navLinks: { label: string; href: string; anchor: boolean }[] = [
    { label: "Home", href: "/", anchor: false },
    { label: "Projects", href: "/#projects", anchor: false },
    // { label: 'Writing', href: '/writing/', anchor: false },
  ];
</script>

<nav
  class="nav-sticky z-999 bg-surface bb b--theme-border nav-h flex items-center"
>
  <div class="mw8 center ph4 w-100 flex items-center justify-between">
    <a
      class="font-mono theme-accent f5 f4-ns f3-l fw6 no-underline"
      href="{base}/">neuromancer</a
    >
    <ul class="list pl0 ma0 flex items-center">
      {#each navLinks as link (link.href)}
        <li class="ml3 ml4-ns">
          <a
            href={link.anchor ? link.href : `${base}${link.href}`}
            class="theme-muted f6 f5-ns f4-l no-underline nav-link"
            class:nav-active={!link.anchor &&
              page.url.pathname === base + link.href}>{link.label}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .nav-link {
    transition: color 0.15s ease;
  }
  .nav-link:hover {
    color: var(--color-accent);
  }
  .nav-active {
    color: var(--color-accent);
  }
</style>
