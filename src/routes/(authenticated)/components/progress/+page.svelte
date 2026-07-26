<script>
  import { Progress, Button } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let value = $state(40);
  let variant = $state('primary');
  const variants = ['primary', 'success', 'warning', 'error'];

  let code = $derived(`<Progress value={${value}} variant="${variant}" showLabel />`);

  const importCode = `import { Progress } from '@sveltestyle/sveltestyle';`;

  const props = [
    { name: 'value', type: 'number', default: '0', description: 'Current value (0–max).' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show an indeterminate sliding bar.' },
    { name: 'variant', type: "'primary' | 'success' | 'warning' | 'error'", default: "'primary'", description: 'Color.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar thickness.' },
    { name: 'showLabel', type: 'boolean', default: 'false', description: 'Show a percentage label.' },
  ];
</script>

<DocsPage title="Progress" subtitle="A linear progress bar — determinate or indeterminate.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code}>
    {#snippet stage()}
      <div style="width:100%;max-width:26rem">
        <Progress {value} {variant} showLabel />
      </div>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="variant" options={variants} bind:value={variant}>
        {#snippet swatch(v)}
          <div style="width:3rem"><Progress value={60} variant={v} /></div>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-field" style="flex:1">
          <span>value: {value}</span>
          <input type="range" min="0" max="100" bind:value={value} />
        </label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="Sizes">
    <div style="display:flex;flex-direction:column;gap:var(--space-4);width:100%;max-width:26rem">
      <Progress value={65} size="sm" />
      <Progress value={65} size="md" />
      <Progress value={65} size="lg" />
    </div>
  </DocExample>

  <DocExample title="Indeterminate" description="When you don't know the progress amount.">
    <div style="width:100%;max-width:26rem">
      <Progress indeterminate />
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
