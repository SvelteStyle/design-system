<script>
  import { Accordion, AccordionItem } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let variant = $state('default');
  let multiple = $state(false);

  const variants = ['default', 'separated', 'minimal', 'flush'];

  let code = $derived.by(() => {
    const attrs = [];
    if (variant !== 'default') attrs.push(`variant="${variant}"`);
    if (multiple) attrs.push('multiple');
    return `<Accordion${attrs.length ? ' ' + attrs.join(' ') : ''}>
  <AccordionItem title="Section one" initialOpen>
    Content for the first section.
  </AccordionItem>
  <AccordionItem title="Section two">
    Content for the second section.
  </AccordionItem>
</Accordion>`;
  });

  const importCode = `import { Accordion, AccordionItem } from '@sveltestyle/sveltestyle';`;

  const accordionProps = [
    { name: 'variant', type: "'default' | 'separated' | 'minimal' | 'flush'", default: "'default'", description: 'Visual style of the group.' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow several items open at once.' },
  ];
  const itemProps = [
    { name: 'title', type: 'string', default: "''", description: 'Header label.' },
    { name: 'subtitle', type: 'string', default: '—', description: 'Optional sub-label.' },
    { name: 'icon', type: 'string', default: '—', description: 'Material Symbols icon name.' },
    { name: 'badge', type: 'string | number', default: '—', description: 'Optional badge in the header.' },
    { name: 'initialOpen', type: 'boolean', default: 'false', description: 'Open by default.' },
  ];
</script>

<DocsPage title="Accordion" subtitle="Collapsible sections for progressive disclosure.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code}>
    {#snippet stage()}
      {#key variant + multiple}
        <div style="width:100%;max-width:32rem">
          <Accordion {variant} {multiple}>
            <AccordionItem title="What is Svelte Style?" icon="info" initialOpen>
              A themeable Svelte 5 component library with a visual theme builder.
            </AccordionItem>
            <AccordionItem title="Is it free?" icon="payments">
              Yes — it's open source under the MIT license.
            </AccordionItem>
            <AccordionItem title="How do I theme it?" icon="palette">
              Use the Theme Builder to generate a drop-in theme.css.
            </AccordionItem>
          </Accordion>
        </div>
      {/key}
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="variant" options={variants} bind:value={variant}>
        {#snippet swatch(v)}
          <span style="font-size:var(--text-xs)">{v}</span>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-check"><input type="checkbox" bind:checked={multiple} /> allow multiple open</label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="With badges" description="Items can show an icon and a badge in the header.">
    <div style="width:100%;max-width:32rem">
      <Accordion variant="separated" multiple>
        <AccordionItem title="Notifications" icon="notifications" badge="3" initialOpen>
          You have three unread notifications.
        </AccordionItem>
        <AccordionItem title="Messages" icon="mail" badge="12">
          Twelve messages in your inbox.
        </AccordionItem>
      </Accordion>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Accordion props</h2>
    <PropsTable rows={accordionProps} />
  </section>
  <section class="docs-section">
    <h2 class="docs-h2">AccordionItem props</h2>
    <PropsTable rows={itemProps} />
  </section>

</DocsPage>
