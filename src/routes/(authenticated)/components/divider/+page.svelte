<script>
  import { Divider } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  const importCode = `import { Divider } from '@sveltestyle/sveltestyle';`;
  const basicCode = `<Divider />
<Divider label="OR" />
<span>A</span> <Divider vertical /> <span>B</span>`;

  const props = [
    { name: 'vertical', type: 'boolean', default: 'false', description: 'Render a vertical separator (inline).' },
    { name: 'label', type: 'string', default: '—', description: 'Centered label text on a horizontal divider.' },
    { name: 'strong', type: 'boolean', default: 'false', description: 'Use the stronger border color.' },
  ];
</script>

<DocsPage title="Divider" subtitle="A horizontal or vertical separator, optionally labeled.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Variations" description="Plain, labeled, and vertical." code={basicCode}>
    <div style="width:100%;max-width:26rem">
      <p class="text-muted" style="font-size:var(--text-sm)">Section one</p>
      <Divider />
      <p class="text-muted" style="font-size:var(--text-sm)">Section two</p>
      <Divider label="OR" />
      <p class="text-muted" style="font-size:var(--text-sm)">Section three</p>
      <div style="display:flex;align-items:center;margin-top:var(--space-4)">
        <span>Home</span><Divider vertical /><span>Docs</span><Divider vertical /><span>About</span>
      </div>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
