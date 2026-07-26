<script>
  let { code = '', lang = 'svelte' } = $props();

  let copied = $state(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => (copied = false), 1600);
    } catch {}
  }
</script>

<div class="code-block">
  <div class="code-bar">
    <span class="code-lang">{lang}</span>
    <button class="code-copy" onclick={copy} aria-label="Copy code">
      <span class="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
      {copied ? 'Copied' : 'Copy'}
    </button>
  </div>
  <pre class="code-pre"><code>{code}</code></pre>
</div>

<style>
  .code-block {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    background: var(--color-bg-subtle);
  }
  .code-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--space-2) var(--space-3);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
  }
  .code-lang {
    font-family: var(--font-mono); font-size: var(--text-xs);
    text-transform: uppercase; letter-spacing: var(--tracking-wider);
    color: var(--color-text-subtle);
  }
  .code-copy {
    display: inline-flex; align-items: center; gap: var(--space-1);
    border: none; background: none; cursor: pointer;
    font: inherit; font-size: var(--text-xs); font-weight: var(--font-medium);
    color: var(--color-text-muted);
    padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm);
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .code-copy:hover { background: var(--color-bg-subtle); color: var(--color-text); }
  .code-copy .material-symbols-outlined { font-size: 1rem; }
  .code-pre {
    margin: 0; padding: var(--space-4);
    overflow-x: auto;
    font-family: var(--font-mono); font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
  }
  .code-pre code { font-family: inherit; white-space: pre; }
</style>
