<script>
  import { NavItem, SidebarProfile } from '@sveltestyle/sveltestyle';
  import { NAV } from '$lib/templates.js';
  import TemplateContent from './TemplateContent.svelte';

  // Rail = one icon per section; panel = items of the selected section.
  let activeSection = $state(0);
  let active = $state('dashboard');

  let panelItems = $derived(NAV.sections[activeSection]?.items ?? []);
  let activeLabel = $derived(
    NAV.sections.flatMap((s) => s.items).find((i) => i.id === active)?.label ?? 'Dashboard'
  );

  const sectionIcons = ['apps', 'workspaces'];

  function pickSection(idx) {
    activeSection = idx;
    active = NAV.sections[idx].items[0].id;
  }
</script>

<div class="split-tpl">
  <!-- Icon rail -->
  <nav class="sp-rail">
    <div class="sp-rail-brand">
      <span class="material-symbols-outlined">{NAV.brandIcon}</span>
    </div>
    {#each NAV.sections as section, idx}
      <button class="sp-rail-btn" class:active={activeSection === idx}
        aria-label={section.label} title={section.label} onclick={() => pickSection(idx)}>
        <span class="material-symbols-outlined">{sectionIcons[idx] ?? 'circle'}</span>
      </button>
    {/each}
    <div class="sp-rail-foot">
      <button class="sp-rail-btn" aria-label="Account"><span class="material-symbols-outlined">account_circle</span></button>
    </div>
  </nav>

  <!-- Secondary panel -->
  <aside class="sp-panel">
    <div class="sp-panel-head">{NAV.sections[activeSection].label}</div>
    <div class="sp-panel-items">
      {#each panelItems as item}
        <NavItem icon={item.icon} badge={item.badge} active={active === item.id}
          onclick={() => active = item.id}>{item.label}</NavItem>
      {/each}
    </div>
    <div class="sp-panel-foot">
      <SidebarProfile name="Jane Doe" role="Administrator" initials="JD" />
    </div>
  </aside>

  <!-- Content -->
  <main class="sp-content">
    <div class="sp-inner">
      <TemplateContent active={activeLabel} />
    </div>
  </main>
</div>

<style>
  .split-tpl { display: grid; grid-template-columns: 3.5rem 13rem 1fr; min-height: 100%; background: var(--color-bg); }

  .sp-rail {
    display: flex; flex-direction: column; align-items: center; gap: var(--space-2);
    padding: var(--space-3) 0; background: var(--color-header-bg);
    border-right: 1px solid var(--color-header-border);
  }
  .sp-rail-brand {
    display: flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; margin-bottom: var(--space-2);
    color: var(--color-accent-light);
  }
  .sp-rail-btn {
    display: flex; align-items: center; justify-content: center;
    width: 2.25rem; height: 2.25rem; border: none; background: none; cursor: pointer;
    border-radius: var(--radius-md); color: var(--color-slate-400);
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .sp-rail-btn:hover { background: rgb(255 255 255 / 0.08); color: #fff; }
  .sp-rail-btn.active { background: var(--color-primary); color: var(--color-primary-text); }
  .sp-rail-foot { margin-top: auto; }

  .sp-panel {
    display: flex; flex-direction: column;
    background: var(--color-surface); border-right: 1px solid var(--color-border);
    overflow-y: auto;
  }
  .sp-panel-head {
    padding: var(--space-4) var(--space-4) var(--space-2);
    font-size: var(--text-xs); font-weight: var(--font-semibold);
    text-transform: uppercase; letter-spacing: var(--tracking-wider);
    color: var(--color-text-subtle);
  }
  .sp-panel-items { padding: 0 var(--space-3); display: flex; flex-direction: column; gap: var(--space-1); }
  .sp-panel-foot { margin-top: auto; padding: var(--space-3); border-top: 1px solid var(--color-border); }

  .sp-content { overflow-y: auto; }
  .sp-inner { padding: var(--space-6); max-width: 72rem; }
</style>
