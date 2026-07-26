<script>
  import {
    TopBarLayout, LeftBarLayout, RightBarLayout, BottomBarLayout,
    IconRailLayout, FloatingTopLayout, FloatingLeftLayout, FloatingDockLayout,
  } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  const importCode = `import {
  TopBarLayout, LeftBarLayout, RightBarLayout, BottomBarLayout,
  IconRailLayout, FloatingTopLayout, FloatingLeftLayout, FloatingDockLayout,
} from '@sveltestyle/sveltestyle';`;

  const menuShape = `const menu = {
  brand: { label: 'My App', icon: 'rocket_launch', href: '/' },
  active: '/projects',                    // id of the current item
  sections: [
    {
      label: 'Main',                      // optional group heading
      items: [
        { id: '/dashboard', label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
        { id: '/projects',  label: 'Projects',  icon: 'folder',    href: '/projects', badge: 8 },
        { id: '/reports',   label: 'Reports',   icon: 'bar_chart', href: '/reports',
          children: [                      // optional 2-level submenu
            { id: '/weekly',  label: 'Weekly',  href: '/weekly' },
            { id: '/monthly', label: 'Monthly', href: '/monthly' },
          ] },
      ],
    },
  ],
};`;

  const basicCode = `<script>
  let menu = $state({ brand: {...}, sections: [...], active: '/home' });
<\/script>

<TopBarLayout bind:menu>
  {#snippet children()}
    <!-- your page content -->
  {/snippet}
</TopBarLayout>

<!-- default content is also passed as children automatically: -->
<TopBarLayout bind:menu>
  <YourPage />
</TopBarLayout>`;

  const nestingCode = `<!-- Compose layouts by nesting: an outer layout's content is another layout -->
<TopBarLayout menu={topMenu}>
  <LeftBarLayout menu={sideMenu}>
    <YourPage />
  </LeftBarLayout>
</TopBarLayout>`;

  const heightCode = `<!-- The layout chain needs a height anchor at the top -->
<div style="height: 100vh">
  <TopBarLayout menu={menu}>
    <YourPage />
  </TopBarLayout>
</div>

<!-- or use the helper class -->
<div class="nl-app">   <!-- = height: 100vh -->
  ...
</div>`;

  // Shared demo menus for live examples
  const topMenu = {
    brand: { label: 'My App', icon: 'rocket_launch', href: '#' },
    active: 'projects',
    sections: [{ items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '#d' },
      { id: 'projects',  label: 'Projects',  icon: 'folder',    href: '#p' },
      { id: 'reports',   label: 'Reports',   icon: 'bar_chart', href: '#r' },
    ] }],
  };
  const leftMenu = {
    active: 'inbox',
    sections: [{ label: 'Mail', items: [
      { id: 'inbox',  label: 'Inbox',  icon: 'inbox', href: '#i', badge: 4 },
      { id: 'sent',   label: 'Sent',   icon: 'send',  href: '#s' },
      { id: 'drafts', label: 'Drafts', icon: 'draft', href: '#dr' },
    ] }],
  };
  const railMenu = {
    brand: { icon: 'auto_awesome', label: 'Home', href: '#' },
    active: 'files',
    sections: [{ items: [
      { id: 'files',  label: 'Files',  icon: 'folder',       href: '#f' },
      { id: 'search', label: 'Search', icon: 'search',       href: '#se' },
      { id: 'git',    label: 'Source', icon: 'account_tree', href: '#g', badge: 1 },
    ] }],
  };
  const dockMenu = {
    active: 'home',
    sections: [{ items: [
      { id: 'home',    label: 'Home',    icon: 'home',          href: '#h' },
      { id: 'search',  label: 'Search',  icon: 'search',        href: '#s' },
      { id: 'library', label: 'Library', icon: 'video_library', href: '#l' },
      { id: 'profile', label: 'Profile', icon: 'person',        href: '#pr' },
    ] }],
  };

  // Prop tables
  const menuProps = [
    { name: 'menu', type: 'MenuData (bindable)', default: '—', description: 'The navigation data (see contract above). Bindable so you can update it.' },
    { name: 'children', type: 'snippet', default: '—', description: 'Page content — or another layout to nest.' },
    { name: 'actions', type: 'snippet', default: 'ThemeToggle', description: 'Right-side actions (top/floating-top/bottom layouts).' },
    { name: 'footer', type: 'snippet', default: '—', description: 'Footer content (left/right/rail/floating-left layouts).' },
  ];

  const layouts = [
    { name: 'TopBarLayout', extra: 'actions', desc: 'A single horizontal top bar over content.' },
    { name: 'LeftBarLayout', extra: 'footer', desc: 'A single left sidebar beside content.' },
    { name: 'RightBarLayout', extra: 'footer', desc: 'A sidebar on the right; content on the left.' },
    { name: 'BottomBarLayout', extra: 'actions', desc: 'Content over a horizontal bottom bar.' },
    { name: 'IconRailLayout', extra: 'footer', desc: 'A slim icon-only vertical rail with hover tooltips.' },
    { name: 'FloatingTopLayout', extra: 'actions', desc: 'A detached top menu card floating over content.' },
    { name: 'FloatingLeftLayout', extra: 'footer', desc: 'A detached left menu card floating beside content.' },
    { name: 'FloatingDockLayout', extra: '—', desc: 'A centered floating dock of icons near the bottom.' },
  ];
</script>

<DocsPage title="Layout reference" subtitle="Single-region app shells you compose by nesting. Each is driven by one bindable menu.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">The menu contract</h2>
    <p>Every layout accepts the same <code>menu</code> shape, so you can switch a
      layout for another without reshaping your data. Flat-bar layouts (top,
      bottom) flatten <code>sections</code> internally; sidebars show the groups.</p>
    <CodeBlock code={menuShape} lang="js" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">Basic use</h2>
    <p>Pass a menu, put your page content inside as <code>children</code>. The menu is bindable.</p>
    <CodeBlock code={basicCode} lang="svelte" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">Composing by nesting</h2>
    <p>Each layout renders its bar plus a content area that a child fills. To
      combine layouts, nest them — an outer layout's content is another layout.
      This is how you build hybrid shells (top&nbsp;+&nbsp;side, rail&nbsp;+&nbsp;top&nbsp;+&nbsp;side, etc.).</p>
    <CodeBlock code={nestingCode} lang="svelte" />
  </section>

  <DocExample title="Live: single top bar" description="One layout, one menu.">
    <div style="height:18rem;border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden">
      <TopBarLayout menu={topMenu}>
        <div style="padding:var(--space-6)"><strong>Page content</strong><p class="text-muted" style="font-size:var(--text-sm)">Rendered inside the top bar layout.</p></div>
      </TopBarLayout>
    </div>
  </DocExample>

  <DocExample title="Live: nested (top + left)" description="TopBarLayout wrapping LeftBarLayout — a hybrid shell by composition.">
    <div style="height:22rem;border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden">
      <TopBarLayout menu={topMenu}>
        <LeftBarLayout menu={leftMenu}>
          <div style="padding:var(--space-6)"><strong>Nested content</strong><p class="text-muted" style="font-size:var(--text-sm)">Top bar outside, left bar inside, page here.</p></div>
        </LeftBarLayout>
      </TopBarLayout>
    </div>
  </DocExample>

  <DocExample title="Live: icon rail + left (IDE shell)" description="Three nesting levels: rail, then left list, then content.">
    <div style="height:22rem;border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden">
      <IconRailLayout menu={railMenu}>
        <LeftBarLayout menu={leftMenu}>
          <div style="padding:var(--space-6)"><strong>IDE-style shell</strong><p class="text-muted" style="font-size:var(--text-sm)">Icon rail + a contextual list + content.</p></div>
        </LeftBarLayout>
      </IconRailLayout>
    </div>
  </DocExample>

  <DocExample title="Live: floating dock" description="A detached dock floating over the content.">
    <div style="height:22rem;border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden">
      <FloatingDockLayout menu={dockMenu}>
        <div style="padding:var(--space-6)"><strong>Dock layout</strong><p class="text-muted" style="font-size:var(--text-sm)">Content scrolls behind a centered floating dock.</p></div>
      </FloatingDockLayout>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Height anchor</h2>
    <p>Because layouts fill their parent (so nesting works at any depth), the
      chain needs a defined height at the very top — usually <code>100vh</code>
      on a wrapper, or the <code>nl-app</code> helper class. Without it, the
      <code>100%</code> height chain has nothing to resolve against.</p>
    <CodeBlock code={heightCode} lang="svelte" />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">Shared props</h2>
    <p>All layouts share this core. Each renders the relevant snippets for its shape.</p>
    <PropsTable rows={menuProps} />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">The layouts</h2>
    <p>Eight single-region layouts. All take a bindable <code>menu</code> and
      <code>children</code>; the extra slot column notes each one's optional snippet.</p>
    <PropsTable rows={layouts.map((l) => ({ name: l.name, type: l.extra === '—' ? 'menu, children' : `menu, children, ${l.extra}`, default: '', description: l.desc }))} />
  </section>

  <section class="docs-section">
    <p class="docs-lead">
      <strong>Tip:</strong> set each item's <code>id</code> to its <code>href</code>
      and bind <code>active</code> to the current route, and the layouts highlight
      the active item automatically as you navigate.
    </p>
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">Links vs. groups</h2>
    <p>An item is <em>either</em> a link <em>or</em> a group — not both. A plain
      item navigates via its <code>href</code>. An item with <code>children</code>
      is a group: clicking anywhere on it reveals its children, and it does not
      navigate. This is consistent across every layout — only the presentation of
      "reveal" changes to fit the shape (a flyout on top bars, inline expansion in
      sidebars, a side popover on the icon rail, an upward flyout on the dock).
      If a group needs its own landing page, make it the first child (e.g. "Overview").</p>
  </section>

</DocsPage>
