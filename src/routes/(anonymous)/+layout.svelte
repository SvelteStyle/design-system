<script>
  import '@sveltestyle/sveltestyle/css';
  import { onMount } from 'svelte';
  import { theme } from '@sveltestyle/sveltestyle/theme';
  let { children } = $props();
  onMount(() => theme.init());
</script>

{@render children?.()}
