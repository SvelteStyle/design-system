<script>
  import { Calendar, DatePicker, Field } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let picked = $state(null);
  let inline = $state(new Date());

  const importCode = `import { Calendar, DatePicker } from '@sveltestyle/sveltestyle';`;
  const datePickerCode = `<script>
  let value = $state(null);
<\/script>

<DatePicker bind:value />`;
  const calendarCode = `<script>
  let value = $state(new Date());
<\/script>

<Calendar bind:value />`;

  const datePickerProps = [
    { name: 'value', type: 'Date | null (bindable)', default: 'null', description: 'The selected date.' },
    { name: 'placeholder', type: 'string', default: "'Select a date'", description: 'Shown when no date is selected.' },
    { name: 'format', type: '(date) => string', default: 'locale short', description: 'Custom display formatter.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the field.' },
  ];
  const calendarProps = [
    { name: 'value', type: 'Date | null (bindable)', default: 'null', description: 'The selected date.' },
    { name: 'onselect', type: '(date) => void', default: '—', description: 'Called when a day is clicked.' },
  ];
</script>

<DocsPage title="Calendar & Date Picker" subtitle="Pick a single date — inline calendar or a popover field.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Date Picker" description="A field that opens a calendar popover. Closes on select, outside-click, or Escape." code={datePickerCode}>
    <div style="display:flex;flex-direction:column;gap:var(--space-3)">
      <DatePicker bind:value={picked} />
      <p class="text-muted" style="font-size:var(--text-sm)">
        Selected: {picked ? picked.toDateString() : 'none'}
      </p>
    </div>
  </DocExample>

  <DocExample title="In a Field" description="Compose with Field for a label and hint.">
    <div style="max-width:16rem">
      <Field label="Start date" hint="When the project begins">
        <DatePicker bind:value={picked} />
      </Field>
    </div>
  </DocExample>

  <DocExample title="Inline calendar" description="Use the Calendar directly for an always-visible month grid." code={calendarCode}>
    <div style="display:flex;flex-direction:column;gap:var(--space-3);align-items:flex-start">
      <Calendar bind:value={inline} />
      <p class="text-muted" style="font-size:var(--text-sm)">
        Selected: {inline ? inline.toDateString() : 'none'}
      </p>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">DatePicker props</h2>
    <PropsTable rows={datePickerProps} />
  </section>
  <section class="docs-section">
    <h2 class="docs-h2">Calendar props</h2>
    <PropsTable rows={calendarProps} />
  </section>

  <section class="docs-section">
    <p class="docs-lead">
      <strong>Scope:</strong> intentionally simple — single date only, no keyboard
      navigation, no min/max range, no time. Those are natural future additions
      (see the roadmap's ⚠️ notes) but aren't needed for basic date selection.
    </p>
  </section>

</DocsPage>
