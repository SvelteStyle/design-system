<script>
  import { TOP_ITEMS, NAV } from '$lib/templates.js';
  import TemplateContent from './TemplateContent.svelte';

  let active = $state('dashboard');
  let activeLabel = $derived(TOP_ITEMS.find((i) => i.id === active)?.label ?? 'Dashboard');
</script>

<div class="stacked-tpl">
  <header class="st-header">
    <div class="st-brand">
      <span class="material-symbols-outlined" style="color:var(--color-primary)">{NAV.brandIcon}</span>
      <span>{NAV.brand}</span>
    </div>
    <nav class="st-pillnav">
      {#each TOP_ITEMS as item}
        <button class="st-pill" class:active={active === item.id} onclick={() => active = item.id}>
          {item.label}
          {#if item.badge}<span class="st-pill-badge">{item.badge}</span>{/if}
        </button>
      {/each}
    </nav>
  </header>

  <main class="st-main">
    <div class="st-inner">
      <TemplateContent active={activeLabel} />
    </div>
  </main>
</div>

<style>
  .stacked-tpl { display: flex; flex-direction: column; min-height: 100%; background: var(--color-bg); }
  .st-header {
    display: flex; flex-direction: column; align-items: center; gap: var(--space-4);
    padding: var(--space-8) var(--space-4) var(--space-6);
    background: var(--color-surface); border-bottom: 1px solid var(--color-border);
  }
  .st-brand {
    display: flex; align-items: center; gap: var(--space-2);
    font-size: var(--text-xl); font-weight: var(--font-bold); color: var(--color-text);
  }
  .st-brand .material-symbols-outlined { font-size: 1.6rem; }
  .st-pillnav {
    display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-1);
    background: var(--color-bg-subtle); border: 1px solid var(--color-border);
    border-radius: var(--radius-full); padding: var(--space-1);
  }
  .st-pill {
    display: flex; align-items: center; gap: var(--space-2);
    padding: var(--space-2) var(--space-4); border: none; background: none; cursor: pointer;
    border-radius: var(--radius-full); color: var(--color-text-muted);
    font: inherit; font-size: var(--text-sm); font-weight: var(--font-medium);
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .st-pill:hover { color: var(--color-text); }
  .st-pill.active { background: var(--color-primary); color: var(--color-primary-text); box-shadow: var(--shadow-xs); }
  .st-pill-badge {
    background: rgb(255 255 255 / 0.25); border-radius: var(--radius-full);
    font-size: var(--text-xs); font-weight: var(--font-semibold); padding: 0 var(--space-2);
  }
  .st-pill:not(.active) .st-pill-badge { background: var(--color-slate-200); color: var(--color-text-muted); }
  .st-main { flex: 1; overflow-y: auto; }
  .st-inner { padding: var(--space-8) var(--space-6); max-width: 64rem; margin: 0 auto; }
</style>
