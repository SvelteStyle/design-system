<script>
  import { Textarea, Field } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let value = $state('');

  const importCode = `import { Textarea } from '@sveltestyle/sveltestyle';`;
  const basicCode = `<script>
  let value = $state('');
<\/script>

<Textarea bind:value placeholder="Write a message…" rows={4} />`;

  const props = [
    { name: 'value', type: 'string (bindable)', default: "''", description: 'Text content.' },
    { name: 'rows', type: 'number', default: '4', description: 'Visible rows.' },
    { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text.' },
    { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Resize behavior.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error styling.' },
    { name: 'success', type: 'boolean', default: 'false', description: 'Success styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only.' },
  ];
</script>

<DocsPage title="Textarea" subtitle="Multiline text input.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Basic" description="Bind a value and set the visible rows." code={basicCode}>
    <div style="width:100%;max-width:28rem">
      <Textarea bind:value placeholder="Write a message…" rows={4} />
      <p class="text-muted" style="font-size:var(--text-sm);margin-top:var(--space-2)">{value.length} characters</p>
    </div>
  </DocExample>

  <DocExample title="In a Field with states" description="Compose with Field for labels, hints, and errors.">
    <div style="display:flex;flex-direction:column;gap:var(--space-4);width:100%;max-width:28rem">
      <Field label="Bio" hint="A short description">
        <Textarea placeholder="Tell us about yourself" rows={3} />
      </Field>
      <Field label="Feedback" error="This field is required">
        <Textarea error rows={3} />
      </Field>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
