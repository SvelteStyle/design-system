<script>
  import { Table, Badge } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'commits', label: 'Commits', sortable: true, align: 'right' },
    { key: 'status', label: 'Status' },
  ];
  const rows = [
    { name: 'Ada Lovelace', role: 'Engineer', commits: 128, status: 'active' },
    { name: 'Alan Turing', role: 'Architect', commits: 342, status: 'active' },
    { name: 'Grace Hopper', role: 'Lead', commits: 89, status: 'away' },
    { name: 'Linus Pauling', role: 'Engineer', commits: 205, status: 'active' },
  ];

  const importCode = `import { Table } from '@sveltestyle/sveltestyle';`;
  const basicCode = `<Table
  sortable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'commits', label: 'Commits', sortable: true, align: 'right' },
  ]}
  {rows}
/>`;
  const cellCode = `<Table {columns} {rows}>
  {#snippet cell(row, col)}
    {#if col.key === 'status'}
      <Badge variant={row.status === 'active' ? 'success' : 'warning'} dot>
        {row.status}
      </Badge>
    {:else}
      {row[col.key]}
    {/if}
  {/snippet}
</Table>`;

  const props = [
    { name: 'columns', type: 'Array<{key,label,sortable?,align?,width?}>', default: '[]', description: 'Column definitions.' },
    { name: 'rows', type: 'object[]', default: '[]', description: 'Row data keyed by column key.' },
    { name: 'cell', type: 'snippet(row, col)', default: '—', description: 'Custom cell renderer.' },
    { name: 'sortable', type: 'boolean', default: 'false', description: 'Enable sorting for all columns (per-column overrides).' },
    { name: 'striped', type: 'boolean', default: 'false', description: 'Zebra-striped rows.' },
    { name: 'emptyText', type: 'string', default: "'No data'", description: 'Shown when there are no rows.' },
  ];
</script>

<DocsPage title="Table" subtitle="A data table with sortable columns, custom cells, and an empty state.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Sortable" description="Click a sortable column header to sort. Sorting is client-side and non-destructive." code={basicCode}>
    <div style="width:100%">
      <Table {columns} {rows} striped>
        {#snippet cell(row, col)}
          {#if col.key === 'status'}
            <Badge variant={row.status === 'active' ? 'success' : 'warning'} dot>{row.status}</Badge>
          {:else}
            {row[col.key]}
          {/if}
        {/snippet}
      </Table>
    </div>
  </DocExample>

  <DocExample title="Custom cells" description="Use the cell snippet to render badges, buttons, or anything per cell." code={cellCode}>
    <div style="width:100%">
      <Table columns={[{key:'name',label:'Name'},{key:'status',label:'Status'}]} {rows}>
        {#snippet cell(row, col)}
          {#if col.key === 'status'}
            <Badge variant={row.status === 'active' ? 'success' : 'warning'} dot>{row.status}</Badge>
          {:else}
            {row[col.key]}
          {/if}
        {/snippet}
      </Table>
    </div>
  </DocExample>

  <DocExample title="Empty state" description="Renders emptyText when there are no rows.">
    <div style="width:100%">
      <Table {columns} rows={[]} emptyText="No team members yet" />
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
