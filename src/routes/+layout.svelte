<script lang="ts">
  import '@sveltestyle/sveltestyle/css';
  let { children } = $props();
</script>

{@render children?.()}
