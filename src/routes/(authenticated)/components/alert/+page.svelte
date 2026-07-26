<script>
  import { Alert } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let variant = $state('info');
  let title = $state('Heads up');
  let body = $state('Your trial ends in 7 days.');

  const variants = ['info', 'success', 'warning', 'error'];

  let code = $derived(`<Alert variant="${variant}" title="${title}">${body}</Alert>`);

  const importCode = `import { Alert } from '@sveltestyle/sveltestyle';`;
  const exampleCode = `<Alert variant="success" title="Saved">
  Your changes were saved successfully.
</Alert>`;

  const props = [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Semantic color + icon.' },
    { name: 'title', type: 'string', default: '—', description: 'Optional bold heading above the body.' },
    { name: 'children', type: 'snippet', default: '—', description: 'The alert body content.' },
  ];
</script>

<DocsPage title="Alert" subtitle="Inline messages that communicate status or feedback.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code}>
    {#snippet stage()}
      <div style="width:100%;max-width:32rem">
        <Alert {variant} {title}>{body}</Alert>
      </div>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="variant" options={variants} bind:value={variant}>
        {#snippet swatch(v)}
          <Alert variant={v} title={v}>Example message</Alert>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-field"><span>title</span><input type="text" bind:value={title} /></label>
        <label class="pg-field" style="flex:1;min-width:14rem"><span>body</span><input type="text" bind:value={body} /></label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="All variants" description="Four semantic styles, each with its own icon." code={exampleCode}>
    <div style="display:flex;flex-direction:column;gap:var(--space-3);width:100%">
      <Alert variant="info" title="Information">A neutral, informational message.</Alert>
      <Alert variant="success" title="Saved">Your changes were saved successfully.</Alert>
      <Alert variant="warning" title="Careful">This action may have side effects.</Alert>
      <Alert variant="error" title="Failed">We couldn't reach the server.</Alert>
    </div>
  </DocExample>

  <DocExample title="Without a title" description="Omit the title for a simple one-line message.">
    <div style="width:100%">
      <Alert variant="info">A short note with no heading.</Alert>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
