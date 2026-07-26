<script>
  import { page } from '$app/stores';

  let { children } = $props();

  const tabs = [
    { href: '/settings/general',  icon: 'settings', label: 'General'  },
    { href: '/settings/security', icon: 'security', label: 'Security' },
  ];
</script>

<div class="shell-content-inner">
  <div class="page-header">
    <div>
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">Manage your workspace preferences and account security.</p>
    </div>
  </div>

  <nav class="settings-tabs">
    {#each tabs as tab}
      <a href={tab.href} class="settings-tab" class:active={$page.url.pathname === tab.href}>
        <span class="material-symbols-outlined">{tab.icon}</span>
        {tab.label}
      </a>
    {/each}
  </nav>

  {@render children?.()}
</div>

<style>
  .settings-tabs {
    display: flex; gap: var(--space-1);
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--space-6);
  }
  .settings-tab {
    display: flex; align-items: center; gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    color: var(--color-text-muted); text-decoration: none;
    font-size: var(--text-sm); font-weight: var(--font-medium);
    border-bottom: 2px solid transparent; margin-bottom: -1px;
    transition: color var(--duration-fast), border-color var(--duration-fast);
  }
  .settings-tab .material-symbols-outlined { font-size: 1.1rem; }
  .settings-tab:hover { color: var(--color-text); }
  .settings-tab.active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
</style>
