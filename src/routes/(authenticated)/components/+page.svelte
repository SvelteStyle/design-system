<script>
  import {
    Button, Card, Badge, Alert,
    Modal, ConfirmDialog,
    Accordion, AccordionItem
  } from '@sveltestyle/sveltestyle';

  let showModal   = $state(false);
  let showConfirm = $state(false);
</script>

<Modal bind:open={showModal} title="Edit record" subtitle="Update the details below">
  <div class="field">
    <label class="label label-required">Full name</label>
    <input class="input" type="text" placeholder="Jane Doe" />
  </div>
  <div class="field">
    <label class="label">Role</label>
    <select class="select">
      <option>Administrator</option>
      <option>Editor</option>
      <option>Viewer</option>
    </select>
  </div>
  {#snippet footer()}
    <Button variant="secondary" onclick={() => showModal = false}>Cancel</Button>
    <Button variant="primary">Save changes</Button>
  {/snippet}
</Modal>

<ConfirmDialog
  bind:open={showConfirm}
  title="Delete this item?"
  message="This cannot be undone."
  confirmLabel="Delete"
/>

<div class="comp-page">

  <div class="page-header">
    <div>
      <h1 class="page-title">Components</h1>
      <p class="page-subtitle">All available UI components from <code>@sveltestyle/sveltestyle</code></p>
    </div>
  </div>

  <div class="docs-callout">
    <span class="material-symbols-outlined">menu_book</span>
    <div>
      <strong>Detailed docs with code &amp; playgrounds</strong>
      <span>Open any component from the <strong>Components</strong> submenu in the main menu — each has live examples, a playground, and a props table.</span>
    </div>
  </div>

  <section class="preview-section">
    <div class="preview-title">Button</div>
    <Card>
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);align-items:center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-outline">Danger outline</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);align-items:center">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary">Default</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="ghost" icon aria-label="Settings">
            <span class="material-symbols-outlined">settings</span>
          </Button>
          <Button variant="secondary" icon size="sm" aria-label="Close">
            <span class="material-symbols-outlined">close</span>
          </Button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);align-items:center">
          <Button variant="primary" onclick={() => showModal = true}>
            <span class="material-symbols-outlined">add</span> Open modal
          </Button>
          <Button variant="danger-outline" onclick={() => showConfirm = true}>
            <span class="material-symbols-outlined">delete</span> Confirm dialog
          </Button>
          <Button variant="secondary" href="/components">
            <span class="material-symbols-outlined">link</span> As link
          </Button>
        </div>
      </div>
    </Card>
  </section>

  <section class="preview-section">
    <div class="preview-title">Badge</div>
    <Card>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);align-items:center">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success" dot>Active</Badge>
        <Badge variant="warning" dot>Pending</Badge>
        <Badge variant="error" dot>Offline</Badge>
      </div>
    </Card>
  </section>

  <section class="preview-section">
    <div class="preview-title">Alert</div>
    <div style="display:flex;flex-direction:column;gap:var(--space-3)">
      <Alert variant="info"    title="Heads up">Your API key will expire in 7 days.</Alert>
      <Alert variant="success" title="Saved">Your changes have been saved and published.</Alert>
      <Alert variant="warning" title="Storage almost full">You're using 90% of your storage.</Alert>
      <Alert variant="error"   title="Connection failed">Could not reach the server.</Alert>
    </div>
  </section>

  <section class="preview-section">
    <div class="preview-title">Card</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4)">
      <Card title="Standard card">
        <p class="text-sm text-muted">Default card with title and shadow.</p>
        {#snippet footer()}
          <Button variant="secondary" size="sm">Action</Button>
        {/snippet}
      </Card>
      <Card variant="interactive">
        <div style="font-weight:var(--font-semibold);margin-bottom:var(--space-2)">Interactive</div>
        <p class="text-sm text-muted">Hover to see the effect.</p>
      </Card>
      <Card variant="selected">
        <div style="font-weight:var(--font-semibold);margin-bottom:var(--space-2)">Selected</div>
        <p class="text-sm text-muted">Active/selected state.</p>
      </Card>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-4);margin-top:var(--space-4)">
      <Card variant="info"   ><p class="text-sm">Info card</p></Card>
      <Card variant="success"><p class="text-sm">Success card</p></Card>
      <Card variant="warning"><p class="text-sm">Warning card</p></Card>
      <Card variant="error"  ><p class="text-sm">Error card</p></Card>
    </div>
  </section>

  <section class="preview-section">
    <div class="preview-title">Accordion & AccordionItem</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-4)">
      <div>
        <p class="text-sm text-muted" style="margin-bottom:var(--space-2)">Default — single open</p>
        <Accordion>
          <AccordionItem title="What is a design system?" icon="help" initialOpen>
            A collection of reusable components guided by clear standards.
          </AccordionItem>
          <AccordionItem title="How are tokens used?" icon="palette">
            CSS custom properties that store visual design decisions.
          </AccordionItem>
          <AccordionItem title="Adding dark mode?" icon="dark_mode">
            Redefine semantic tokens in a <code>prefers-color-scheme: dark</code> block.
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p class="text-sm text-muted" style="margin-bottom:var(--space-2)">Separated — multiple open</p>
        <Accordion variant="separated" multiple>
          <AccordionItem title="Notifications" subtitle="Email and in-app" icon="notifications" badge={3} initialOpen>
            Configure your notification preferences here.
          </AccordionItem>
          <AccordionItem title="Security" subtitle="2FA, sessions" icon="security">
            Manage your security settings.
          </AccordionItem>
          <AccordionItem title="Appearance" icon="palette">
            Customize the look and feel.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>

</div>

<style>
  .docs-callout {
    display: flex; align-items: center; gap: var(--space-3);
    padding: var(--space-4); margin-bottom: var(--space-6);
    border: 1px solid var(--color-border); border-radius: var(--radius-md);
    background: var(--color-info-bg);
  }
  .docs-callout > .material-symbols-outlined { color: var(--color-info); font-size: 1.5rem; }
  .docs-callout > div { flex: 1; display: flex; flex-direction: column; }
  .docs-callout strong { color: var(--color-text); font-size: var(--text-sm); }
  .docs-callout span { color: var(--color-text-muted); font-size: var(--text-sm); }

  .preview-section { margin-bottom: var(--space-8); }
  .preview-title {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--color-text-subtle);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--color-border);
  }
</style>
