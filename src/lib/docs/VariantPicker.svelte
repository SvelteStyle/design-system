<script>
  // A row of selectable swatches. Each option renders a live preview
  // (via the `swatch` snippet) with a caption underneath; selecting
  // one updates the bound value.
  //
  // Props:
  //   label    — small heading above the row
  //   options  — array of string values (the captions + values)
  //   value    — $bindable selected value
  //   swatch   — snippet(option) rendering the live preview for an option
  let { label = '', options = [], value = $bindable(), swatch } = $props();
</script>

<div class="vp">
  {#if label}<div class="vp-label">{label}</div>{/if}
  <div class="vp-grid">
    {#each options as opt}
      <button
        type="button"
        class="vp-item"
        class:active={value === opt}
        onclick={() => (value = opt)}
        aria-pressed={value === opt}
      >
        <div class="vp-preview">
          {@render swatch?.(opt)}
        </div>
        <span class="vp-caption">{opt}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .vp-label {
    font-size: var(--text-xs); font-weight: var(--font-semibold);
    text-transform: uppercase; letter-spacing: var(--tracking-wide);
    color: var(--color-text-muted); margin-bottom: var(--space-2);
  }
  .vp-grid { display: flex; flex-wrap: wrap; gap: var(--space-2); }
  .vp-item {
    display: flex; flex-direction: column; align-items: center; gap: var(--space-2);
    padding: var(--space-3) var(--space-3) var(--space-2);
    border: 1px solid var(--color-border); border-radius: var(--radius-md);
    background: var(--color-surface); cursor: pointer;
    transition: border-color var(--duration-fast), box-shadow var(--duration-fast), transform var(--duration-fast);
  }
  .vp-item:hover { transform: translateY(-1px); box-shadow: var(--shadow-sm); }
  .vp-item.active { border-color: var(--color-primary); box-shadow: 0 0 0 1px var(--color-primary); }
  .vp-preview { display: flex; align-items: center; justify-content: center; min-height: 2.25rem; pointer-events: none; }
  .vp-caption {
    font-family: var(--font-mono); font-size: var(--text-xs);
    color: var(--color-text-muted);
  }
  .vp-item.active .vp-caption { color: var(--color-primary); font-weight: var(--font-semibold); }
</style>
