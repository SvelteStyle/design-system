<script>
  import {
    Button, Card, Badge, Alert,
    Modal, ConfirmDialog,
    Accordion, AccordionItem,
    Toggle
  } from '@sveltestyle/sveltestyle';

  let showModal   = $state(false);
  let showConfirm = $state(false);
  let deleteTarget = $state('');

  const users = [
    { name: 'Alice Martin', email: 'alice@example.com', role: 'Administrator', status: 'success', label: 'Active'    },
    { name: 'Bob Chen',     email: 'bob@example.com',   role: 'Editor',        status: 'success', label: 'Active'    },
    { name: 'Carol White',  email: 'carol@example.com', role: 'Viewer',        status: 'warning', label: 'Pending'   },
    { name: 'Dan Kim',      email: 'dan@example.com',   role: 'Editor',        status: 'error',   label: 'Suspended' },
    { name: 'Eva Torres',   email: 'eva@example.com',   role: 'Administrator', status: 'success', label: 'Active'    },
  ];

  let notify   = $state(true);
  let inApp    = $state(true);
  let smsAlert = $state(false);
</script>

<Modal bind:open={showModal} title="Edit record" subtitle="Update the details below">
  <div class="field">
    <label class="label label-required">Full name</label>
    <input class="input" type="text" placeholder="Jane Doe" />
  </div>
  <div class="field">
    <label class="label label-required">Email</label>
    <input class="input" type="email" placeholder="jane@example.com" />
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
  title="Delete user?"
  message="This action cannot be undone. The user and all associated data will be permanently removed."
  confirmLabel="Delete"
  onconfirm={() => console.log('Deleted:', deleteTarget)}
/>

<div class="shell-content-inner">

  <div class="page-header">
    <div>
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome back, Jane. Here's what's happening.</p>
    </div>
    <div class="page-header-actions">
      <Button variant="secondary">
        <span class="material-symbols-outlined">download</span>
        Export
      </Button>
      <Button variant="primary" onclick={() => showModal = true}>
        <span class="material-symbols-outlined">add</span>
        New record
      </Button>
    </div>
  </div>

  <!-- Stats -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-4);margin-bottom:var(--space-6)">
    <Card variant="subtle" padding="sm">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
        <span class="text-sm text-muted">Total users</span>
        <span class="material-symbols-outlined" style="color:var(--color-primary);font-size:1.1rem">group</span>
      </div>
      <div style="font-size:var(--text-2xl);font-weight:var(--font-bold)">2,847</div>
      <div style="font-size:var(--text-xs);color:var(--color-success);margin-top:var(--space-1)">↑ 12% from last month</div>
    </Card>
    <Card variant="subtle" padding="sm">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
        <span class="text-sm text-muted">Active sessions</span>
        <span class="material-symbols-outlined" style="color:var(--color-success);font-size:1.1rem">wifi</span>
      </div>
      <div style="font-size:var(--text-2xl);font-weight:var(--font-bold)">143</div>
      <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-1)">Right now</div>
    </Card>
    <Card variant="subtle" padding="sm">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
        <span class="text-sm text-muted">Open tickets</span>
        <span class="material-symbols-outlined" style="color:var(--color-warning);font-size:1.1rem">confirmation_number</span>
      </div>
      <div style="font-size:var(--text-2xl);font-weight:var(--font-bold)">18</div>
      <div style="font-size:var(--text-xs);color:var(--color-warning);margin-top:var(--space-1)">↑ 3 since yesterday</div>
    </Card>
    <Card variant="subtle" padding="sm">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
        <span class="text-sm text-muted">Storage used</span>
        <span class="material-symbols-outlined" style="color:var(--color-text-muted);font-size:1.1rem">storage</span>
      </div>
      <div style="font-size:var(--text-2xl);font-weight:var(--font-bold)">64%</div>
      <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-1)">128 GB of 200 GB</div>
    </Card>
  </div>

  <Alert variant="warning" title="Scheduled maintenance" style="margin-bottom:var(--space-6)">
    The system will be unavailable Sunday June 8th 02:00–04:00 UTC.
  </Alert>

  <!-- Table -->
  <Card padding="none" style="margin-bottom:var(--space-6)">
    {#snippet header()}
      <div>
        <h3 class="card-title">Recent users</h3>
        <p class="card-subtitle">Last 5 registrations</p>
      </div>
      <div class="card-header-actions">
        <Button variant="ghost" size="sm">View all</Button>
      </div>
    {/snippet}
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {#each users as user}
          <tr>
            <td><strong>{user.name}</strong></td>
            <td class="text-muted">{user.email}</td>
            <td>{user.role}</td>
            <td><Badge variant={user.status} dot>{user.label}</Badge></td>
            <td style="text-align:right">
              <Button variant="ghost" icon size="sm"
                onclick={() => { deleteTarget = user.name; showConfirm = true; }}>
                <span class="material-symbols-outlined">delete</span>
              </Button>
            </td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>

  <!-- Accordion settings -->
  <Card>
    {#snippet header()}
      <h3 class="card-title">System settings</h3>
    {/snippet}
    <Accordion>
      <AccordionItem title="Notifications" subtitle="Email and in-app alerts" icon="notifications" initialOpen>
        <div style="display:flex;flex-direction:column;gap:var(--space-2)">
          <Toggle bind:checked={notify}   label="Email notifications" />
          <Toggle bind:checked={inApp}    label="In-app notifications" />
          <Toggle bind:checked={smsAlert} label="SMS alerts" />
        </div>
      </AccordionItem>
      <AccordionItem title="Security" subtitle="Password policy, 2FA, sessions" icon="security" badge={3}>
        Configure password policies, two-factor authentication, and active session management here.
      </AccordionItem>
      <AccordionItem title="Storage & backups" subtitle="Retention policy, schedule" icon="storage">
        Configure data retention policies and automatic backup schedules.
      </AccordionItem>
    </Accordion>
  </Card>

</div>
