<script>
  import { TEMPLATES } from '$lib/templates.js';
  import { appMode } from '$lib/app-mode.svelte.js';
  import {
    TopBarLayout, LeftBarLayout, IconRailLayout,
    FloatingTopLayout, FloatingLeftLayout, FloatingDockLayout,
  } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';

  // The active template now drives the WHOLE app layout (see AppLayout),
  // so this page is a chooser — picking a card restyles everything live.
  let selected = $derived(appMode.template);

  const applyCode = `<!-- A "template" is just a layout applied at the top of your app.
     Swap the layout component to change the whole site's shell. -->
<script>
  import { LeftBarLayout } from '@sveltestyle/sveltestyle';
  let menu = $state({ brand: {...}, sections: [...], active: '/home' });
<\/script>

<div style="height: 100vh">     <!-- height anchor -->
  <LeftBarLayout bind:menu>
    <slot />                      <!-- your routed pages -->
  </LeftBarLayout>
</div>`;

  const composeCode = `<!-- A composed template nests layouts (see the examples below) -->
<div style="height: 100vh">
  <IconRailLayout menu={railMenu}>
    <LeftBarLayout menu={sideMenu}>
      <slot />
    </LeftBarLayout>
  </IconRailLayout>
</div>`;

  // ── Nestable layout showcase ──
  const topMenu = {
    brand: { label: 'My App', icon: 'rocket_launch', href: '#' },
    active: 'projects',
    sections: [{ items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '#d' },
      { id: 'projects',  label: 'Projects',  icon: 'folder',    href: '#p' },
      { id: 'reports',   label: 'Reports',   icon: 'bar_chart', href: '#r' },
    ] }],
  };
  const topMenu2 = {
    active: 'overview',
    sections: [{ items: [
      { id: 'overview', label: 'Overview', icon: 'visibility', href: '#o' },
      { id: 'activity', label: 'Activity', icon: 'timeline',   href: '#a' },
      { id: 'members',  label: 'Members',  icon: 'group',      href: '#m' },
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
      { id: 'files',  label: 'Files',  icon: 'folder',    href: '#f' },
      { id: 'search', label: 'Search', icon: 'search',    href: '#se' },
      { id: 'git',    label: 'Source', icon: 'account_tree', href: '#g', badge: 1 },
      { id: 'ext',    label: 'Extensions', icon: 'extension', href: '#e' },
    ] }],
  };

  const nestExamples = [
    { id: 'rail-left',  label: 'Icon rail + left menu' },
    { id: 'float-both', label: 'Top + left floating' },
    { id: 'top-left',   label: 'Top bar + left bar' },
    { id: 'rail-top-left', label: 'Rail + top + left' },
    { id: 'top-top',    label: 'Stacked top bars' },
    { id: 'left-top',   label: 'Left + top bars' },
  ];
  let nestEx = $state('rail-left');
</script>

<div class="shell-content-inner tpl-page">

  <div class="page-header">
    <div>
      <h1 class="page-title">Layouts</h1>
      <p class="page-subtitle">
        A template is a layout applied to your whole app. Pick one below and the
        entire site re-arranges around it — your active theme stays applied, so
        you can preview layout and theme together.
      </p>
    </div>
  </div>

  <section class="tpl-doc">
    <h2 class="tpl-doc-h2">What is a template?</h2>
    <p>
      "Template" isn't a separate component — it's one of the
      <a href="/layout-reference">layout components</a> (or a nesting of several)
      placed at the top of your app so it wraps every page. Choosing a template on
      this page swaps that top-level layout live. There are two kinds:
    </p>
    <ul class="tpl-doc-list">
      <li><strong>Layout components</strong> — a single layout as the whole shell (a top bar, a sidebar, an icon rail…).</li>
      <li><strong>Composed examples</strong> — several layouts nested together (an icon rail wrapping a side list, etc.).</li>
    </ul>

    <h2 class="tpl-doc-h2">Applying one in your app</h2>
    <p>Put a layout at the root so it wraps your routed pages. The layout needs a
      height anchor (<code>100vh</code>) at the top of the chain.</p>
    <CodeBlock code={applyCode} lang="svelte" />
    <p>To build a composed template, nest layouts — the same pattern shown in the
      composed examples further down.</p>
    <CodeBlock code={composeCode} lang="svelte" />
    <p class="tpl-doc-see">
      <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:-2px">menu_book</span>
      For the full menu contract, props, nesting model and the links-vs-groups
      rule, see the <a href="/layout-reference">Layouts documentation</a>.
    </p>
  </section>

  <div class="page-header" style="margin-top:var(--space-8)">
    <div>
      <h2 class="page-title">Layout components</h2>
      <p class="page-subtitle">
        Each of these is a single layout component. Select one and the entire
        site re-arranges to use just that layout. Your active theme stays applied.
      </p>
    </div>
  </div>

  <div class="tpl-chooser">
    {#each TEMPLATES as t}
      <button class="tpl-card" class:active={selected === t.id} onclick={() => appMode.setTemplate(t.id)}>
        <span class="material-symbols-outlined tpl-card-icon">{t.icon}</span>
        <span class="tpl-card-name">{t.name}</span>
        <span class="tpl-card-desc">{t.desc}</span>
        {#if selected === t.id}
          <span class="tpl-card-current">
            <span class="material-symbols-outlined">check_circle</span> Active
          </span>
        {/if}
      </button>
    {/each}
  </div>

  <p class="text-muted text-sm tpl-hint">
    <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:-2px">lightbulb</span>
    You can also switch layouts any time from the floating Theme window.
  </p>

  <div class="page-header" style="margin-top:var(--space-8)">
    <div>
      <h1 class="page-title">Composed examples</h1>
      <p class="page-subtitle">
        These combine multiple layout components by nesting — an outer layout's
        content is another layout. Preview one below, then apply it to the whole
        site just like a single layout.
      </p>
    </div>
  </div>

  <div class="nest-tabs">
    {#each nestExamples as e}
      <button class="btn btn-sm" class:btn-primary={nestEx === e.id} onclick={() => (nestEx = e.id)}>{e.label}</button>
    {/each}
  </div>

  <div class="nest-apply">
    {#if selected === nestEx}
      <span class="nest-applied"><span class="material-symbols-outlined">check_circle</span> Applied to the whole site</span>
    {:else}
      <button class="btn btn-primary btn-sm" onclick={() => appMode.setTemplate(nestEx)}>
        <span class="material-symbols-outlined" style="font-size:1.05rem">open_in_full</span>
        Apply this layout to the whole site
      </button>
    {/if}
  </div>

  <div class="nest-frame">
    {#if nestEx === 'rail-left'}
      <IconRailLayout menu={railMenu}>
        <LeftBarLayout menu={leftMenu}>
          <div class="nest-page"><h2>Icon rail + left menu</h2><p>An icon rail wraps a left list, then content — the classic IDE / mail shell.</p></div>
        </LeftBarLayout>
      </IconRailLayout>
    {:else if nestEx === 'float-both'}
      <FloatingTopLayout menu={topMenu}>
        <FloatingLeftLayout menu={leftMenu}>
          <div class="nest-page"><h2>Top + left floating</h2><p>Both menus float as cards — nested, top wrapping left.</p></div>
        </FloatingLeftLayout>
      </FloatingTopLayout>
    {:else if nestEx === 'top-left'}
      <TopBarLayout menu={topMenu}>
        <LeftBarLayout menu={leftMenu}>
          <div class="nest-page"><h2>Top bar + left bar</h2><p>Outer top bar, inner left bar — the hybrid shell, composed by nesting.</p></div>
        </LeftBarLayout>
      </TopBarLayout>
    {:else if nestEx === 'rail-top-left'}
      <IconRailLayout menu={railMenu}>
        <TopBarLayout menu={topMenu}>
          <LeftBarLayout menu={leftMenu}>
            <div class="nest-page"><h2>Rail + top + left</h2><p>Three regions nested: icon rail, then a top bar, then a left list — a full IDE shell.</p></div>
          </LeftBarLayout>
        </TopBarLayout>
      </IconRailLayout>
    {:else if nestEx === 'top-top'}
      <TopBarLayout menu={topMenu}>
        <TopBarLayout menu={topMenu2}>
          <div class="nest-page"><h2>Stacked top bars</h2><p>A global brand bar over a contextual second bar — two top bars nested.</p></div>
        </TopBarLayout>
      </TopBarLayout>
    {:else if nestEx === 'left-top'}
      <LeftBarLayout menu={leftMenu}>
        <TopBarLayout menu={topMenu2}>
          <div class="nest-page"><h2>Left + top bars</h2><p>Outer left sidebar, inner top bar over the content.</p></div>
        </TopBarLayout>
      </LeftBarLayout>
    {/if}
  </div>

</div>

<style>
  .tpl-doc { max-width: 44rem; margin-bottom: var(--space-4); }
  .tpl-doc-h2 { font-size: var(--text-lg); font-weight: var(--font-semibold); margin: var(--space-6) 0 var(--space-2); }
  .tpl-doc p { color: var(--color-text-muted); line-height: var(--leading-relaxed); margin-bottom: var(--space-3); }
  .tpl-doc-list { margin: 0 0 var(--space-3) var(--space-4); color: var(--color-text-muted); line-height: var(--leading-relaxed); }
  .tpl-doc-list li { margin-bottom: var(--space-1); }
  .tpl-doc a { color: var(--color-primary); text-decoration: none; }
  .tpl-doc a:hover { text-decoration: underline; }
  .tpl-doc-see { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); }
  .tpl-chooser {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-4); margin-bottom: var(--space-4);
  }
  .tpl-card {
    position: relative;
    display: flex; flex-direction: column; gap: var(--space-2);
    text-align: left; padding: var(--space-5);
    border: 1px solid var(--color-border); border-radius: var(--radius-md);
    background: var(--color-surface); cursor: pointer;
    transition: border-color var(--duration-fast), box-shadow var(--duration-fast), transform var(--duration-fast);
  }
  .tpl-card:hover { box-shadow: var(--shadow-sm); transform: translateY(-1px); }
  .tpl-card.active { border-color: var(--color-primary); box-shadow: 0 0 0 1px var(--color-primary); }
  .tpl-card-icon { font-size: 1.75rem; color: var(--color-primary); }
  .tpl-card-name { font-weight: var(--font-semibold); color: var(--color-text); }
  .tpl-card-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: var(--leading-snug); }
  .tpl-card-current {
    display: inline-flex; align-items: center; gap: var(--space-1);
    margin-top: var(--space-1); font-size: var(--text-xs); font-weight: var(--font-semibold);
    color: var(--color-primary);
  }
  .tpl-card-current .material-symbols-outlined { font-size: 1rem; }
  .tpl-hint { display: flex; align-items: center; gap: var(--space-2); }

  .nest-tabs { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4); }
  .nest-apply { margin-bottom: var(--space-4); }
  .nest-applied { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-success, var(--color-primary)); font-weight: var(--font-medium); }
  .nest-applied .material-symbols-outlined { font-size: 1.1rem; }
  .nest-frame {
    height: 30rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--color-bg);
  }
  .nest-page { padding: var(--space-6); }
  .nest-page h2 { margin: 0 0 var(--space-2); }
</style>
