<script>
  // Horizontal second-level menu. A trigger (the top-level item) shows
  // an arrow; clicking it opens a dropdown panel of sub-items. Use
  // `direction="down"` for top bars, `direction="up"` for bottom bar / dock.
  //
  // Props:
  //   item       — { href, icon, label, children }
  //   isActive   — (href) => boolean
  //   direction  — 'down' | 'up'
  //   triggerClass — class applied to the trigger so it matches the bar's links
  //   align      — 'start' | 'center' | 'end' (horizontal alignment of the panel)
  let {
    item,
    isActive = () => false,
    direction = 'down',
    triggerClass = '',
    align = 'start',
    compact = false,
  } = $props();

  let open = $state(false);
  let root;

  const selfActive = $derived(isActive(item.href));
  const childActive = $derived(item.children?.some((c) => isActive(c.href)));

  function toggle() { open = !open; }
  function close() { open = false; }

  // Close on outside click / Escape.
  $effect(() => {
    if (!open) return;
    function onDoc(e) { if (root && !root.contains(e.target)) close(); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  });
</script>

<div class="flyout" class:open bind:this={root}>
  <div class="flyout-trigger" class:compact>
    <a
      href={item.href}
      class={`flyout-main ${triggerClass}`}
      class:active={selfActive || childActive}
      onclick={close}
    >
      {#if item.icon}<span class="material-symbols-outlined">{item.icon}</span>{/if}
      <span>{item.label}</span>
    </a>
    <button
      type="button"
      class="flyout-arrow-btn"
      aria-label={open ? 'Close submenu' : 'Open submenu'}
      aria-expanded={open}
      aria-haspopup="menu"
      onclick={toggle}
    >
      <span class="material-symbols-outlined flyout-arrow" class:up={direction === 'up'} class:open>
        expand_more
      </span>
    </button>
  </div>

  {#if open}
    <div
      class="flyout-panel"
      class:up={direction === 'up'}
      class:align-end={align === 'end'}
      class:align-center={align === 'center'}
      role="menu"
    >
      {#each item.children as child}
        <a
          href={child.href}
          class="flyout-link"
          class:active={isActive(child.href)}
          role="menuitem"
          onclick={close}
        >
          {#if child.icon}<span class="material-symbols-outlined">{child.icon}</span>{/if}
          <span class="flyout-link-name">{child.label}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .flyout { position: relative; display: inline-flex; }
  /* Transparent wrapper. The link inside carries the bar's own nav class
     (lyt-toplink, du-link, …, now :global) so it's identical to a plain item. */
  .flyout-trigger {
    display: inline-flex; align-items: center; gap: var(--space-1);
  }
  .flyout-main { cursor: pointer; }
  .flyout-arrow-btn {
    display: inline-flex; align-items: center; justify-content: center;
    border: none; background: none; cursor: pointer; color: inherit;
    padding: 0; border-radius: var(--radius-sm); opacity: 0.7;
    transition: opacity var(--duration-fast), background var(--duration-fast);
  }
  .flyout-arrow-btn:hover { opacity: 1; background: rgb(127 127 127 / 0.18); }
  .flyout-arrow {
    font-size: 1.1rem;
    transition: transform var(--duration-fast) var(--ease-default);
  }

  /* Down menus: arrow points down, flips up when open.
     Up menus: arrow points up by default, flips down when open. */
  .flyout-arrow.up { transform: rotate(180deg); }
  .flyout-arrow.open { transform: rotate(180deg); }
  .flyout-arrow.up.open { transform: rotate(0deg); }

  .flyout-panel {
    position: absolute;
    z-index: 200;
    min-width: 13rem;
    display: flex; flex-direction: column; gap: 1px;
    padding: var(--space-2);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    /* default: open downward, left-aligned */
    top: calc(100% + var(--space-2));
    left: 0;
    animation: flyout-in var(--duration-fast) var(--ease-default);
  }
  .flyout-panel.up { top: auto; bottom: calc(100% + var(--space-2)); }
  .flyout-panel.align-end { left: auto; right: 0; }
  .flyout-panel.align-center { left: 50%; transform: translateX(-50%); }

  @keyframes flyout-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .flyout-panel.up.align-center { transform: translateX(-50%); }

  .flyout-link {
    display: flex; align-items: center; gap: var(--space-2);
    padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm);
    color: var(--color-text-muted); text-decoration: none;
    font-size: var(--text-sm); font-weight: var(--font-medium); white-space: nowrap;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .flyout-link .material-symbols-outlined { font-size: 1.15rem; }
  .flyout-link:hover { background: var(--color-bg-subtle); color: var(--color-text); }
  .flyout-link.active { background: var(--color-info-bg); color: var(--color-primary); }
  .flyout-link-name { flex: 1; }

  /* Compact bars (bottom nav, dock): the link already stacks icon over
     label via its global .bn-item/.dk-item class — just tuck the arrow
     button into the corner of the wrapper. */
  .flyout-trigger.compact { position: relative; }
  .flyout-trigger.compact .flyout-arrow-btn {
    position: absolute; top: 2px; right: 2px;
  }
  .flyout-trigger.compact .flyout-arrow {
    font-size: 0.95rem; opacity: 0.55;
  }
</style>
