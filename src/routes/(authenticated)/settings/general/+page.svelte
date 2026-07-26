<script>
  import { Card, Button, Field, Input, Select, Toggle, Alert } from '@sveltestyle/sveltestyle';
  import { theme } from '@sveltestyle/sveltestyle/theme';

  let name      = $state('Jane Doe');
  let email     = $state('jane@example.com');
  let workspace = $state('Acme Inc.');
  let role      = $state('Administrator');
  let language  = $state('English');
  let timezone  = $state('America/Toronto');

  let notifyEmail = $state(true);
  let notifyPush  = $state(false);
  let autoSave    = $state(true);

  let saved = $state(false);
  function save() {
    saved = true;
    setTimeout(() => (saved = false), 2500);
  }
</script>

{#if saved}
  <div style="margin-bottom:var(--space-4)">
    <Alert variant="success" title="Saved">Your settings have been updated.</Alert>
  </div>
{/if}

<div class="settings-grid">

  <Card title="Profile" subtitle="How you appear across the workspace">
    <Field label="Full name" required>
      <Input bind:value={name} placeholder="Jane Doe" />
    </Field>
    <Field label="Email" required style="margin-top:var(--space-4)">
      <Input bind:value={email} type="email" iconLeft="mail" />
    </Field>
    <Field label="Role" style="margin-top:var(--space-4)">
      <Select bind:value={role}>
        <option>Administrator</option>
        <option>Editor</option>
        <option>Viewer</option>
      </Select>
    </Field>
  </Card>

  <Card title="Workspace" subtitle="Organization-wide defaults">
    <Field label="Workspace name">
      <Input bind:value={workspace} iconLeft="business" />
    </Field>
    <Field label="Language" style="margin-top:var(--space-4)">
      <Select bind:value={language}>
        <option>English</option>
        <option>Français</option>
        <option>Español</option>
        <option>Deutsch</option>
      </Select>
    </Field>
    <Field label="Timezone" style="margin-top:var(--space-4)">
      <Select bind:value={timezone}>
        <option>America/Toronto</option>
        <option>America/New_York</option>
        <option>Europe/Paris</option>
        <option>Asia/Tokyo</option>
      </Select>
    </Field>
  </Card>

  <Card title="Notifications" subtitle="Choose what you hear about">
    <div class="toggle-list">
      <Toggle bind:checked={notifyEmail} label="Email notifications" />
      <Toggle bind:checked={notifyPush} label="Push notifications" />
      <Toggle bind:checked={autoSave} label="Auto-save changes" />
    </div>
  </Card>

  <Card title="Appearance" subtitle="Theme preference for this browser">
    <div class="toggle-list">
      <Toggle checked={theme.isDark} onchange={() => theme.toggle()} label="Dark mode" />
    </div>
    <p class="text-muted text-sm" style="margin-top:var(--space-3)">
      Want a custom palette? Build one in the <a href="/theme-builder">Theme Builder</a>.
    </p>
  </Card>

</div>

<div class="settings-actions">
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary" onclick={save}>
    <span class="material-symbols-outlined">save</span> Save changes
  </Button>
</div>

<style>
  .settings-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6); align-items: start;
  }
  @media (max-width: 800px) { .settings-grid { grid-template-columns: 1fr; } }
  .toggle-list { display: flex; flex-direction: column; gap: var(--space-4); }
  .settings-actions {
    display: flex; justify-content: flex-end; gap: var(--space-3);
    margin-top: var(--space-6); padding-top: var(--space-5);
    border-top: 1px solid var(--color-border);
  }
</style>
