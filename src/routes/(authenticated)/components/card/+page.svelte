<script>
  import { Card, Button, Badge } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let variant = $state('default');
  let padding = $state('md');
  let title = $state('Revenue');
  let subtitle = $state('This month');

  const variants = ['default', 'flat', 'raised', 'interactive', 'selected', 'subtle', 'info', 'success', 'warning', 'error'];
  const paddings = ['none', 'sm', 'md', 'lg'];

  let code = $derived.by(() => {
    const attrs = [];
    if (variant !== 'default') attrs.push(`variant="${variant}"`);
    if (padding !== 'md') attrs.push(`padding="${padding}"`);
    if (title) attrs.push(`title="${title}"`);
    if (subtitle) attrs.push(`subtitle="${subtitle}"`);
    return `<Card${attrs.length ? ' ' + attrs.join(' ') : ''}>
  Card content goes here.
</Card>`;
  });

  const importCode = `import { Card } from '@sveltestyle/sveltestyle';`;
  const snippetCode = `<Card title="Projects" subtitle="Recently updated">
  {#snippet actions()}
    <Button variant="ghost" size="sm">View all</Button>
  {/snippet}

  Body content...

  {#snippet footer()}
    <Button variant="primary">Save</Button>
  {/snippet}
</Card>`;

  const props = [
    { name: 'variant', type: "'default' | 'flat' | 'raised' | 'interactive' | 'selected' | 'subtle' | 'info' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Surface style.' },
    { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Body padding.' },
    { name: 'title', type: 'string', default: '—', description: 'Optional heading.' },
    { name: 'subtitle', type: 'string', default: '—', description: 'Optional sub-heading.' },
    { name: 'header', type: 'snippet', default: '—', description: 'Custom header (overrides title/subtitle).' },
    { name: 'actions', type: 'snippet', default: '—', description: 'Header-right actions.' },
    { name: 'footer', type: 'snippet', default: '—', description: 'Footer content.' },
  ];
</script>

<DocsPage title="Card" subtitle="A flexible surface for grouping content, with header, actions and footer slots.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code}>
    {#snippet stage()}
      <div style="width:100%;max-width:24rem">
        <Card {variant} {padding} {title} {subtitle}>
          <div style="font-size:var(--text-2xl);font-weight:var(--font-bold)">$48,250</div>
          <div style="margin-top:var(--space-2)"><Badge variant="success" dot>+12%</Badge></div>
        </Card>
      </div>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="variant" options={variants} bind:value={variant}>
        {#snippet swatch(v)}
          <Card variant={v} padding="sm"><span style="font-size:var(--text-xs)">{v}</span></Card>
        {/snippet}
      </VariantPicker>
      <VariantPicker label="padding" options={paddings} bind:value={padding}>
        {#snippet swatch(p)}
          <Card variant="flat" padding={p}><span style="font-size:var(--text-xs)">{p}</span></Card>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-field"><span>title</span><input type="text" bind:value={title} /></label>
        <label class="pg-field"><span>subtitle</span><input type="text" bind:value={subtitle} /></label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="With actions & footer" description="Use the actions and footer snippets for richer cards." code={snippetCode}>
    <div style="width:100%;max-width:30rem">
      <Card title="Projects" subtitle="Recently updated">
        {#snippet actions()}
          <Button variant="ghost" size="sm">View all</Button>
        {/snippet}
        <p class="text-muted">Three projects updated this week.</p>
        {#snippet footer()}
          <Button variant="primary" size="sm">New project</Button>
        {/snippet}
      </Card>
    </div>
  </DocExample>

  <DocExample title="Semantic variants" description="Colored surfaces for status emphasis.">
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3);width:100%">
      <Card variant="info" title="Info">Informational surface.</Card>
      <Card variant="success" title="Success">Positive surface.</Card>
      <Card variant="warning" title="Warning">Cautionary surface.</Card>
      <Card variant="error" title="Error">Critical surface.</Card>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
