<script>
  import { Card, Badge, Button, Alert } from '@sveltestyle/sveltestyle';

  let { active = 'Dashboard' } = $props();

  const stats = [
    { label: 'Revenue',    value: '$48,250', note: '+12% vs last month', icon: 'trending_up', color: 'var(--color-success)' },
    { label: 'Active users', value: '2,847', note: '+5% this week',       icon: 'group',       color: 'var(--color-primary)' },
    { label: 'Open tasks',  value: '24',      note: '6 due today',         icon: 'task_alt',    color: 'var(--color-warning)' },
    { label: 'Errors',      value: '3',       note: 'last 24h',            icon: 'error',       color: 'var(--color-error)' },
  ];

  const rows = [
    { name: 'Aurora redesign', owner: 'Jane Doe',   status: 'success', label: 'Live' },
    { name: 'Billing v2',      owner: 'Sam Park',    status: 'warning', label: 'In review' },
    { name: 'Mobile app',      owner: 'Lee Chan',    status: 'info',    label: 'Planning' },
    { name: 'Data export',     owner: 'Mara Ortiz',  status: 'error',   label: 'Blocked' },
  ];
</script>

<div class="tpl-content">
  <div class="page-header">
    <div>
      <h1 class="page-title">{active}</h1>
      <p class="page-subtitle">Overview of your workspace</p>
    </div>
    <div class="page-header-actions">
      <Button variant="secondary" size="sm">
        <span class="material-symbols-outlined">ios_share</span> Export
      </Button>
      <Button variant="primary" size="sm">
        <span class="material-symbols-outlined">add</span> New project
      </Button>
    </div>
  </div>

  <Alert variant="info" title="Preview mode">
    This content is identical across every template — only the menu layout changes.
  </Alert>

  <div class="stat-row">
    {#each stats as s}
      <Card variant="subtle" padding="sm">
        <div class="stat-top">
          <span class="text-sm text-muted">{s.label}</span>
          <span class="material-symbols-outlined" style="color:{s.color};font-size:1.1rem">{s.icon}</span>
        </div>
        <div class="stat-value">{s.value}</div>
        <div class="stat-note">{s.note}</div>
      </Card>
    {/each}
  </div>

  <Card padding="none">
    {#snippet header()}
      <div>
        <h3 class="card-title">Projects</h3>
        <p class="card-subtitle">Recently updated</p>
      </div>
      <div class="card-header-actions">
        <Button variant="ghost" size="sm">View all</Button>
      </div>
    {/snippet}
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr><th>Name</th><th>Owner</th><th>Status</th></tr>
        </thead>
        <tbody>
          {#each rows as r}
            <tr>
              <td><strong>{r.name}</strong></td>
              <td class="text-muted">{r.owner}</td>
              <td><Badge variant={r.status} dot>{r.label}</Badge></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
</div>

<style>
  .tpl-content { display: flex; flex-direction: column; gap: var(--space-5); }
  .stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
  @media (max-width: 720px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
  .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2); }
  .stat-value { font-size: var(--text-2xl); font-weight: var(--font-bold); color: var(--color-text); }
  .stat-note { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1); }
</style>
