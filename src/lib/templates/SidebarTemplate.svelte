<script>
  import { Shell, NavItem, SidebarProfile } from '@sveltestyle/sveltestyle';
  import { NAV } from '$lib/templates.js';
  import TemplateContent from './TemplateContent.svelte';

  let active = $state('dashboard');
  function labelFor(id) {
    for (const s of NAV.sections) for (const it of s.items) if (it.id === id) return it.label;
    return id;
  }
</script>

<div class="tpl-frame">
  <Shell>
    <header class="shell-header">
      <div class="shell-header-brand">
        <span class="material-symbols-outlined" style="color:var(--color-accent-light)">{NAV.brandIcon}</span>
        {NAV.brand}
      </div>
      <div class="shell-header-actions">
        <button class="btn btn-ghost btn-icon" aria-label="Search"><span class="material-symbols-outlined">search</span></button>
        <button class="btn btn-ghost btn-icon" aria-label="Account"><span class="material-symbols-outlined">account_circle</span></button>
      </div>
    </header>

    <aside class="shell-sidebar">
      {#each NAV.sections as section}
        <div class="shell-sidebar-section">
          <div class="shell-sidebar-label">{section.label}</div>
          {#each section.items as item}
            <NavItem icon={item.icon} badge={item.badge} active={active === item.id}
              onclick={() => active = item.id}>{item.label}</NavItem>
          {/each}
        </div>
      {/each}
      <div class="shell-sidebar-footer">
        <SidebarProfile name="Jane Doe" role="Administrator" initials="JD" />
      </div>
    </aside>

    <main class="shell-content">
      <div class="shell-content-inner">
        <TemplateContent active={labelFor(active)} />
      </div>
    </main>
  </Shell>
</div>

<style>
  .tpl-frame :global(.shell) { min-height: 100%; }
</style>
