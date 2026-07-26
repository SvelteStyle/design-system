<script>
  import { Button } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let variant = $state('primary');
  let size = $state('md');
  let label = $state('Click me');
  let disabled = $state(false);
  let full = $state(false);

  const variants = ['primary', 'secondary', 'ghost', 'danger', 'danger-outline'];
  const sizes = ['sm', 'md', 'lg'];

  let code = $derived.by(() => {
    const attrs = [`variant="${variant}"`];
    if (size !== 'md') attrs.push(`size="${size}"`);
    if (full) attrs.push('full');
    if (disabled) attrs.push('disabled');
    return `<Button ${attrs.join(' ')}>${label}</Button>`;
  });

  const importCode = `import { Button } from '@sveltestyle/sveltestyle';`;
  const variantsCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`;
  const iconCode = `<Button variant="primary">
  <span class="material-symbols-outlined">add</span>
  New item
</Button>`;

  const props = [
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-outline'", default: "'primary'", description: 'Visual style.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
    { name: 'full', type: 'boolean', default: 'false', description: 'Stretch to full width of the container.' },
    { name: 'icon', type: 'boolean', default: 'false', description: 'Icon-only square button (no text padding).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'href', type: 'string', default: '—', description: 'Render as an anchor link instead of a button.' },
    { name: 'onclick', type: '() => void', default: '—', description: 'Click handler (passed through).' },
  ];
</script>

<DocsPage title="Button" subtitle="Trigger actions with one of five variants and three sizes.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code}>
    {#snippet stage()}
      <Button {variant} {size} {full} {disabled}>{label}</Button>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="variant" options={variants} bind:value={variant}>
        {#snippet swatch(v)}
          <Button variant={v} size="sm">{v === 'danger-outline' ? 'Danger' : v[0].toUpperCase() + v.slice(1)}</Button>
        {/snippet}
      </VariantPicker>
      <VariantPicker label="size" options={sizes} bind:value={size}>
        {#snippet swatch(s)}
          <Button variant="secondary" size={s}>{s}</Button>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-field">
          <span>label</span>
          <input type="text" bind:value={label} />
        </label>
        <label class="pg-check"><input type="checkbox" bind:checked={full} /> full width</label>
        <label class="pg-check"><input type="checkbox" bind:checked={disabled} /> disabled</label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="Variants" description="Five visual styles for different emphasis." code={variantsCode}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="danger-outline">Danger outline</Button>
  </DocExample>

  <DocExample title="With an icon" description="Nest a Material Symbols icon inside the button." code={iconCode}>
    <Button variant="primary"><span class="material-symbols-outlined">add</span> New item</Button>
    <Button variant="secondary"><span class="material-symbols-outlined">download</span> Export</Button>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

</DocsPage>
