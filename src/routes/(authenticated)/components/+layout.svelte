<script>
  // The components area no longer has its own sub-navigation — the
  // second-level menu in the main app nav (Components → each component)
  // handles that. This layout just provides the padded page container.
  let { children } = $props();
</script>

<div class="shell-content-inner">
  {@render children?.()}
</div>
