<script>
  import { Dropdown, Button } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let last = $state('—');

  const importCode = `import { Dropdown } from '@sveltestyle/sveltestyle';`;

  const basicCode = `<Dropdown
  label="Actions"
  items={[
    { label: 'Edit',      icon: 'edit',    onclick: () => {} },
    { label: 'Duplicate', icon: 'copy',    onclick: () => {} },
    { divider: true },
    { label: 'Delete',    icon: 'delete',  danger: true, onclick: () => {} },
  ]}
/>`;

  const menuItems = [
    { label: 'Edit', icon: 'edit', onclick: () => (last = 'Edit') },
    { label: 'Duplicate', icon: 'content_copy', onclick: () => (last = 'Duplicate') },
    { label: 'Share', icon: 'share', onclick: () => (last = 'Share') },
    { divider: true },
    { label: 'Delete', icon: 'delete', danger: true, onclick: () => (last = 'Delete') },
  ];

  const props = [
    { name: 'items', type: 'Array<Item>', default: '[]', description: 'Menu items: { label, icon?, onclick?, href?, danger?, disabled?, divider? }.' },
    { name: 'label', type: 'string', default: "'Options'", description: 'Default trigger button text.' },
    { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Menu alignment relative to the trigger.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the trigger.' },
    { name: 'trigger', type: 'snippet(open)', default: '—', description: 'Custom trigger element.' },
    { name: 'menu', type: 'snippet(close)', default: '—', description: 'Custom menu content.' },
  ];
</script>

<DocsPage title="Dropdown" subtitle="A menu of actions — for row actions and overflow menus.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Basic menu" description="Pass items with labels, icons, and handlers. Closes on select, outside-click, or Escape." code={basicCode}>
    <Dropdown label="Actions" items={menuItems} />
    <span class="text-muted" style="font-size:var(--text-sm)">Last action: {last}</span>
  </DocExample>

  <DocExample title="End-aligned" description="Align the menu to the right edge of the trigger.">
    <div style="display:flex;justify-content:flex-end;width:100%">
      <Dropdown label="More" align="end" items={menuItems} />
    </div>
  </DocExample>

  <DocExample title="Custom trigger" description="Use the trigger snippet for an icon button.">
    <Dropdown items={menuItems}>
      {#snippet trigger(open)}
        <button class="btn btn-ghost" aria-label="Row actions">
          <span class="material-symbols-outlined">more_vert</span>
        </button>
      {/snippet}
    </Dropdown>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
