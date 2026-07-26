<script>
  import { Chevron, Collapsible, Card, Button } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let show = $state(false);
  let panel = $state(true);

  const importCode = `import { Chevron, Collapsible } from '@sveltestyle/sveltestyle';`;

  const chevronCode = `<script>
  let open = $state(false);
<\/script>

<Chevron bind:expanded={open} />
{#if open}
  <p>Now you see me.</p>
{/if}`;

  const collapsibleCode = `<Collapsible title="Advanced options">
  <p>Hidden until expanded.</p>
</Collapsible>`;

  const chevronProps = [
    { name: 'expanded', type: 'boolean (bindable)', default: 'false', description: 'The toggle state — bind it to drive your own show/hide.' },
    { name: 'direction', type: "'right' | 'down'", default: "'right'", description: 'Collapsed-state direction (rotates on expand).' },
    { name: 'size', type: 'string', default: '1.25em', description: 'CSS size of the chevron.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable toggling.' },
    { name: 'onToggle', type: '(expanded) => void', default: '—', description: 'Called when toggled.' },
  ];
  const collapsibleProps = [
    { name: 'open', type: 'boolean (bindable)', default: 'false', description: 'Whether the content is shown.' },
    { name: 'title', type: 'string', default: '—', description: 'Simple text trigger label.' },
    { name: 'trigger', type: 'snippet(open)', default: '—', description: 'Custom trigger content (overrides title).' },
    { name: 'children', type: 'snippet', default: '—', description: 'The collapsible content.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable toggling.' },
  ];
</script>

<DocsPage title="Chevron & Collapsible" subtitle="A bindable chevron primitive, and a ready-made show/hide container.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Chevron (primitive)" description="Just the rotating arrow + a bindable `expanded`. Drive show/hide of anything yourself." code={chevronCode}>
    <div style="display:flex;align-items:center;gap:var(--space-2)">
      <Chevron bind:expanded={show} />
      <span class="text-muted" style="font-size:var(--text-sm)">Click the chevron</span>
    </div>
    {#if show}
      <div style="margin-top:var(--space-2);padding:var(--space-3);background:var(--color-bg-subtle);border-radius:var(--radius-md)">
        Now you see me — this block is controlled entirely by your own <code>{'{#if}'}</code>.
      </div>
    {/if}
  </DocExample>

  <DocExample title="Collapsible (composed)" description="Chevron + trigger + content, managing its own state." code={collapsibleCode}>
    <div style="width:100%;max-width:28rem">
      <Collapsible title="Advanced options">
        <p style="margin:0">These settings are hidden until you expand them. The
        Collapsible handles the chevron and the show/hide for you.</p>
      </Collapsible>
    </div>
  </DocExample>

  <DocExample title="Custom trigger" description="Use the trigger snippet for a richer header.">
    <div style="width:100%;max-width:28rem">
      <Collapsible bind:open={panel}>
        {#snippet trigger(open)}
          <span style="font-weight:var(--font-semibold)">Project details</span>
          <span class="text-muted" style="font-size:var(--text-xs);margin-left:auto">
            {open ? 'Hide' : 'Show'}
          </span>
        {/snippet}
        <p style="margin:0">Any content can go here — text, forms, cards…</p>
      </Collapsible>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Chevron props</h2>
    <PropsTable rows={chevronProps} />
  </section>
  <section class="docs-section">
    <h2 class="docs-h2">Collapsible props</h2>
    <PropsTable rows={collapsibleProps} />
  </section>

  <section class="docs-section">
    <p class="docs-lead">
      <strong>When to use which:</strong> reach for <code>Chevron</code> when you
      want the arrow but control the show/hide yourself (e.g. driving a custom
      layout). Reach for <code>Collapsible</code> when you just want a labeled
      section that expands — it wires the two together for you.
    </p>
  </section>

</DocsPage>
