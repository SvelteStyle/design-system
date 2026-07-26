<script>
  import { Pagination } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let page = $state(1);
  let page2 = $state(5);
  let page3 = $state(10);

  const importCode = `import { Pagination } from '@sveltestyle/sveltestyle';`;
  const basicCode = `<script>
  let page = $state(1);
<\/script>

<Pagination bind:page total={10} />`;

  const props = [
    { name: 'page', type: 'number (bindable)', default: '1', description: 'Current page (1-based).' },
    { name: 'total', type: 'number', default: '1', description: 'Total number of pages.' },
    { name: 'siblings', type: 'number', default: '1', description: 'Pages shown on each side of the current page.' },
    { name: 'onchange', type: '(page) => void', default: '—', description: 'Called when the page changes.' },
  ];
</script>

<DocsPage title="Pagination" subtitle="Page navigation with ellipsis truncation for long ranges.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Basic" description="Bind the current page. Ellipsis appears automatically for long ranges." code={basicCode}>
    <div style="display:flex;flex-direction:column;gap:var(--space-3);align-items:center;width:100%">
      <Pagination bind:page total={10} />
      <p class="text-muted" style="font-size:var(--text-sm)">Current page: {page}</p>
    </div>
  </DocExample>

  <DocExample title="Long range (middle)" description="Both ellipses show when the current page is in the middle.">
    <div style="display:flex;flex-direction:column;gap:var(--space-3);align-items:center;width:100%">
      <Pagination bind:page={page3} total={20} />
      <p class="text-muted" style="font-size:var(--text-sm)">Page {page3} of 20</p>
    </div>
  </DocExample>

  <DocExample title="More siblings" description="Show more page numbers around the current page.">
    <div style="display:flex;justify-content:center;width:100%">
      <Pagination bind:page={page2} total={20} siblings={2} />
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
