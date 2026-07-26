<script>
  import { Tooltip, Button } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import VariantPicker from '$lib/docs/VariantPicker.svelte';
  import Playground from '$lib/docs/Playground.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let position = $state('top');
  let text = $state('Tooltip text');
  const positions = ['top', 'bottom', 'left', 'right'];

  let code = $derived(`<Tooltip text="${text}" position="${position}">
  <Button>Hover me</Button>
</Tooltip>`);

  const importCode = `import { Tooltip } from '@sveltestyle/sveltestyle';`;
  const iconCode = `<Tooltip text="Delete" position="top">
  <button class="btn btn-ghost btn-icon" aria-label="Delete">
    <span class="material-symbols-outlined">delete</span>
  </button>
</Tooltip>`;

  const props = [
    { name: 'text', type: 'string', default: '—', description: 'The tooltip content.' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Which side the tooltip appears on.' },
    { name: 'children', type: 'snippet', default: '—', description: 'The trigger element.' },
  ];
</script>

<DocsPage title="Tooltip" subtitle="A small hint shown on hover or focus.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <Playground {code} intro="Pick a position and hover the button. Also shows on keyboard focus.">
    {#snippet stage()}
      <div style="padding:var(--space-8)">
        <Tooltip {text} {position}>
          <Button variant="secondary">Hover me</Button>
        </Tooltip>
      </div>
    {/snippet}
    {#snippet controls()}
      <VariantPicker label="position" options={positions} bind:value={position}>
        {#snippet swatch(p)}
          <span style="font-size:var(--text-xs)">{p}</span>
        {/snippet}
      </VariantPicker>
      <div class="pg-extra">
        <label class="pg-field"><span>text</span><input type="text" bind:value={text} /></label>
      </div>
    {/snippet}
  </Playground>

  <DocExample title="On an icon button" description="The most common use — labeling icon-only controls." code={iconCode}>
    <div style="display:flex;gap:var(--space-4)">
      <Tooltip text="Edit" position="top">
        <button class="btn btn-ghost btn-icon" aria-label="Edit"><span class="material-symbols-outlined">edit</span></button>
      </Tooltip>
      <Tooltip text="Duplicate" position="bottom">
        <button class="btn btn-ghost btn-icon" aria-label="Duplicate"><span class="material-symbols-outlined">content_copy</span></button>
      </Tooltip>
      <Tooltip text="Delete" position="top">
        <button class="btn btn-ghost btn-icon" aria-label="Delete"><span class="material-symbols-outlined">delete</span></button>
      </Tooltip>
    </div>
  </DocExample>

  <DocExample title="All positions">
    <div style="display:flex;gap:var(--space-6);padding:var(--space-6)">
      {#each ['top','bottom','left','right'] as p}
        <Tooltip text={p} position={p}>
          <Button variant="ghost" size="sm">{p}</Button>
        </Tooltip>
      {/each}
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Props</h2>
    <PropsTable rows={props} />
  </section>

  <section class="docs-section">
    <p class="docs-lead">
      <strong>Note:</strong> uses CSS positioning, so it's best for short hints on
      elements that aren't near a scroll edge. For rich, collision-aware floating
      content, a Popover (with a positioning library) is the future Tier-2 option.
    </p>
  </section>

</DocsPage>
