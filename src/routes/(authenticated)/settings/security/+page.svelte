<script>
  import { Card, Button, Field, Input, Toggle, Badge, Alert, ConfirmDialog } from '@sveltestyle/sveltestyle';

  let current = $state('');
  let next    = $state('');
  let confirm = $state('');

  let twoFactor = $state(true);
  let loginAlerts = $state(true);

  let pwError = $derived(
    next && confirm && next !== confirm ? 'Passwords do not match' : ''
  );

  let updated = $state(false);
  function updatePassword() {
    if (!next || pwError) return;
    updated = true;
    current = next = confirm = '';
    setTimeout(() => (updated = false), 2500);
  }

  const sessions = [
    { device: 'MacBook Pro · Chrome', where: 'Toronto, CA', when: 'Active now', current: true },
    { device: 'iPhone 15 · Safari',   where: 'Toronto, CA', when: '2 hours ago', current: false },
    { device: 'Windows · Edge',       where: 'Montreal, CA', when: 'Yesterday', current: false },
  ];

  let showDelete = $state(false);
</script>

{#if updated}
  <div style="margin-bottom:var(--space-4)">
    <Alert variant="success" title="Password updated">Use your new password next time you sign in.</Alert>
  </div>
{/if}

<div class="sec-grid">

  <Card title="Password" subtitle="Use at least 8 characters">
    <Field label="Current password">
      <Input bind:value={current} type="password" iconLeft="lock" />
    </Field>
    <Field label="New password" style="margin-top:var(--space-4)">
      <Input bind:value={next} type="password" iconLeft="key" />
    </Field>
    <Field label="Confirm new password" error={pwError} style="margin-top:var(--space-4)">
      <Input bind:value={confirm} type="password" iconLeft="key" error={!!pwError} />
    </Field>
    <div style="margin-top:var(--space-5)">
      <Button variant="primary" onclick={updatePassword}>Update password</Button>
    </div>
  </Card>

  <Card title="Two-factor authentication" subtitle="Extra protection at sign-in">
    <div class="sec-row">
      <div>
        <div class="sec-row-title">
          Authenticator app
          {#if twoFactor}<Badge variant="success" dot>Enabled</Badge>{:else}<Badge variant="warning" dot>Off</Badge>{/if}
        </div>
        <p class="text-muted text-sm">Require a code from your authenticator when signing in.</p>
      </div>
      <Toggle bind:checked={twoFactor} />
    </div>
    <div class="sec-row" style="margin-top:var(--space-4)">
      <div>
        <div class="sec-row-title">Login alerts</div>
        <p class="text-muted text-sm">Email me about sign-ins from new devices.</p>
      </div>
      <Toggle bind:checked={loginAlerts} />
    </div>
  </Card>

</div>

<Card title="Active sessions" subtitle="Devices currently signed in" style="margin-top:var(--space-6)">
  <div class="session-list">
    {#each sessions as s}
      <div class="session">
        <span class="material-symbols-outlined session-icon">{s.current ? 'computer' : 'devices'}</span>
        <div class="session-info">
          <div class="session-device">
            {s.device}
            {#if s.current}<Badge variant="primary">This device</Badge>{/if}
          </div>
          <div class="text-muted text-sm">{s.where} · {s.when}</div>
        </div>
        {#if !s.current}
          <Button variant="ghost" size="sm">Revoke</Button>
        {/if}
      </div>
    {/each}
  </div>
</Card>

<Card variant="subtle" style="margin-top:var(--space-6);border-color:var(--color-error)">
  <div class="danger">
    <div>
      <h3 class="card-title" style="color:var(--color-error)">Delete account</h3>
      <p class="text-muted text-sm">Permanently remove your account and all data. This cannot be undone.</p>
    </div>
    <Button variant="danger" onclick={() => showDelete = true}>Delete account</Button>
  </div>
</Card>

<ConfirmDialog
  open={showDelete}
  title="Delete account?"
  message="This permanently deletes your account and all associated data. This action cannot be undone."
  confirmLabel="Delete account"
  variant="danger"
  onconfirm={() => showDelete = false}
  oncancel={() => showDelete = false}
/>

<style>
  .sec-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); align-items: start; }
  @media (max-width: 800px) { .sec-grid { grid-template-columns: 1fr; } }
  .sec-row { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4); }
  .sec-row-title { display: flex; align-items: center; gap: var(--space-2); font-weight: var(--font-medium); color: var(--color-text); }
  .session-list { display: flex; flex-direction: column; }
  .session { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--color-border); }
  .session:last-child { border-bottom: none; }
  .session-icon { color: var(--color-text-muted); }
  .session-info { flex: 1; min-width: 0; }
  .session-device { display: flex; align-items: center; gap: var(--space-2); font-weight: var(--font-medium); color: var(--color-text); }
  .danger { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); }
</style>
