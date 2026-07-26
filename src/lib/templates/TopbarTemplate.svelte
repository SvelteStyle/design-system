<script>
  import { TOP_ITEMS, NAV } from '$lib/templates.js';
  import TemplateContent from './TemplateContent.svelte';

  let active = $state('dashboard');
  let activeLabel = $derived(TOP_ITEMS.find((i) => i.id === active)?.label ?? 'Dashboard');
</script>

<div class="topbar-tpl">
  <header class="tb-header">
    <div class="tb-brand">
      <span class="material-symbols-outlined" style="color:var(--color-accent-light)">{NAV.brandIcon}</span>
      {NAV.brand}
    </div>
    <nav class="tb-nav">
      {#each TOP_ITEMS as item}
        <button class="tb-link" class:active={active === item.id} onclick={() => active = item.id}>
          <span class="material-symbols-outlined">{item.icon}</span>
          {item.label}
          {#if item.badge}<span class="tb-badge">{item.badge}</span>{/if}
        </button>
      {/each}
    </nav>
    <div class="tb-actions">
      <button class="btn btn-ghost btn-icon" aria-label="Search"><span class="material-symbols-outlined">search</span></button>
      <button class="btn btn-ghost btn-icon" aria-label="Account"><span class="material-symbols-outlined">account_circle</span></button>
    </div>
  </header>

  <main class="tb-main">
    <div class="tb-inner">
      <TemplateContent active={activeLabel} />
    </div>
  </main>
</div>

<style>
  .topbar-tpl { display: flex; flex-direction: column; min-height: 100%; background: var(--color-bg); }
  .tb-header {
    display: flex; align-items: center; gap: var(--space-6);
    padding: 0 var(--space-6); height: 3.5rem;
    background: var(--color-header-bg); color: var(--color-text-inverse);
    border-bottom: 1px solid var(--color-header-border);
    position: sticky; top: 0; z-index: 50;
  }
  .tb-brand { display: flex; align-items: center; gap: var(--space-3);
    font-weight: var(--font-semibold); flex-shrink: 0; }
  .tb-nav { display: flex; align-items: center; gap: var(--space-1); flex: 1; overflow-x: auto; }
  .tb-link {
    display: flex; align-items: center; gap: var(--space-2);
    padding: var(--space-2) var(--space-3); border: none; background: none;
    color: var(--color-slate-400); cursor: pointer;
    font: inherit; font-size: var(--text-sm); font-weight: var(--font-medium);
    border-radius: var(--radius-full); white-space: nowrap;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .tb-link .material-symbols-outlined { font-size: 1.15rem; }
  .tb-link:hover { background: rgb(255 255 255 / 0.08); color: var(--color-text-inverse); }
  .tb-link.active { background: var(--color-primary); color: var(--color-primary-text); }
  .tb-badge {
    background: rgb(255 255 255 / 0.2); border-radius: var(--radius-full);
    font-size: var(--text-xs); font-weight: var(--font-semibold);
    padding: 0 var(--space-2); line-height: 1.5;
  }
  .tb-actions { display: flex; align-items: center; gap: var(--space-2); flex-shrink: 0; }
  .tb-actions :global(.btn-ghost) { color: var(--color-slate-300); }
  .tb-actions :global(.btn-ghost:hover) { background: rgb(255 255 255 / 0.08); color: var(--color-text-inverse); }
  .tb-main { flex: 1; overflow-y: auto; }
  .tb-inner { padding: var(--space-6); max-width: 80rem; margin: 0 auto; }
</style>
