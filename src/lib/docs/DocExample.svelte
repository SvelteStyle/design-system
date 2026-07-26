<script>
  import CodeBlock from './CodeBlock.svelte';

  let { title = '', description = '', code = '', children } = $props();
</script>

<section class="doc-example">
  {#if title}<h3 class="doc-example-title">{title}</h3>{/if}
  {#if description}<p class="doc-example-desc">{description}</p>{/if}

  <div class="doc-preview">
    {@render children?.()}
  </div>

  {#if code}
    <div class="doc-code">
      <CodeBlock {code} />
    </div>
  {/if}
</section>

<style>
  .doc-example { margin-bottom: var(--space-8); }
  .doc-example-title { font-size: var(--text-lg); font-weight: var(--font-semibold); margin-bottom: var(--space-1); }
  .doc-example-desc { color: var(--color-text-muted); font-size: var(--text-sm); margin-bottom: var(--space-3); }
  .doc-preview {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-6);
    background:
      linear-gradient(var(--color-bg-subtle) 1px, transparent 1px) 0 0 / 100% 100%,
      var(--color-surface);
    display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center;
  }
  .doc-code { margin-top: calc(var(--space-3) * -1 + var(--space-3)); }
  .doc-code :global(.code-block) { border-top-left-radius: 0; border-top-right-radius: 0; margin-top: -1px; }
</style>
