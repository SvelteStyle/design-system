<script>
  import { Alert, Button } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';

  const installNpm = `npm install @sveltestyle/sveltestyle`;

  const loadCss = `<!-- app.html — load the design system CSS once -->
<link rel="stylesheet" href="/node_modules/@sveltestyle/sveltestyle/dist/css/index.css" />`;

  const loadCssImport = `// or import it once in your root layout / entry
import '@sveltestyle/sveltestyle/css';`;

  const useComponent = `<script>
  import { Button, Card } from '@sveltestyle/sveltestyle';
<\/script>

<Card title="Welcome">
  <Button variant="primary">Get started</Button>
</Card>`;

  const themeUsage = `<script>
  import { theme } from '@sveltestyle/sveltestyle/theme';

  // toggle light / dark
  theme.toggle();
<\/script>`;

  const customTheme = `<!-- load the base, then your generated theme AFTER it -->
<link rel="stylesheet" href="/css/index.css" />
<link rel="stylesheet" href="/css/my-theme.css" />`;
</script>

<div class="shell-content-inner docs-page">

  <div class="page-header">
    <div>
      <h1 class="page-title">Getting Started</h1>
      <p class="page-subtitle">Install the library, load the CSS, and drop in your first component.</p>
    </div>
  </div>

  <Alert variant="info" title="Replace the scope">
    Examples use <code>@sveltestyle/sveltestyle</code>. Swap that for the published package name.
  </Alert>

  <section class="docs-section">
    <h2 class="docs-h2">1 · Install</h2>
    <p>Add the package with your package manager. Svelte 5 is a peer dependency.</p>
    <CodeBlock code={installNpm} lang="bash" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">2 · Load the CSS</h2>
    <p>
      The design system ships a single stylesheet that defines all design tokens (the customizable
      “overlay”) plus the structural base. Load it once, globally.
    </p>
    <CodeBlock code={loadCss} lang="html" />
    <p class="docs-or">or, if your bundler handles CSS imports:</p>
    <CodeBlock code={loadCssImport} lang="js" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">3 · Use a component</h2>
    <p>Import any component by name and use it with Svelte 5 syntax.</p>
    <CodeBlock code={useComponent} lang="svelte" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">4 · Light & dark mode</h2>
    <p>
      The <code>theme</code> store toggles a <code>data-theme</code> attribute on the document.
      All tokens have light and dark values, so components adapt automatically.
    </p>
    <CodeBlock code={themeUsage} lang="svelte" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">5 · Custom themes</h2>
    <p>
      Build a palette visually in the <a href="/theme-builder">Theme Builder</a>, export a
      drop-in <code>theme.css</code>, and load it after the base stylesheet to override the tokens.
    </p>
    <CodeBlock code={customTheme} lang="html" />
    <div style="margin-top:var(--space-4)">
      <Button variant="primary" onclick={() => (location.href = '/theme-builder')}>
        <span class="material-symbols-outlined">tune</span> Open Theme Builder
      </Button>
    </div>
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">Next steps</h2>
    <p>
      Browse the <a href="/components">Components</a> for live examples and copy-paste code, explore
      <a href="/templates">Templates</a> for full-page layouts, or check
      <a href="/colors">Colors &amp; Type</a> for the token reference.
    </p>
  </section>

</div>

<style>
  .docs-page { max-width: 56rem; }
  .docs-section { margin-top: var(--space-8); }
  .docs-h2 { font-size: var(--text-xl); font-weight: var(--font-semibold); margin-bottom: var(--space-3); }
  .docs-section > p { color: var(--color-text-muted); margin-bottom: var(--space-3); line-height: var(--leading-relaxed); }
  .docs-or { margin-top: var(--space-3) !important; }
</style>
