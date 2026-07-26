// app-mode.svelte.js
// ──────────────────────────────────────────────────────────────
// The design system runs in one of two modes:
//   'builder' → the Theme Builder app (edit + export themes)
//   'preview' → browse pages/templates with a theme applied, plus
//               a draggable floating window to switch theme / jump
//               to the builder.
// Persisted so a reload keeps you in the same mode.
// ──────────────────────────────────────────────────────────────

const KEY = 'sb-app-mode';
const TPL_KEY = 'sb-preview-template';

function load() {
  if (typeof localStorage === 'undefined') return 'preview';
  return localStorage.getItem(KEY) === 'builder' ? 'builder' : 'preview';
}

function loadTpl() {
  if (typeof localStorage === 'undefined') return 'sidebar';
  return localStorage.getItem(TPL_KEY) || 'sidebar';
}

function createMode() {
  let mode = $state(load());
  let template = $state(loadTpl());

  function set(next) {
    mode = next === 'builder' ? 'builder' : 'preview';
    if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, mode);
  }

  function setTemplate(id) {
    template = id;
    if (typeof localStorage !== 'undefined') localStorage.setItem(TPL_KEY, id);
  }

  return {
    get current() { return mode; },
    get isBuilder() { return mode === 'builder'; },
    get isPreview() { return mode === 'preview'; },
    get template() { return template; },
    set,
    setTemplate,
    toggle() { set(mode === 'builder' ? 'preview' : 'builder'); },
  };
}

export const appMode = createMode();
