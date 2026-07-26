<script>
  import { Checkbox, Radio, RadioGroup, Field } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let checked = $state(true);
  let indeterminate = $state(false);
  let plan = $state('pro');
  let interests = $state({ design: true, dev: false, marketing: false });

  const importCode = `import { Checkbox, Radio, RadioGroup } from '@sveltestyle/sveltestyle';`;

  const checkboxCode = `<script>
  let checked = $state(false);
<\/script>

<Checkbox bind:checked label="Accept terms" />`;

  const radioGroupCode = `<script>
  let plan = $state('pro');
<\/script>

<RadioGroup
  bind:value={plan}
  options={['free', 'pro', 'enterprise']}
/>`;

  const checkboxProps = [
    { name: 'checked', type: 'boolean (bindable)', default: 'false', description: 'Checked state.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show the indeterminate (dash) state.' },
    { name: 'label', type: 'string', default: '—', description: 'Text beside the box.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];
  const radioProps = [
    { name: 'group', type: 'any (bindable)', default: '—', description: 'The selected value shared across the radio set.' },
    { name: 'value', type: 'any', default: '—', description: "This radio's value." },
    { name: 'label', type: 'string', default: '—', description: 'Text beside the circle.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];
  const radioGroupProps = [
    { name: 'value', type: 'any (bindable)', default: '—', description: 'Selected value.' },
    { name: 'options', type: 'Array<{value,label,disabled?}> | string[]', default: '[]', description: 'The choices.' },
    { name: 'inline', type: 'boolean', default: 'false', description: 'Lay out horizontally.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all options.' },
  ];
</script>

<DocsPage title="Checkbox & Radio" subtitle="Boolean and single-choice form controls.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Checkbox" description="A single boolean toggle with a label." code={checkboxCode}>
    <div style="display:flex;flex-direction:column;gap:var(--space-3)">
      <Checkbox bind:checked label="Subscribe to newsletter" />
      <Checkbox checked label="Checked by default" />
      <Checkbox indeterminate label="Indeterminate" />
      <Checkbox disabled label="Disabled" />
    </div>
  </DocExample>

  <DocExample title="Checkbox group (manual)" description="Compose several checkboxes over your own state object.">
    <div style="display:flex;flex-direction:column;gap:var(--space-3)">
      <Checkbox bind:checked={interests.design} label="Design" />
      <Checkbox bind:checked={interests.dev} label="Development" />
      <Checkbox bind:checked={interests.marketing} label="Marketing" />
      <p class="text-muted" style="font-size:var(--text-sm)">
        Selected: {Object.entries(interests).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'}
      </p>
    </div>
  </DocExample>

  <DocExample title="Radio group" description="Single choice from a set of options." code={radioGroupCode}>
    <RadioGroup bind:value={plan} options={['free', 'pro', 'enterprise']} />
    <p class="text-muted" style="font-size:var(--text-sm)">Selected: {plan}</p>
  </DocExample>

  <DocExample title="Inline radios" description="Horizontal layout with the inline prop.">
    <RadioGroup
      value="md"
      inline
      options={[{value:'sm',label:'Small'},{value:'md',label:'Medium'},{value:'lg',label:'Large'}]}
    />
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Checkbox props</h2>
    <PropsTable rows={checkboxProps} />
  </section>
  <section class="docs-section">
    <h2 class="docs-h2">Radio props</h2>
    <PropsTable rows={radioProps} />
  </section>
  <section class="docs-section">
    <h2 class="docs-h2">RadioGroup props</h2>
    <PropsTable rows={radioGroupProps} />
  </section>

</DocsPage>
