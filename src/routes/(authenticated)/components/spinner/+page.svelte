<script>
  import { Spinner, Button } from '@sveltestyle/sveltestyle';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import DocExample from '$lib/docs/DocExample.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
  import DocsPage from '$lib/docs/DocsPage.svelte';

  let loading = $state(false);
  function fakeSave() {
    loading = true;
    setTimeout(() => (loading = false), 1800);
  }

  const importCode = `import { Spinner } from '@sveltestyle/sveltestyle';`;
  const basicCode = `<Spinner />
<Spinner size="1.5rem" />
<Spinner size="2rem" />`;
  const inlineCode = `<p>Saving your changes <Spinner /></p>`;
  const buttonCode = `<script>
  let loading = $state(false);
<\/script>

<!-- Button has built-in loading support -->
<Button {loading} onclick={save}>Save changes</Button>

<!-- …or drop a Spinner in manually -->
<Button><Spinner /> Loading…</Button>`;

  const props = [
    { name: 'size', type: 'string', default: '1em', description: 'CSS size (e.g. "1.5rem", "24px"). Defaults to text size.' },
    { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible label (role="status").' },
  ];
</script>

<DocsPage title="Spinner" subtitle="An inline loading indicator — sizes to text and inherits color.">

  <section class="docs-section">
    <h2 class="docs-h2">Import</h2>
    <CodeBlock code={importCode} lang="js" />
  </section>

  <DocExample title="Sizes" description="Defaults to 1em (matches surrounding text); set size for larger." code={basicCode}>
    <div style="display:flex;align-items:center;gap:var(--space-4)">
      <Spinner />
      <Spinner size="1.5rem" />
      <Spinner size="2rem" />
      <Spinner size="3rem" />
    </div>
  </DocExample>

  <DocExample title="Inline with text" description="Because it's 1em and uses currentColor, it flows with text." code={inlineCode}>
    <p style="color:var(--color-text)">Saving your changes <Spinner /></p>
    <p style="color:var(--color-primary)">Primary colored <Spinner /></p>
  </DocExample>

  <DocExample title="In a button" description="Button has a loading prop that shows the spinner and disables it. Or drop a Spinner in manually." code={buttonCode}>
    <div style="display:flex;gap:var(--space-3);align-items:center;flex-wrap:wrap">
      <Button loading={loading} onclick={fakeSave}>Save changes</Button>
      <Button variant="secondary"><Spinner /> Loading…</Button>
      <Button variant="primary" loading>Submitting</Button>
    </div>
  </DocExample>

  <section class="docs-section">
    <h2 class="docs-h2">Spinner props</h2>
    <PropsTable rows={props} />
  </section>

  <section class="docs-section">
    <h2 class="docs-h2">Button loading prop</h2>
    <PropsTable rows={[
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show an inline spinner and disable the button.' },
    ]} />
  </section>

</DocsPage>
