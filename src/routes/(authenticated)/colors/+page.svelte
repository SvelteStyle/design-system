<script>
  import { Card } from '@sveltestyle/sveltestyle';

  const slateShades    = [50,100,200,300,400,500,600,700,800,900];
  const semanticColors = [
    { label: 'Primary', var: '--color-primary', hex: '#2563eb' },
    { label: 'Success', var: '--color-success', hex: '#16a34a' },
    { label: 'Warning', var: '--color-warning', hex: '#d97706' },
    { label: 'Error',   var: '--color-error',   hex: '#dc2626' },
    { label: 'Info',    var: '--color-info',     hex: '#0284c7' },
  ];
  const typeScale = [
    { token: 'text-3xl',  size: '1.875rem', sample: 'The quick brown fox' },
    { token: 'text-2xl',  size: '1.5rem',   sample: 'The quick brown fox' },
    { token: 'text-xl',   size: '1.25rem',  sample: 'The quick brown fox' },
    { token: 'text-lg',   size: '1.125rem', sample: 'The quick brown fox jumps over the lazy dog' },
    { token: 'text-base', size: '1rem',     sample: 'The quick brown fox jumps over the lazy dog' },
    { token: 'text-sm',   size: '0.875rem', sample: 'The quick brown fox jumps over the lazy dog' },
    { token: 'text-xs',   size: '0.75rem',  sample: 'The quick brown fox jumps over the lazy dog' },
  ];
  const spacing = [
    { token: 'space-1',  px: '4px'  },
    { token: 'space-2',  px: '8px'  },
    { token: 'space-4',  px: '16px' },
    { token: 'space-6',  px: '24px' },
    { token: 'space-8',  px: '32px' },
    { token: 'space-12', px: '48px' },
    { token: 'space-16', px: '64px' },
  ];
  const radii = [
    { token: 'radius-sm',   value: '4px',    label: 'Inputs, tags'   },
    { token: 'radius-md',   value: '8px',    label: 'Cards, modals'  },
    { token: 'radius-lg',   value: '12px',   label: 'Large cards'    },
    { token: 'radius-full', value: '9999px', label: 'Pills, badges'  },
  ];
</script>

<div class="shell-content-inner">

  <div class="page-header">
    <div>
      <h1 class="page-title">Colors & Typography</h1>
      <p class="page-subtitle">Design tokens — the foundation of the system</p>
    </div>
  </div>

  <section class="section">
    <div class="section-title">Slate scale</div>
    <Card>
      <div style="display:grid;grid-template-columns:repeat(10,1fr);gap:var(--space-3)">
        {#each slateShades as shade}
        <div style="text-align:center">
          <div style="height:3.5rem;border-radius:var(--radius-sm);background:var(--color-slate-{shade});border:1px solid var(--color-border);margin-bottom:var(--space-2)"></div>
          <div style="font-size:var(--text-xs);font-weight:var(--font-semibold);color:var(--color-text-muted)">{shade}</div>
        </div>
        {/each}
      </div>
    </Card>
  </section>

  <section class="section">
    <div class="section-title">Semantic colors</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--space-4)">
      {#each semanticColors as c}
      <Card variant="flat" padding="none" style="overflow:hidden">
        <div style="height:3.5rem;background:{c.hex}"></div>
        <div class="card-body card-body-sm">
          <div style="font-weight:var(--font-semibold);font-size:var(--text-sm)">{c.label}</div>
          <code style="font-size:var(--text-xs);color:var(--color-text-muted)">{c.hex}</code>
        </div>
      </Card>
      {/each}
    </div>
  </section>

  <section class="section">
    <div class="section-title">Typography scale — Inter</div>
    <Card padding="none">
      {#each typeScale as row}
      <div style="display:grid;grid-template-columns:8rem 4rem 1fr;align-items:baseline;gap:var(--space-4);padding:var(--space-4) var(--space-6);border-bottom:1px solid var(--color-border)">
        <code style="font-size:var(--text-xs);color:var(--color-text-subtle)">--{row.token}</code>
        <span style="font-size:var(--text-xs);color:var(--color-text-muted)">{row.size}</span>
        <span style="font-size:var(--{row.token})">{row.sample}</span>
      </div>
      {/each}
    </Card>
  </section>

  <section class="section">
    <div class="section-title">Spacing scale</div>
    <Card>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        {#each spacing as row}
        <div style="display:flex;align-items:center;gap:var(--space-4)">
          <code style="width:9rem;font-size:var(--text-xs);color:var(--color-text-subtle);flex-shrink:0">--{row.token}</code>
          <span style="width:3rem;font-size:var(--text-xs);color:var(--color-text-muted);flex-shrink:0">{row.px}</span>
          <div style="height:1rem;width:var(--{row.token});background:var(--color-primary);border-radius:2px;flex-shrink:0"></div>
        </div>
        {/each}
      </div>
    </Card>
  </section>

  <section class="section">
    <div class="section-title">Shadows</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-6)">
      {#each ['shadow-sm','shadow-md','shadow-lg','shadow-xl'] as s}
      <Card variant="flat" style="box-shadow:var(--{s})">
        <div style="text-align:center">
          <code style="font-size:var(--text-xs);color:var(--color-text-subtle)">--{s}</code>
        </div>
      </Card>
      {/each}
    </div>
  </section>

  <section class="section">
    <div class="section-title">Border radius</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-4)">
      {#each radii as r}
      <Card variant="subtle" padding="sm">
        <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-3)">
          <div style="width:3rem;height:3rem;background:var(--color-primary);border-radius:var(--{r.token})"></div>
          <div style="text-align:center">
            <code style="font-size:var(--text-xs);color:var(--color-text-subtle)">--{r.token}</code>
            <div style="font-size:var(--text-xs);color:var(--color-text-muted)">{r.value}</div>
            <div style="font-size:var(--text-xs);color:var(--color-text-subtle);margin-top:2px">{r.label}</div>
          </div>
        </div>
      </Card>
      {/each}
    </div>
  </section>

</div>

<style>
  .section       { margin-bottom: var(--space-8); }
  .section-title {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--color-text-subtle);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--color-border);
  }
</style>
