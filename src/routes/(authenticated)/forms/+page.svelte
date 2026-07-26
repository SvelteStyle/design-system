<script>
  import { Card, Button, Field, Input, Select, Toggle } from '@sveltestyle/sveltestyle';

  let name     = $state('');
  let email    = $state('');
  let role     = $state('Administrator');
  let notes    = $state('');
  let notify   = $state(true);
  let darkMode = $state(false);
  let autoSave = $state(true);
</script>

<div class="shell-content-inner">

  <div class="page-header">
    <div>
      <h1 class="page-title">Forms</h1>
      <p class="page-subtitle">All form controls from <code>@sveltestyle/sveltestyle</code></p>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-6);align-items:start">

    <Card title="Text inputs">
      <Field label="Full name" required>
        <Input bind:value={name} placeholder="Jane Doe" />
      </Field>
      <Field label="Email" style="margin-top:var(--space-4)">
        <Input bind:value={email} type="email" iconLeft="mail" placeholder="jane@example.com" />
      </Field>
      <Field label="Search" style="margin-top:var(--space-4)">
        <Input type="text" iconLeft="search" placeholder="Search..." />
      </Field>
      <Field label="With error" error="This field is required" style="margin-top:var(--space-4)">
        <Input value="invalid" error />
      </Field>
      <Field label="Disabled" optional style="margin-top:var(--space-4)">
        <Input value="Cannot edit" disabled />
      </Field>
      <Field label="Password" style="margin-top:var(--space-4)">
        <Input type="password" iconLeft="lock" iconRight="visibility" placeholder="••••••••" />
      </Field>
    </Card>

    <div style="display:flex;flex-direction:column;gap:var(--space-4)">

      <Card title="Select & textarea">
        <Field label="Role">
          <Select bind:value={role}>
            <option>Administrator</option>
            <option>Editor</option>
            <option>Viewer</option>
          </Select>
        </Field>
        <Field label="Department" style="margin-top:var(--space-4)">
          <Select>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
          </Select>
        </Field>
        <Field label="Notes" optional hint="Max 500 characters" style="margin-top:var(--space-4)">
          <textarea class="textarea" bind:value={notes} placeholder="Enter notes..."></textarea>
        </Field>
      </Card>

      <Card title="Toggles">
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          <Toggle bind:checked={notify}   label="Email notifications" />
          <Toggle bind:checked={darkMode} label="Dark mode" />
          <Toggle bind:checked={autoSave} label="Auto-save drafts" />
          <Toggle label="Disabled" disabled />
        </div>
      </Card>

      <Card title="Checkboxes & radios">
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div>
            <div class="section-label">Permissions</div>
            <div style="display:flex;flex-direction:column;gap:var(--space-2)">
              <label class="checkbox"><input type="checkbox" checked /><span class="checkbox-label">Read</span></label>
              <label class="checkbox"><input type="checkbox" checked /><span class="checkbox-label">Write</span></label>
              <label class="checkbox"><input type="checkbox" /><span class="checkbox-label">Delete</span></label>
            </div>
          </div>
          <div>
            <div class="section-label">Plan</div>
            <div style="display:flex;gap:var(--space-4)">
              <label class="radio"><input type="radio" name="plan" checked /><span class="radio-label">Free</span></label>
              <label class="radio"><input type="radio" name="plan" /><span class="radio-label">Pro</span></label>
              <label class="radio"><input type="radio" name="plan" /><span class="radio-label">Enterprise</span></label>
            </div>
          </div>
        </div>
      </Card>

    </div>
  </div>

  <Card title="Full form example" subtitle="Add new user" style="margin-top:var(--space-6)">
    <div class="form-row form-row-2">
      <Field label="First name" required><Input placeholder="Jane" /></Field>
      <Field label="Last name"  required><Input placeholder="Doe"  /></Field>
    </div>
    <div style="margin-top:var(--space-4)">
      <Field label="Email" required>
        <Input type="email" iconLeft="mail" placeholder="jane@example.com" />
      </Field>
    </div>
    <div class="form-row form-row-2" style="margin-top:var(--space-4)">
      <Field label="Role">
        <Select><option>Administrator</option><option>Editor</option><option>Viewer</option></Select>
      </Field>
      <Field label="Department">
        <Select><option>Engineering</option><option>Marketing</option><option>Finance</option></Select>
      </Field>
    </div>
    {#snippet footer()}
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Create user</Button>
    {/snippet}
  </Card>

</div>

<style>
  .section-label {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--color-text-subtle);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wider);
    margin-bottom: var(--space-2);
  }
</style>
