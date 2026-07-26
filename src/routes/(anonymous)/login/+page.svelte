<script>
  import { Button, Field, Input } from '@sveltestyle/sveltestyle';

  let email    = $state('');
  let password = $state('');
</script>

<div class="login-page login-page-patterned">
  <div class="login-card card">
    <div class="card-body" style="padding:var(--space-8)">

      <div class="login-brand">
        <div class="login-logo">
          <span class="material-symbols-outlined">layers</span>
        </div>
        <h1 class="login-title">Welcome back</h1>
        <p class="login-subtitle">Sign in to your account to continue</p>
      </div>

      <Field label="Email address" required>
        <Input bind:value={email} type="email" iconLeft="mail" placeholder="you@example.com" />
      </Field>

      <div style="margin-top:var(--space-4)">
        <Field label="Password" required>
          <Input bind:value={password} type="password" iconLeft="lock" placeholder="••••••••" />
        </Field>
        <a href="#" class="login-forgot">Forgot password?</a>
      </div>

      <div style="margin-top:var(--space-6)">
        <Button variant="primary" full size="lg">Sign in</Button>
      </div>

      <div class="login-footer">
        Don't have an account? <a href="#">Contact your administrator</a>
      </div>

    </div>
  </div>
</div>
