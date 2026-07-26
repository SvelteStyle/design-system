<script>
  import { MaskedInput, Field } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  const masks = {
    'Phone': '(999) 999-9999',
    'Date': '99/99/9999',
    'Card': '9999 9999 9999 9999',
    'Plate': 'AAA-9999',
    'Time': '99:99',
  };
  let maskName = $state('Phone');
  let raw = $state('');
  let showMask = $state(false);

  let code = $derived(`<MaskedInput mask="${masks[maskName]}"${showMask ? ' showMask' : ''} bind:value />`);

  const importCode = `import { MaskedInput } from '@sveltestyle/sveltestyle';`;

  const props = [
    { name: 'value', type: 'string (bindable)', default: "''", description: 'The RAW (unmasked) characters, e.g. "5551234567".' },
    { name: 'mask', type: 'string', default: "''", description: 'Pattern: 9 = digit, A = letter, * = alphanumeric; other chars are literals.' },
    { name: 'showMask', type: 'boolean', default: 'false', description: 'Always display the full template with unfilled slots (e.g. (___) ___-____).' },
    { name: 'maskChar', type: 'string', default: "'_'", description: 'Placeholder character for unfilled slots when showMask is on.' },
    { name: 'placeholder', type: 'string', default: 'mask', description: 'Defaults to the mask pattern.' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error styling.' },
    { name: 'success', type: 'boolean', default: 'false', description: 'Success styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input.' },
  ];
</script>

<DocsPage title="Masked Input" subtitle="Format-as-you-type input that keeps a clean, unmasked value.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code} intro="Pick a mask and type — the field formats as you go, while value stays raw.">
    {#snippet stage()}
      <div style="width:100%;max-width:22rem">
        <MaskedInput mask={masks[maskName]} {showMask} bind:value={raw} />
        <p class="text-muted" style="font-size:var(--text-sm);margin-top:var(--space-2)">
          raw value: <code>{raw || '(empty)'}</code>
        </p>
      </div>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="mask" options={Object.keys(masks)} bind:value={maskName}>
        {#snippet swatch(m)}
          <span style="font-family:var(--font-mono);font-size:var(--text-xs)">{m}</span>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-check"><input type="checkbox" bind:checked={showMask} /> showMask (display the template)</label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="Mask tokens" description="9 = digit · A = letter · * = alphanumeric · everything else is a literal.">
    <div style="display:flex;flex-direction:column;gap:var(--space-4);width:100%;max-width:22rem">
      <Field label="Phone"><MaskedInput mask="(999) 999-9999" /></Field>
      <Field label="Date"><MaskedInput mask="99/99/9999" /></Field>
      <Field label="License plate"><MaskedInput mask="AAA-9999" /></Field>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

  <section class="docs-section">
    <p class="docs-lead">
      <strong>Note:</strong> <code>value</code> holds only the raw token characters
      (digits/letters), not the punctuation — so <code>(555) 123-4567</code>
      binds as <code>5551234567</code>, ready to store or validate.
    </p>
  </section>

</DocsPage>
