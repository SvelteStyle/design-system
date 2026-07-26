<script>
  import { Badge } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let variant = $state('primary');
  let label = $state('Active');
  let dot = $state(true);

  const variants = ['default', 'primary', 'success', 'warning', 'error', 'info'];

  let code = $derived.by(() => {
    const attrs = [`variant="${variant}"`];
    if (dot) attrs.push('dot');
    return `<Badge ${attrs.join(' ')}>${label}</Badge>`;
  });

  const importCode = `import { Badge } from '@sveltestyle/sveltestyle';`;
  const variantsCode = `<Badge variant="primary">New</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>Pending</Badge>
<Badge variant="error">Failed</Badge>`;

  const props = [
    { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", description: 'Color / semantic meaning.' },
    { name: 'dot', type: 'boolean', default: 'false', description: 'Show a leading status dot.' },
  ];
</script>

<DocsPage title="Badge" subtitle="Compact status and category labels.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code}>
    {#snippet stage()}
      <Badge {variant} {dot}>{label}</Badge>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="variant" options={variants} bind:value={variant}>
        {#snippet swatch(v)}
          <Badge variant={v} {dot}>{v}</Badge>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-field">
          <span>label</span>
          <input type="text" bind:value={label} />
        </label>
        <label class="pg-check">
          <input type="checkbox" bind:checked={dot} /> dot
        </label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="In context" description="Badges sit inline with text and other content." code={variantsCode}>
    <Badge variant="primary">New</Badge>
    <Badge variant="success" dot>Active</Badge>
    <Badge variant="warning" dot>Pending</Badge>
    <Badge variant="error">Failed</Badge>
    <Badge variant="info" dot>Info</Badge>
    <Badge>Default</Badge>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
