<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    // Clear session/token here in a real app, then redirect
    goto('/login');
  });
</script>

<div class="login-page">
  <div style="text-align:center;color:var(--color-text-muted)">
    <span class="material-symbols-outlined" style="font-size:2rem;display:block;margin-bottom:var(--space-2)">logout</span>
    Signing out...
  </div>
</div>
