<script>
  import { goto } from '$app/navigation';
  import {
    Button, Card, Badge, Alert, Field, Input, Select, Toggle, Accordion, AccordionItem
  } from '@sveltestyle/sveltestyle';
  import { theme } from '@sveltestyle/sveltestyle/theme';
  import { THEME_GROUPS } from '$lib/theme-model.js';
  import { draftTheme } from '$lib/theme-store.svelte.js';
  import { appMode } from '$lib/app-mode.svelte.js';
  import { PRESETS } from '$lib/theme-presets.js';

  // Editing mode: which palette the controls write to.
  let mode = $state('light');

  // setToken applies the theme live, but ensure it's applied on entry too.
  $effect(() => {
    JSON.stringify(draftTheme.state);
    draftTheme.applyLive();
  });

  function backToPreview() {
    appMode.set('preview');
    goto('/');
  }

  // Preview demo state
  let demoToggle = $state(true);
  let demoInput = $state('');
  let demoSelect = $state('Editor');

  // Save / export modal
  let showExport = $state(false);
  let exportTab = $state('css');   // 'css' | 'json'

  function openExport() {
    exportTab = 'css';
    showExport = true;
  }

  let exportText = $derived(exportTab === 'css' ? draftTheme.css() : draftTheme.json());

  function slug() {
    return (draftTheme.name || 'theme')
      .toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'theme';
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadCss() {
    downloadBlob(draftTheme.css(), `${slug()}.css`, 'text/css');
  }
  function downloadJson() {
    downloadBlob(draftTheme.json(), `${slug()}.json`, 'application/json');
  }

  async function copyExport() {
    try { await navigator.clipboard.writeText(exportText); } catch {}
  }

  // Import a saved theme.json to continue editing.
  let fileInput;
  let importError = $state('');

  function chooseImport() {
    importError = '';
    fileInput?.click();
  }

  async function onImportFile(e) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      draftTheme.loadFromJson(text);
      importError = '';
    } catch (err) {
      importError = err.message || 'Could not import that file.';
    } finally {
      e.currentTarget.value = '';  // allow re-selecting the same file
    }
  }

  function val(token) {
    return draftTheme.state[mode][token.var];
  }
  function setVal(token, value) {
    draftTheme.setToken(mode, token.var, value);
  }

  // For size controls, split the numeric part from the unit.
  function numOf(v) {
    const m = String(v).match(/-?\d*\.?\d+/);
    return m ? parseFloat(m[0]) : 0;
  }
</script>

<!-- hidden file picker for JSON import -->
<input
  type="file"
  accept="application/json,.json"
  bind:this={fileInput}
  onchange={onImportFile}
  style="display:none"
/>

<!-- Builder app top bar -->
<header class="builder-bar">
  <div class="bb-left">
    <button class="btn btn-ghost btn-sm" onclick={backToPreview}>
      <span class="material-symbols-outlined" style="font-size:1.05rem">arrow_back</span>
      Back to preview
    </button>
    <div class="bb-brand">
      <span class="material-symbols-outlined" style="color:var(--color-accent-light)">tune</span>
      Theme Builder
    </div>
  </div>

  <div class="bb-presets">
    <span class="bb-presets-label">Start from</span>
    {#each PRESETS as p}
      <button
        class="bb-preset"
        class:active={draftTheme.activePreset === p.id}
        title={p.desc}
        onclick={() => draftTheme.applyPreset(p.id)}
      >
        <span class="bb-dot" style="background:{p.swatch}"></span>
        {p.name}
      </button>
    {/each}
  </div>

  <div class="bb-right">
    <button class="btn btn-ghost btn-icon" aria-label="Toggle light/dark" onclick={() => theme.toggle()}>
      <span class="material-symbols-outlined">{theme.isDark ? 'light_mode' : 'dark_mode'}</span>
    </button>
    <button class="btn btn-primary btn-sm" onclick={backToPreview}>
      <span class="material-symbols-outlined" style="font-size:1.05rem">visibility</span>
      Preview mode
    </button>
  </div>
</header>

<div class="builder-scroll">
<div class="shell-content-inner-full builder">

  <div class="page-header">
    <div>
      <h1 class="page-title">Theme Builder</h1>
      <p class="page-subtitle">
        Customize colors, type, radius and shadow for light & dark mode. Your work is kept in this browser — <strong>save to CSS or JSON</strong> to share or back it up.
      </p>
    </div>
    <div class="page-header-actions">
      <div class="name-field">
        <span class="material-symbols-outlined">edit</span>
        <input
          class="name-input"
          type="text"
          aria-label="Theme name"
          placeholder="Theme name"
          value={draftTheme.name}
          oninput={(e) => draftTheme.setName(e.currentTarget.value)}
        />
      </div>
      <Button variant="secondary" onclick={chooseImport}>
        <span class="material-symbols-outlined">upload</span>
        Import
      </Button>
      <Button variant="secondary" onclick={() => draftTheme.reset()}>
        <span class="material-symbols-outlined">restart_alt</span>
        Reset
      </Button>
      <Button variant="primary" onclick={openExport}>
        <span class="material-symbols-outlined">save</span>
        Save / Export
      </Button>
    </div>
  </div>

  {#if importError}
    <div style="margin-bottom:var(--space-4)">
      <Alert variant="error" title="Import failed">{importError}</Alert>
    </div>
  {/if}

  <div class="builder-grid">

    <!-- ─── Editor ─── -->
    <div class="builder-editor">
      <div class="mode-tabs">
        <button class="mode-tab" class:active={mode === 'light'} onclick={() => mode = 'light'}>
          <span class="material-symbols-outlined">light_mode</span> Light
        </button>
        <button class="mode-tab" class:active={mode === 'dark'} onclick={() => mode = 'dark'}>
          <span class="material-symbols-outlined">dark_mode</span> Dark
        </button>
      </div>

      <Accordion variant="separated" multiple>
        {#each THEME_GROUPS as group, i}
          <AccordionItem title={group.label} icon={group.icon} initialOpen={i < 2}>
            <div class="control-list">
              {#each group.tokens as token}
                {@const modeScoped = token.dark !== undefined || token.type !== 'color' && token.type !== 'shadow'}
                <div class="control">
                  <div class="control-head">
                    <label class="control-label" for={`c-${token.var}`}>{token.label}</label>
                    {#if token.help}<span class="control-help">{token.help}</span>{/if}
                  </div>

                  {#if token.type === 'color'}
                    <div class="color-control">
                      <input
                        id={`c-${token.var}`}
                        class="color-swatch"
                        type="color"
                        value={val(token)}
                        oninput={(e) => setVal(token, e.currentTarget.value)}
                      />
                      <input
                        class="color-hex"
                        type="text"
                        value={val(token)}
                        oninput={(e) => setVal(token, e.currentTarget.value)}
                        spellcheck="false"
                      />
                    </div>

                  {:else if token.type === 'select'}
                    <select
                      id={`c-${token.var}`}
                      class="select"
                      value={val(token)}
                      onchange={(e) => setVal(token, e.currentTarget.value)}
                    >
                      {#each token.options as opt}
                        <option value={opt.value}>{opt.label}</option>
                      {/each}
                    </select>

                  {:else if token.type === 'size'}
                    <div class="size-control">
                      <input
                        id={`c-${token.var}`}
                        type="range"
                        min={token.min} max={token.max} step={token.step}
                        value={numOf(val(token))}
                        oninput={(e) => setVal(token, `${e.currentTarget.value}${token.unit}`)}
                      />
                      <span class="size-readout">{val(token)}</span>
                    </div>

                  {:else if token.type === 'shadow'}
                    <textarea
                      id={`c-${token.var}`}
                      class="textarea shadow-input"
                      rows="2"
                      value={val(token)}
                      oninput={(e) => setVal(token, e.currentTarget.value)}
                      spellcheck="false"
                    ></textarea>
                  {/if}
                </div>
              {/each}
            </div>
          </AccordionItem>
        {/each}
      </Accordion>
    </div>

    <!-- ─── Live preview ─── -->
    <div class="builder-preview">
      <div class="preview-bar">
        <span class="text-xs text-muted">LIVE PREVIEW</span>
        <span class="preview-mode-pill">{mode === 'dark' ? 'Dark surfaces' : 'Light surfaces'} match the edited mode</span>
      </div>

      <!-- The preview surface is forced into the mode being edited -->
      <div class="preview-surface" data-theme={mode}>
        <div class="preview-inner">

          <div class="preview-section">
            <h2 class="preview-h">Buttons</h2>
            <div class="cluster">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div class="preview-section">
            <h2 class="preview-h">Cards & badges</h2>
            <div class="grid grid-2">
              <Card title="Revenue" subtitle="This month">
                <div style="font-size:var(--text-2xl);font-weight:var(--font-bold)">$48,250</div>
                <div class="cluster" style="margin-top:var(--space-3)">
                  <Badge variant="success" dot>Active</Badge>
                  <Badge variant="warning" dot>Pending</Badge>
                  <Badge variant="primary">New</Badge>
                </div>
              </Card>
              <Card variant="interactive" title="Interactive" subtitle="Hover me">
                <p class="text-muted text-sm">Cards pick up surface, border, radius and shadow tokens.</p>
              </Card>
            </div>
          </div>

          <div class="preview-section">
            <h2 class="preview-h">Feedback</h2>
            <div class="stack-sm">
              <Alert variant="info" title="Heads up">Your trial ends in 7 days.</Alert>
              <Alert variant="success" title="Saved">Changes were saved successfully.</Alert>
              <Alert variant="error" title="Failed">Could not reach the server.</Alert>
            </div>
          </div>

          <div class="preview-section">
            <h2 class="preview-h">Form controls</h2>
            <Card>
              <div class="stack">
                <Field label="Email" required>
                  <Input bind:value={demoInput} type="email" iconLeft="mail" placeholder="you@example.com" />
                </Field>
                <Field label="Role">
                  <Select bind:value={demoSelect}>
                    <option>Administrator</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </Select>
                </Field>
                <Toggle bind:checked={demoToggle} label="Enable notifications" />
              </div>
            </Card>
          </div>

          <div class="preview-section">
            <h2 class="preview-h">Type scale</h2>
            <Card>
              <h1>Heading one</h1>
              <h3>Heading three</h3>
              <p>Body copy renders in the chosen sans font. <a href="#preview">Links use the primary color.</a></p>
              <p class="text-muted text-sm">Muted secondary text for captions and hints.</p>
              <code>const token = var(--color-primary)</code>
            </Card>
          </div>

        </div>
      </div>
    </div>

  </div>
</div>
</div>

<!-- Save / Export modal -->
{#if showExport}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="export-backdrop" onclick={() => showExport = false} role="presentation">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="export-modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Save or export theme">
      <div class="export-head">
        <h3 class="card-title">Save / Export “{draftTheme.name}”</h3>
        <button class="btn btn-ghost btn-icon" aria-label="Close" onclick={() => showExport = false}>
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="export-tabs">
        <button class="export-tab" class:active={exportTab === 'css'} onclick={() => exportTab = 'css'}>
          <span class="material-symbols-outlined">css</span> theme.css
        </button>
        <button class="export-tab" class:active={exportTab === 'json'} onclick={() => exportTab = 'json'}>
          <span class="material-symbols-outlined">data_object</span> theme.json
        </button>
      </div>

      <p class="text-sm text-muted" style="margin-bottom:var(--space-3)">
        {#if exportTab === 'css'}
          Drop this in after <code>index.css</code> to apply your theme in a project. (Not re-editable here.)
        {:else}
          Save this to keep working later — re-open it with <strong>Import</strong> to continue editing.
        {/if}
      </p>

      <pre class="export-code">{exportText}</pre>

      <div class="form-actions">
        <Button variant="secondary" onclick={copyExport}>
          <span class="material-symbols-outlined">content_copy</span> Copy
        </Button>
        {#if exportTab === 'css'}
          <Button variant="primary" onclick={downloadCss}>
            <span class="material-symbols-outlined">download</span> Download .css
          </Button>
        {:else}
          <Button variant="primary" onclick={downloadJson}>
            <span class="material-symbols-outlined">download</span> Download .json
          </Button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  /* Builder app chrome */
  .builder-bar {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; gap: var(--space-4);
    height: 3.5rem; padding: 0 var(--space-4);
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }
  .bb-left { display: flex; align-items: center; gap: var(--space-3); flex-shrink: 0; }
  .bb-brand { display: flex; align-items: center; gap: var(--space-2);
    font-weight: var(--font-semibold); color: var(--color-text); }
  .bb-presets {
    display: flex; align-items: center; gap: var(--space-1); flex: 1;
    overflow-x: auto; justify-content: center;
  }
  .bb-presets-label { font-size: var(--text-xs); color: var(--color-text-subtle);
    text-transform: uppercase; letter-spacing: var(--tracking-wider); margin-right: var(--space-2); }
  .bb-preset {
    display: flex; align-items: center; gap: var(--space-2);
    padding: var(--space-1) var(--space-3); white-space: nowrap;
    border: 1px solid var(--color-border); border-radius: var(--radius-full);
    background: var(--color-surface); cursor: pointer;
    font: inherit; font-size: var(--text-sm); color: var(--color-text-muted);
    transition: border-color var(--duration-fast), color var(--duration-fast);
  }
  .bb-preset:hover { color: var(--color-text); }
  .bb-preset.active { border-color: var(--color-primary); color: var(--color-primary); }
  .bb-dot { width: 0.85rem; height: 0.85rem; border-radius: var(--radius-full);
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.1); }
  .bb-right { flex-shrink: 0; display: flex; align-items: center; gap: var(--space-2); }

  .builder-scroll { height: calc(100vh - 3.5rem); overflow-y: auto; background: var(--color-bg); }

  .builder { max-width: none; }

  .builder-grid {
    display: grid;
    grid-template-columns: minmax(320px, 380px) 1fr;
    gap: var(--space-6);
    align-items: start;
  }
  @media (max-width: 900px) {
    .builder-grid { grid-template-columns: 1fr; }
  }

  /* Editor */
  .mode-tabs {
    display: flex;
    gap: var(--space-1);
    background: var(--color-bg-subtle);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-1);
    margin-bottom: var(--space-4);
  }
  .mode-tab {
    flex: 1;
    display: flex; align-items: center; justify-content: center;
    gap: var(--space-2);
    padding: var(--space-2);
    border: none; background: none; cursor: pointer;
    border-radius: var(--radius-sm);
    font: inherit; font-size: var(--text-sm); font-weight: var(--font-medium);
    color: var(--color-text-muted);
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .mode-tab .material-symbols-outlined { font-size: 1.1rem; }
  .mode-tab.active {
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-xs);
  }

  .control-list { display: flex; flex-direction: column; gap: var(--space-4); }
  .control { display: flex; flex-direction: column; gap: var(--space-2); }
  .control-head { display: flex; align-items: baseline; gap: var(--space-2); justify-content: space-between; }
  .control-label { font-size: var(--text-sm); font-weight: var(--font-medium); color: var(--color-text); }
  .control-help { font-size: var(--text-xs); color: var(--color-text-subtle); text-align: right; }

  .color-control { display: flex; align-items: center; gap: var(--space-2); }
  .color-swatch {
    inline-size: 2.25rem; block-size: 2.25rem;
    padding: 0; border: 1px solid var(--color-border); border-radius: var(--radius-sm);
    background: none; cursor: pointer; flex-shrink: 0;
  }
  .color-swatch::-webkit-color-swatch-wrapper { padding: 2px; }
  .color-swatch::-webkit-color-swatch { border: none; border-radius: 4px; }
  .color-hex {
    flex: 1; min-width: 0;
    font-family: var(--font-mono); font-size: var(--text-sm);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border); border-radius: var(--radius-sm);
    background: var(--color-surface); color: var(--color-text);
  }

  .size-control { display: flex; align-items: center; gap: var(--space-3); }
  .size-control input[type="range"] { flex: 1; accent-color: var(--color-primary); }
  .size-readout {
    font-family: var(--font-mono); font-size: var(--text-xs);
    color: var(--color-text-muted); min-width: 4.5rem; text-align: right;
  }

  .shadow-input { font-family: var(--font-mono); font-size: var(--text-xs); width: 100%;
    padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border);
    border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-text); resize: vertical; }

  /* Preview */
  .builder-preview {
    position: sticky; top: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-surface);
  }
  .preview-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-bg-subtle);
  }
  .preview-mode-pill { font-size: var(--text-xs); color: var(--color-text-subtle); }
  .preview-surface { background: var(--color-bg); }
  .preview-inner { padding: var(--space-6); max-height: calc(100vh - 12rem); overflow-y: auto;
    display: flex; flex-direction: column; gap: var(--space-6); }
  .preview-section { display: flex; flex-direction: column; gap: var(--space-3); }
  .preview-h { font-size: var(--text-sm); font-weight: var(--font-semibold);
    text-transform: uppercase; letter-spacing: var(--tracking-wider);
    color: var(--color-text-subtle); margin: 0; }

  /* Name field + dirty indicator */
  .name-field {
    display: inline-flex; align-items: center; gap: var(--space-2);
    padding: 0 var(--space-3); height: 2.25rem;
    border: 1px solid var(--color-border); border-radius: var(--radius-md);
    background: var(--color-surface);
  }
  .name-field > .material-symbols-outlined { font-size: 1rem; color: var(--color-text-subtle); }
  .name-input {
    border: none; background: none; outline: none;
    font: inherit; font-size: var(--text-sm); color: var(--color-text);
    width: 9rem;
  }
  .name-input::placeholder { color: var(--color-text-subtle); }

  /* Export tabs */
  .export-tabs {
    display: flex; gap: var(--space-1); margin-bottom: var(--space-3);
    background: var(--color-bg-subtle); border: 1px solid var(--color-border);
    border-radius: var(--radius-md); padding: var(--space-1);
  }
  .export-tab {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: var(--space-2);
    padding: var(--space-2); border: none; background: none; cursor: pointer;
    border-radius: var(--radius-sm); font: inherit; font-size: var(--text-sm); font-weight: var(--font-medium);
    color: var(--color-text-muted);
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .export-tab .material-symbols-outlined { font-size: 1.05rem; }
  .export-tab.active { background: var(--color-surface); color: var(--color-text); box-shadow: var(--shadow-xs); }

  /* Export modal */
  .export-backdrop {
    position: fixed; inset: 0; background: rgb(15 23 42 / 0.5);
    display: flex; align-items: center; justify-content: center;
    padding: var(--space-4); z-index: 1000;
  }
  .export-modal {
    background: var(--color-surface); border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl); width: min(640px, 100%);
    max-height: 85vh; display: flex; flex-direction: column;
    padding: var(--space-6);
  }
  .export-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2); }
  .export-code {
    flex: 1; overflow: auto; margin: 0 0 var(--space-4);
    background: var(--color-bg-subtle); border: 1px solid var(--color-border);
    border-radius: var(--radius-md); padding: var(--space-4);
    font-family: var(--font-mono); font-size: var(--text-xs);
    line-height: var(--leading-relaxed); white-space: pre; color: var(--color-text);
  }
</style>
