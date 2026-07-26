<script>
  import CodeBlock from './CodeBlock.svelte';
  // stage   — snippet rendering the live component
  // controls — snippet rendering pickers / inputs
  // code    — the live code string
  // intro   — optional helper text
  let { stage, controls, code = '', intro = 'Pick options below — every choice is a live preview, and the code updates as you select.' } = $props();
</script>

<section class="docs-section">
  <h2 class="docs-h2">Playground</h2>
  {#if intro}<p>{intro}</p>{/if}

  <div class="pg">
    <div class="pg-stage">
      {@render stage?.()}
    </div>
    {#if controls}
      <div class="pg-pickers">
        {@render controls?.()}
      </div>
    {/if}
  </div>

  {#if code}
    <div style="margin-top:var(--space-4)">
      <CodeBlock {code} />
    </div>
  {/if}
</section>

<style>
  .docs-section { margin-top: var(--space-8); }
  .docs-h2 { font-size: var(--text-xl); font-weight: var(--font-semibold); margin-bottom: var(--space-3); }
  .docs-section > p { color: var(--color-text-muted); margin-bottom: var(--space-3); }

  .pg { display: flex; flex-direction: column; gap: var(--space-4); }
  .pg-stage {
    display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: var(--space-3);
    min-height: 7rem; padding: var(--space-6);
    border: 1px solid var(--color-border); border-radius: var(--radius-md);
    background:
      linear-gradient(var(--color-bg-subtle) 1px, transparent 1px) 0 0 / 100% 100%,
      var(--color-surface);
  }
  .pg-pickers {
    display: flex; flex-direction: column; gap: var(--space-4);
    padding: var(--space-4);
    border: 1px solid var(--color-border); border-radius: var(--radius-md);
    background: var(--color-bg-subtle);
  }
  /* Shared control styles available to consumer snippets */
  .pg-pickers :global(.pg-extra) { display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--space-4); }
  .pg-pickers :global(.pg-field) { display: flex; flex-direction: column; gap: var(--space-1); }
  .pg-pickers :global(.pg-field span) { font-size: var(--text-xs); font-weight: var(--font-semibold);
    color: var(--color-text-muted); text-transform: uppercase; letter-spacing: var(--tracking-wide); }
  .pg-pickers :global(.pg-field input), .pg-pickers :global(.pg-field select) {
    padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-sm);
    border: 1px solid var(--color-border); border-radius: var(--radius-sm);
    background: var(--color-surface); color: var(--color-text);
  }
  .pg-pickers :global(.pg-check) { display: flex; align-items: center; gap: var(--space-2);
    font-size: var(--text-sm); color: var(--color-text); }
</style>
