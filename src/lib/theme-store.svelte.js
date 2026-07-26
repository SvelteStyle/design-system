// theme-store.svelte.js
// ──────────────────────────────────────────────────────────────
// Holds the active working theme shared between the Theme Builder
// and the preview surfaces, and injects it live.
//
// PERSISTENCE MODEL:
//   - The working draft is kept in localStorage, so reopening the
//     app restores your last custom theme. (This is browser-local
//     convenience only — nothing is sent to a server/database.)
//   - To share or ship a theme, EXPORT it: theme.css (drop-in) or
//     theme.json (re-importable to continue editing elsewhere).
//   - IMPORT loads a saved theme.json back into the builder.
// ──────────────────────────────────────────────────────────────

import {
  defaultTheme, generateThemeCss, serializeTheme, ALL_TOKENS, isModeScoped
} from './theme-model.js';
import { getPreset } from './theme-presets.js';

const STATE_KEY  = 'sb-draft-theme';
const META_KEY   = 'sb-draft-meta';
const PRESET_KEY = 'sb-active-preset';
const STYLE_ID   = 'sb-live-theme';

function mergeOverDefaults(next) {
  const base = defaultTheme();
  return {
    light: { ...base.light, ...(next?.light ?? {}) },
    dark:  { ...base.dark,  ...(next?.dark  ?? {}) },
  };
}

function loadState() {
  if (typeof localStorage === 'undefined') return defaultTheme();
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? mergeOverDefaults(JSON.parse(raw)) : defaultTheme();
  } catch {
    return defaultTheme();
  }
}

function loadMeta() {
  if (typeof localStorage === 'undefined') return { name: 'My theme' };
  try {
    const raw = localStorage.getItem(META_KEY);
    return raw ? JSON.parse(raw) : { name: 'My theme' };
  } catch {
    return { name: 'My theme' };
  }
}

function loadPreset() {
  if (typeof localStorage === 'undefined') return 'default';
  return localStorage.getItem(PRESET_KEY) || 'default';
}

function createThemeStore() {
  let state = $state(loadState());
  let meta = $state(loadMeta());
  let activePreset = $state(loadPreset());

  function persist() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    localStorage.setItem(META_KEY, JSON.stringify(meta));
    localStorage.setItem(PRESET_KEY, activePreset);
  }

  function setToken(mode, varName, value) {
    state[mode][varName] = value;
    activePreset = 'custom';   // hand edits diverge from any preset
    persist();
    applyLive();
  }

  function setName(name) {
    meta = { ...meta, name };
    persist();
  }

  function reset() {
    state = defaultTheme();
    activePreset = 'default';
    meta = { name: 'My theme' };
    persist();
    applyLive();
  }

  // Apply a named preset: merge its overrides over the defaults.
  function applyPreset(id) {
    const preset = getPreset(id);
    state = mergeOverDefaults(preset.overrides);
    activePreset = preset.id;
    meta = { name: preset.name };
    persist();
    applyLive();
  }

  // ── Export ──────────────────────────────────────────────────
  function css() {
    return generateThemeCss(state, meta);
  }

  function json() {
    return serializeTheme(state, meta);
  }

  // ── Import (resume editing a saved theme.json) ──────────────
  function loadFromJson(text) {
    let parsed;
    try {
      parsed = typeof text === 'string' ? JSON.parse(text) : text;
    } catch {
      throw new Error('That file is not valid JSON.');
    }
    if (!parsed || (!parsed.light && !parsed.dark)) {
      throw new Error('That JSON does not look like a saved theme.');
    }
    state = mergeOverDefaults(parsed);
    meta = { name: parsed.meta?.name || 'Imported theme' };
    activePreset = 'custom';
    persist();
    applyLive();
  }

  // ── Live injection ──────────────────────────────────────────
  function applyLive() {
    if (typeof document === 'undefined') return;
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement('style');
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = generateThemeCss(state, meta);
  }

  function clearLive() {
    if (typeof document === 'undefined') return;
    document.getElementById(STYLE_ID)?.remove();
  }

  return {
    get state() { return state; },
    get meta() { return meta; },
    set meta(v) { meta = v; },
    get name() { return meta.name; },
    get activePreset() { return activePreset; },
    setToken,
    setName,
    reset,
    applyPreset,
    css,
    json,
    loadFromJson,
    applyLive,
    clearLive,
  };
}

export const draftTheme = createThemeStore();
export { ALL_TOKENS, isModeScoped };
