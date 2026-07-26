<script>
  import { Modal, ConfirmDialog, Button, Field, Input } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let open = $state(false);
  let openDrawer = $state(false);
  let openConfirm = $state(false);

  const importCode = `import { Modal, ConfirmDialog } from '@sveltestyle/sveltestyle';`;

  const modalCode = `<script>
  let open = $state(false);
<\/script>

<Button onclick={() => open = true}>Open modal</Button>

<Modal bind:open title="Edit record" subtitle="Update the details below">
  <Field label="Name"><Input placeholder="Jane Doe" /></Field>

  {#snippet footer()}
    <Button variant="secondary" onclick={() => open = false}>Cancel</Button>
    <Button variant="primary">Save</Button>
  {/snippet}
</Modal>`;

  const confirmCode = `<ConfirmDialog
  bind:open
  variant="danger"
  title="Delete item?"
  message="This cannot be undone."
  confirmLabel="Delete"
  onconfirm={() => { /* ... */ }}
/>`;

  const modalProps = [
    { name: 'open', type: 'boolean (bindable)', default: 'false', description: 'Controls visibility.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Dialog width.' },
    { name: 'drawer', type: 'boolean', default: 'false', description: 'Slide in from the side as a drawer.' },
    { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Click the backdrop to close.' },
    { name: 'title', type: 'string', default: '—', description: 'Header title.' },
    { name: 'subtitle', type: 'string', default: '—', description: 'Header subtitle.' },
    { name: 'header', type: 'snippet', default: '—', description: 'Custom header.' },
    { name: 'footer', type: 'snippet', default: '—', description: 'Footer (usually actions).' },
  ];

  const confirmProps = [
    { name: 'open', type: 'boolean (bindable)', default: 'false', description: 'Controls visibility.' },
    { name: 'variant', type: "'danger' | 'warning' | 'info'", default: "'danger'", description: 'Icon + confirm-button color.' },
    { name: 'title', type: 'string', default: "'Are you sure?'", description: 'Dialog title.' },
    { name: 'message', type: 'string', default: '—', description: 'Body message.' },
    { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Confirm button text.' },
    { name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Cancel button text.' },
    { name: 'onconfirm', type: '() => void', default: '—', description: 'Called on confirm.' },
    { name: 'oncancel', type: '() => void', default: '—', description: 'Called on cancel.' },
  ];
</script>

<DocsPage title="Modal & Confirm Dialog" subtitle="Overlay dialogs for focused tasks and confirmations.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Modal" description="A centered dialog with header, body, and footer." code={modalCode}>
    <Button variant="primary" onclick={() => open = true}>Open modal</Button>
    <Button variant="secondary" onclick={() => openDrawer = true}>Open as drawer</Button>
  </DocExample>

  <DocExample title="Confirm dialog" description="A focused yes/no prompt for destructive actions." code={confirmCode}>
    <Button variant="danger" onclick={() => openConfirm = true}>Delete item…</Button>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Modal props</h2>
    <PropsTable rows={modalProps} />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">ConfirmDialog props</h2>
    <PropsTable rows={confirmProps} />
  </section>

</DocsPage>

<!-- Live dialog instances -->
<Modal bind:open title="Edit record" subtitle="Update the details below">
  <Field label="Full name"><Input placeholder="Jane Doe" /></Field>
  {#snippet footer()}
    <Button variant="secondary" onclick={() => open = false}>Cancel</Button>
    <Button variant="primary" onclick={() => open = false}>Save changes</Button>
  {/snippet}
</Modal>

<Modal bind:open={openDrawer} drawer title="Filters" subtitle="Refine your view">
  <Field label="Search"><Input iconLeft="search" placeholder="Search…" /></Field>
  {#snippet footer()}
    <Button variant="secondary" onclick={() => openDrawer = false}>Close</Button>
    <Button variant="primary" onclick={() => openDrawer = false}>Apply</Button>
  {/snippet}
</Modal>

<ConfirmDialog
  bind:open={openConfirm}
  variant="danger"
  title="Delete item?"
  message="This permanently removes the item. This action cannot be undone."
  confirmLabel="Delete"
  onconfirm={() => openConfirm = false}
  oncancel={() => openConfirm = false}
/>
