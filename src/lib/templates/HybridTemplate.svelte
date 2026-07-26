<script>
  import { NavItem, SidebarProfile } from '@sveltestyle/sveltestyle';
  import { NAV, TOP_ITEMS } from '$lib/templates.js';
  import TemplateContent from './TemplateContent.svelte';

  // Top bar = primary sections; sidebar = items of the active section.
  let activeSection = $state(0);
  let active = $state('dashboard');

  let sideItems = $derived(NAV.sections[activeSection]?.items ?? []);
  let activeLabel = $derived(
    TOP_ITEMS.find((i) => i.id === active)?.label ?? 'Dashboard'
  );

  function pickSection(idx) {
    activeSection = idx;
    active = NAV.sections[idx].items[0].id;
  }
</script>

<div class="hybrid-tpl">
  <header class="hy-header">
    <div class="hy-brand">
      <span class="material-symbols-outlined" style="color:var(--color-accent-light)">{NAV.brandIcon}</span>
      {NAV.brand}
    </div>
    <nav class="hy-topnav">
      {#each NAV.sections as section, idx}
        <button class="hy-toplink" class:active={activeSection === idx} onclick={() => pickSection(idx)}>
          {section.label}
        </button>
      {/each}
    </nav>
    <div class="hy-actions">
      <button class="btn btn-ghost btn-icon" aria-label="Account"><span class="material-symbols-outlined">account_circle</span></button>
    </div>
  </header>

  <div class="hy-body">
    <aside class="hy-sidebar">
      <div class="shell-sidebar-section">
        <div class="shell-sidebar-label">{NAV.sections[activeSection].label}</div>
        {#each sideItems as item}
          <NavItem icon={item.icon} badge={item.badge} active={active === item.id}
            onclick={() => active = item.id}>{item.label}</NavItem>
        {/each}
      </div>
      <div class="shell-sidebar-footer">
        <SidebarProfile name="Jane Doe" role="Administrator" initials="JD" />
      </div>
    </aside>

    <main class="hy-content">
      <div class="hy-inner">
        <TemplateContent active={activeLabel} />
      </div>
    </main>
  </div>
</div>

<style>
  .hybrid-tpl { display: flex; flex-direction: column; min-height: 100%; background: var(--color-bg); }
  .hy-header {
    display: flex; align-items: center; gap: var(--space-6);
    padding: 0 var(--space-6); height: 3.5rem; flex-shrink: 0;
    background: var(--color-header-bg); color: var(--color-text-inverse);
    border-bottom: 1px solid var(--color-header-border);
  }
  .hy-brand { display: flex; align-items: center; gap: var(--space-3); font-weight: var(--font-semibold); }
  .hy-topnav { display: flex; align-items: stretch; gap: var(--space-1); flex: 1; height: 100%; }
  .hy-toplink {
    display: flex; align-items: center; padding: 0 var(--space-3);
    border: none; background: none; cursor: pointer;
    color: var(--color-slate-400); font: inherit; font-size: var(--text-sm); font-weight: var(--font-medium);
    border-bottom: 2px solid transparent;
    transition: color var(--duration-fast), border-color var(--duration-fast);
  }
  .hy-toplink:hover { color: var(--color-slate-200); }
  .hy-toplink.active { color: #fff; border-bottom-color: var(--color-accent-light); }
  .hy-actions { display: flex; align-items: center; flex-shrink: 0; }
  .hy-actions :global(.btn-ghost) { color: var(--color-slate-300); }
  .hy-actions :global(.btn-ghost:hover) { background: rgb(255 255 255 / 0.08); color: #fff; }

  .hy-body { display: grid; grid-template-columns: 14rem 1fr; flex: 1; min-height: 0; }
  .hy-sidebar {
    background: var(--color-surface); border-right: 1px solid var(--color-border);
    display: flex; flex-direction: column; overflow-y: auto;
  }
  .hy-content { overflow-y: auto; background: var(--color-bg); }
  .hy-inner { padding: var(--space-6); max-width: 72rem; }
</style>
