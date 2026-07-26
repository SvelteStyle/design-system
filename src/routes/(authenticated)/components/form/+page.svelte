<script>
  import { Field, Input, Select, Toggle } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let size = $state('md');
  let demoValue = $state('');
  let demoSelect = $state('Editor');
  let demoToggle = $state(true);

  const sizes = ['sm', 'md', 'lg'];

  let code = $derived(`<Field label="Email" required>
  <Input${size !== 'md' ? ` size="${size}"` : ''} type="email" iconLeft="mail" placeholder="you@example.com" />
</Field>`);

  const importCode = `import { Field, Input, Select, Toggle } from '@sveltestyle/sveltestyle';`;

  const fieldProps = [
    { name: 'label', type: 'string', default: '—', description: 'Field label.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Show a required marker.' },
    { name: 'optional', type: 'boolean', default: 'false', description: 'Show an optional marker.' },
    { name: 'hint', type: 'string', default: '—', description: 'Helper text below the control.' },
    { name: 'error', type: 'string', default: '—', description: 'Error message (replaces hint).' },
  ];
  const inputProps = [
    { name: 'value', type: 'string (bindable)', default: "''", description: 'Input value.' },
    { name: 'type', type: 'string', default: "'text'", description: 'HTML input type.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control size.' },
    { name: 'iconLeft', type: 'string', default: '—', description: 'Leading icon name.' },
    { name: 'iconRight', type: 'string', default: '—', description: 'Trailing icon name.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error styling.' },
    { name: 'success', type: 'boolean', default: 'false', description: 'Success styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only input.' },
  ];
  const toggleProps = [
    { name: 'checked', type: 'boolean (bindable)', default: 'false', description: 'On/off state.' },
    { name: 'label', type: 'string', default: '—', description: 'Text beside the switch.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the toggle.' },
  ];
</script>

<DocsPage title="Form controls" subtitle="Field, Input, Select and Toggle — the building blocks of forms.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code} intro="Pick a size — the inputs and code update live.">
    {#snippet stage()}
      <div style="width:100%;max-width:24rem">
        <Field label="Email" required>
          <Input bind:value={demoValue} {size} type="email" iconLeft="mail" placeholder="you@example.com" />
        </Field>
      </div>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="size" options={sizes} bind:value={size}>
        {#snippet swatch(s)}
          <Input size={s} value={s} />
        {/snippet}
      </VariantPicker>
    {/snippet}
  </Playground>

  <DocExample title="Inputs with icons & states" description="Leading/trailing icons, plus error and disabled states.">
    <div style="display:flex;flex-direction:column;gap:var(--space-4);width:100%;max-width:24rem">
      <Field label="Search"><Input type="text" iconLeft="search" placeholder="Search…" /></Field>
      <Field label="Password"><Input type="password" iconLeft="lock" iconRight="visibility" placeholder="••••••••" /></Field>
      <Field label="Email" error="That email is already taken"><Input value="taken@example.com" error /></Field>
      <Field label="Disabled" optional><Input value="Cannot edit" disabled /></Field>
    </div>
  </DocExample>

  <DocExample title="Select & Toggle" description="Dropdowns and switches.">
    <div style="display:flex;flex-direction:column;gap:var(--space-4);width:100%;max-width:24rem">
      <Field label="Role">
        <Select bind:value={demoSelect}>
          <option>Administrator</option>
          <option>Editor</option>
          <option>Viewer</option>
        </Select>
      </Field>
      <Toggle bind:checked={demoToggle} label="Enable notifications" />
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Field props</h2>
    <PropsTable rows={fieldProps} />
  </section>
  <section class="docs-section">
    <h2 class="docs-h2">Input props</h2>
    <PropsTable rows={inputProps} />
  </section>
  <section class="docs-section">
    <h2 class="docs-h2">Toggle props</h2>
    <PropsTable rows={toggleProps} />
  </section>

</DocsPage>
