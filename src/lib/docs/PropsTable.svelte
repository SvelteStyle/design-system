<script>
  // rows: [{ name, type, default, description }]
  let { rows = [] } = $props();
</script>

<div class="props-wrap">
  <table class="props-table">
    <thead>
      <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
    </thead>
    <tbody>
      {#each rows as r}
        <tr>
          <td><code class="prop-name">{r.name}</code></td>
          <td><code class="prop-type">{r.type}</code></td>
          <td>{#if r.default !== undefined && r.default !== ''}<code>{r.default}</code>{:else}<span class="prop-dash">—</span>{/if}</td>
          <td class="prop-desc">{r.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .props-wrap { overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
  .props-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
  .props-table th {
    text-align: left; padding: var(--space-3) var(--space-4);
    background: var(--color-bg-subtle); border-bottom: 1px solid var(--color-border);
    font-weight: var(--font-semibold); color: var(--color-text-muted);
    font-size: var(--text-xs); text-transform: uppercase; letter-spacing: var(--tracking-wide);
  }
  .props-table td { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); vertical-align: top; }
  .props-table tr:last-child td { border-bottom: none; }
  .prop-name { color: var(--color-primary); font-weight: var(--font-semibold); }
  .prop-type { color: var(--color-text-muted); font-size: var(--text-xs); }
  .prop-desc { color: var(--color-text); }
  .prop-dash { color: var(--color-text-subtle); }
  code { font-family: var(--font-mono); }
</style>
