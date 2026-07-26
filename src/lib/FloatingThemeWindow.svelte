<script>
  import { onMount } from 'svelte';
  import { draftTheme } from '$lib/theme-store.svelte.js';
  import { appMode } from '$lib/app-mode.svelte.js';
  import { theme } from '@sveltestyle/sveltestyle/theme';
  import { PRESETS } from '$lib/theme-presets.js';
  import { TEMPLATES } from '$lib/templates.js';

  let { ontobuilder } = $props();

  // Selecting a template restyles the whole app in place (AppLayout
  // reads appMode.template) — no navigation needed.
  function pickTemplate(id) {
    appMode.setTemplate(id);
  }

  // ── Drag state ──
  let pos = $state({ x: 0, y: 0 });
  let collapsed = $state(false);
  let dragging = false;
  let offset = { x: 0, y: 0 };
  let winEl;

  const POS_KEY = 'sb-float-pos';

  onMount(() => {
    // restore position, default bottom-right
    let restored = null;
    try { restored = JSON.parse(localStorage.getItem(POS_KEY)); } catch {}
    if (restored && typeof restored.x === 'number') {
      pos = clampToViewport(restored.x, restored.y);
    } else {
      const w = winEl?.offsetWidth ?? 280;
      const h = winEl?.offsetHeight ?? 320;
      pos = { x: window.innerWidth - w - 24, y: window.innerHeight - h - 24 };
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  function clampToViewport(x, y) {
    const w = winEl?.offsetWidth ?? 280;
    const h = winEl?.offsetHeight ?? 80;
    return {
      x: Math.min(Math.max(8, x), window.innerWidth - w - 8),
      y: Math.min(Math.max(8, y), window.innerHeight - h - 8),
    };
  }

  function onResize() { pos = clampToViewport(pos.x, pos.y); }

  function startDrag(e) {
    dragging = true;
    const p = 'touches' in e ? e.touches[0] : e;
    offset = { x: p.clientX - pos.x, y: p.clientY - pos.y };
    window.addEventListener('pointermove', onDrag);
    window.addEventListener('pointerup', endDrag);
  }
  function onDrag(e) {
    if (!dragging) return;
    pos = clampToViewport(e.clientX - offset.x, e.clientY - offset.y);
  }
  function endDrag() {
    dragging = false;
    window.removeEventListener('pointermove', onDrag);
    window.removeEventListener('pointerup', endDrag);
    try { localStorage.setItem(POS_KEY, JSON.stringify(pos)); } catch {}
  }
</script>

<div
  class="float-win"
  class:collapsed
  bind:this={winEl}
  style="left:{pos.x}px; top:{pos.y}px"
>
  <!-- Drag handle / header -->
  <div class="fw-head" onpointerdown={startDrag}>
    <span class="material-symbols-outlined fw-grip">drag_indicator</span>
    <span class="fw-title">Theme</span>
    <div class="fw-head-actions">
      <button class="fw-icon" aria-label={collapsed ? 'Expand' : 'Collapse'}
        onpointerdown={(e) => e.stopPropagation()}
        onclick={() => collapsed = !collapsed}>
        <span class="material-symbols-outlined">{collapsed ? 'expand_less' : 'expand_more'}</span>
      </button>
    </div>
  </div>

  {#if !collapsed}
    <div class="fw-body">
      <!-- Preset swatches -->
      <div class="fw-label">Preset</div>
      <div class="fw-presets">
        {#each PRESETS as p}
          <button
            class="fw-preset"
            class:active={draftTheme.activePreset === p.id}
            title={p.desc}
            onclick={() => draftTheme.applyPreset(p.id)}
          >
            <span class="fw-dot" style="background:{p.swatch}"></span>
            <span class="fw-preset-name">{p.name}</span>
            {#if draftTheme.activePreset === p.id}
              <span class="material-symbols-outlined fw-check">check</span>
            {/if}
          </button>
        {/each}
        {#if draftTheme.activePreset === 'custom'}
          <div class="fw-custom-note">
            <span class="material-symbols-outlined">edit</span> Custom (edited in builder)
          </div>
        {/if}
      </div>

      <!-- Template selector -->
      <div>
        <div class="fw-label">Template</div>
        <div class="fw-templates">
          {#each TEMPLATES as t}
            <button
              class="fw-tpl"
              class:active={appMode.template === t.id}
              title={t.desc}
              onclick={() => pickTemplate(t.id)}
            >
              <span class="material-symbols-outlined fw-tpl-icon">{t.icon}</span>
              <span class="fw-tpl-name">{t.name}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Light / dark -->
      <div class="fw-row">
        <span class="fw-label" style="margin:0">Mode</span>
        <div class="fw-seg">
          <button class="fw-seg-btn" class:active={!theme.isDark} onclick={() => theme.set('light')}>
            <span class="material-symbols-outlined">light_mode</span>
          </button>
          <button class="fw-seg-btn" class:active={theme.isDark} onclick={() => theme.set('dark')}>
            <span class="material-symbols-outlined">dark_mode</span>
          </button>
        </div>
      </div>

      <!-- Jump to builder -->
      <button class="fw-builder-btn" onclick={() => ontobuilder?.()}>
        <span class="material-symbols-outlined">tune</span>
        Open Theme Builder
      </button>
    </div>
  {/if}
</div>

<style>
  .float-win {
    position: fixed;
    z-index: 900;
    width: 260px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    user-select: none;
    color: var(--color-text);
  }
  .float-win.collapsed { width: 200px; }

  .fw-head {
    display: flex; align-items: center; gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: var(--color-bg-subtle);
    border-bottom: 1px solid var(--color-border);
    cursor: grab;
    touch-action: none;
  }
  .fw-head:active { cursor: grabbing; }
  .fw-grip { font-size: 1.1rem; color: var(--color-text-subtle); }
  .fw-title { flex: 1; font-size: var(--text-sm); font-weight: var(--font-semibold); }
  .fw-head-actions { display: flex; gap: var(--space-1); }
  .fw-icon {
    display: flex; align-items: center; justify-content: center;
    width: 1.6rem; height: 1.6rem; border: none; background: none; cursor: pointer;
    border-radius: var(--radius-sm); color: var(--color-text-muted);
  }
  .fw-icon:hover { background: var(--color-border); color: var(--color-text); }
  .fw-icon .material-symbols-outlined { font-size: 1.1rem; }

  .fw-body { padding: var(--space-3); display: flex; flex-direction: column; gap: var(--space-3); }

  .fw-label {
    font-size: var(--text-xs); font-weight: var(--font-semibold);
    text-transform: uppercase; letter-spacing: var(--tracking-wider);
    color: var(--color-text-subtle); margin-bottom: var(--space-1);
  }

  .fw-presets { display: flex; flex-direction: column; gap: var(--space-1); }
  .fw-preset {
    display: flex; align-items: center; gap: var(--space-2);
    padding: var(--space-2); border: 1px solid transparent; background: none; cursor: pointer;
    border-radius: var(--radius-sm); text-align: left; width: 100%;
    font: inherit; font-size: var(--text-sm); color: var(--color-text);
    transition: background var(--duration-fast), border-color var(--duration-fast);
  }
  .fw-preset:hover { background: var(--color-bg-subtle); }
  .fw-preset.active { border-color: var(--color-primary); background: var(--color-info-bg); }
  .fw-dot { width: 1rem; height: 1rem; border-radius: var(--radius-full); flex-shrink: 0;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.1); }
  .fw-preset-name { flex: 1; }
  .fw-check { font-size: 1.05rem; color: var(--color-primary); }
  .fw-custom-note {
    display: flex; align-items: center; gap: var(--space-1);
    font-size: var(--text-xs); color: var(--color-text-muted);
    padding: var(--space-1) var(--space-2);
  }
  .fw-custom-note .material-symbols-outlined { font-size: 0.95rem; }

  .fw-templates { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-1); }
  .fw-tpl {
    display: flex; align-items: center; gap: var(--space-1);
    padding: var(--space-2); border: 1px solid var(--color-border); background: none; cursor: pointer;
    border-radius: var(--radius-sm); text-align: left;
    font: inherit; font-size: var(--text-xs); color: var(--color-text-muted);
    transition: border-color var(--duration-fast), color var(--duration-fast), background var(--duration-fast);
    overflow: hidden;
  }
  .fw-tpl:hover { background: var(--color-bg-subtle); color: var(--color-text); }
  .fw-tpl.active { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-info-bg); }
  .fw-tpl-icon { font-size: 1.05rem; flex-shrink: 0; }
  .fw-tpl-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .fw-row { display: flex; align-items: center; justify-content: space-between; }
  .fw-seg {
    display: inline-flex; background: var(--color-bg-subtle);
    border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 2px;
  }
  .fw-seg-btn {
    display: flex; align-items: center; justify-content: center;
    width: 2rem; height: 1.6rem; border: none; background: none; cursor: pointer;
    border-radius: var(--radius-sm); color: var(--color-text-muted);
  }
  .fw-seg-btn .material-symbols-outlined { font-size: 1rem; }
  .fw-seg-btn.active { background: var(--color-surface); color: var(--color-text); box-shadow: var(--shadow-xs); }

  .fw-builder-btn {
    display: flex; align-items: center; justify-content: center; gap: var(--space-2);
    width: 100%; padding: var(--space-2) var(--space-3);
    border: none; border-radius: var(--radius-md); cursor: pointer;
    background: var(--color-primary); color: var(--color-primary-text);
    font: inherit; font-size: var(--text-sm); font-weight: var(--font-medium);
    transition: background var(--duration-fast);
  }
  .fw-builder-btn:hover { background: var(--color-primary-hover); }
  .fw-builder-btn .material-symbols-outlined { font-size: 1.1rem; }
</style>
