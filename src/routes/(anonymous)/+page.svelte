<script>
  // Public landing page — the front door of sveltestyle.dev.
  // Shell-less: explains what SvelteStyle is before anything else.
  import { Button, ThemeToggle } from '@sveltestyle/sveltestyle';

  const install = 'npm install @sveltestyle/sveltestyle';

  const features = [
    { icon: 'bolt',            title: 'Svelte 5, runes-first',
      desc: 'Built on $props, $state and snippets from day one — no legacy patterns, no compatibility layers.' },
    { icon: 'palette',         title: 'Themeable design tokens',
      desc: 'Every color, radius and spacing is a CSS variable. Restyle the whole library — dark mode included — without touching a component.' },
    { icon: 'space_dashboard', title: 'Nestable layouts',
      desc: 'Eight single-region app shells you compose by nesting: top bars, sidebars, icon rails, floating cards and docks.' },
    { icon: 'tune',            title: 'Visual theme builder',
      desc: 'Adjust tokens live against real components, then export your theme as CSS.' },
    { icon: 'widgets',         title: '30+ components',
      desc: 'Forms, tables, dialogs, navigation, feedback — documented, consistent, and driven by the same tokens.' },
    { icon: 'code',            title: 'Plain CSS, no build magic',
      desc: 'Styles ship as static CSS you can read, override and serve from anywhere.' },
  ];

  let copied = $state(false);
  async function copyInstall() {
    try {
      await navigator.clipboard.writeText(install);
      copied = true;
      setTimeout(() => (copied = false), 1600);
    } catch { /* clipboard unavailable — no-op */ }
  }
</script>

<svelte:head>
  <title>SvelteStyle — themeable Svelte 5 components & layouts</title>
  <meta name="description" content="SvelteStyle is an open-source Svelte 5 component library with a token-based CSS design system, nestable app layouts, dark mode, and a visual theme builder." />
</svelte:head>

<div class="land">
  <header class="land-top">
    <div class="land-brand">
      <img alt="logo" src="/logo.svg" height="64" width="64">
      SvelteStyle
    </div>
    <nav class="land-topnav">
      <a href="/getting-started">Docs</a>
      <a href="/components">Components</a>
      <a href="/templates">Layouts</a>
      <a href="https://github.com/your-username/sveltestyle" rel="external">GitHub</a>
      <ThemeToggle />
    </nav>
  </header>

  <main class="land-hero">
    <h1 class="land-title">Bake your own design&nbsp;system</h1>
    <p class="land-tagline">
      SvelteStyle is an open-source <strong>Svelte&nbsp;5</strong> component library on a
      token-based CSS design system — 30+ components, nestable app layouts,
      dark mode, and a visual theme builder. Change the tokens; everything follows.
    </p>

    <div class="land-cta">
      <Button href="/getting-started" size="lg">Get started</Button>
      <Button href="/components" variant="secondary" size="lg">Browse components</Button>
    </div>

    <button class="land-install" onclick={copyInstall} title="Copy to clipboard">
      <code>{install}</code>
      <span class="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
    </button>
  </main>

  <section class="land-features">
    {#each features as f}
      <div class="land-feature">
        <span class="material-symbols-outlined land-feature-icon">{f.icon}</span>
        <h3 class="land-feature-title">{f.title}</h3>
        <p class="land-feature-desc">{f.desc}</p>
      </div>
    {/each}
  </section>

  <footer class="land-foot">
    <span>MIT licensed.</span>
    <a href="https://github.com/your-username/sveltestyle" rel="external">Source on GitHub</a>
    <a href="/getting-started">Documentation</a>
  </footer>
</div>

<style>
  .land { min-height: 100vh; display: flex; flex-direction: column; background: var(--color-bg); color: var(--color-text); }

  .land-top { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-8); }
  .land-brand { display: inline-flex; align-items: center; gap: var(--space-3); font-weight: var(--font-bold); font-size: var(--text-lg); }
  .land-topnav { display: inline-flex; align-items: center; gap: var(--space-5); }
  .land-topnav a { color: var(--color-text-muted); text-decoration: none; font-size: var(--text-sm); font-weight: var(--font-medium); }
  .land-topnav a:hover { color: var(--color-text); }

  .land-hero { flex: 0 0 auto; max-width: 46rem; margin: 0 auto; padding: var(--space-16) var(--space-6) var(--space-10); text-align: center; }
  .land-title { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.1; font-weight: var(--font-bold); margin: 0 0 var(--space-4); }
  .land-tagline { font-size: var(--text-lg); color: var(--color-text-muted); line-height: var(--leading-relaxed); margin: 0 0 var(--space-6); }
  .land-cta { display: flex; gap: var(--space-3); justify-content: center; margin-bottom: var(--space-6); flex-wrap: wrap; }

  .land-install {
    display: inline-flex; align-items: center; gap: var(--space-3);
    padding: var(--space-3) var(--space-4); cursor: pointer;
    background: var(--color-surface); border: 1px solid var(--color-border);
    border-radius: var(--radius-md); color: var(--color-text-muted); font-size: var(--text-sm);
  }
  .land-install code { font-family: var(--font-mono, monospace); }
  .land-install .material-symbols-outlined { font-size: 1.1rem; }
  .land-install:hover { border-color: var(--color-primary); color: var(--color-text); }

  .land-features {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: var(--space-4); max-width: 64rem; margin: 0 auto; padding: var(--space-6);
  }
  .land-feature { padding: var(--space-5); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
  .land-feature-icon { color: var(--color-primary); font-size: 1.6rem; }
  .land-feature-title { margin: var(--space-2) 0; font-size: var(--text-base); font-weight: var(--font-semibold); }
  .land-feature-desc { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-relaxed); }

  .land-foot { display: flex; gap: var(--space-5); justify-content: center; padding: var(--space-8) var(--space-6); margin-top: auto; font-size: var(--text-sm); color: var(--color-text-subtle); }
  .land-foot a { color: var(--color-text-muted); text-decoration: none; }
  .land-foot a:hover { color: var(--color-text); text-decoration: underline; }
</style>
