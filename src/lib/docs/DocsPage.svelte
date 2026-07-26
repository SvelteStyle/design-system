<script>
  let { title = '', subtitle = '', children } = $props();
</script>

<div class="docs-page">
  <div class="page-header">
    <div>
      <h1 class="page-title">{title}</h1>
      {#if subtitle}<p class="page-subtitle">{subtitle}</p>{/if}
    </div>
  </div>

  {@render children?.()}
</div>

<style>
  .docs-page { max-width: 56rem; }
  /* Shared docs typography for child content */
  .docs-page :global(.docs-section) { margin-top: var(--space-8); }
  .docs-page :global(.docs-h2) { font-size: var(--text-xl); font-weight: var(--font-semibold); margin-bottom: var(--space-3); }
  .docs-page :global(.docs-section > p) { color: var(--color-text-muted); margin-bottom: var(--space-3); }
  .docs-page :global(.docs-lead) { color: var(--color-text-muted); line-height: var(--leading-relaxed); }
</style>
