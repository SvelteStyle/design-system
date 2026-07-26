// theme-model.js
// ──────────────────────────────────────────────────────────────
// Describes every editable design token: its CSS variable name,
// default value for light + dark mode, control type, and grouping.
// Drives the Theme Builder UI and the theme.css export.
// ──────────────────────────────────────────────────────────────

/**
 * A token group is a labelled set of editable variables.
 * Each token: { var, label, type, light, dark?, options?, unit?, help? }
 *   - var:    CSS custom property name (without the leading --)
 *   - type:   'color' | 'size' | 'shadow' | 'select' | 'text'
 *   - light:  default value in light mode
 *   - dark:   default value in dark mode (color/shadow tokens only).
 *             If omitted, the token is mode-agnostic (one value, in :root).
 */

export const FONT_OPTIONS = [
  { label: 'Inter',            value: "'Inter', system-ui, -apple-system, sans-serif" },
  { label: 'System UI',        value: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" },
  { label: 'Georgia (serif)',  value: "Georgia, 'Times New Roman', serif" },
  { label: 'IBM Plex Sans',    value: "'IBM Plex Sans', system-ui, sans-serif" },
  { label: 'Nunito',           value: "'Nunito', system-ui, sans-serif" },
  { label: 'Poppins',          value: "'Poppins', system-ui, sans-serif" },
  { label: 'Roboto',           value: "'Roboto', system-ui, sans-serif" },
];

export const MONO_OPTIONS = [
  { label: 'JetBrains Mono', value: "'JetBrains Mono', 'Fira Code', monospace" },
  { label: 'Fira Code',      value: "'Fira Code', monospace" },
  { label: 'IBM Plex Mono',  value: "'IBM Plex Mono', monospace" },
  { label: 'Menlo',          value: "Menlo, Monaco, 'Courier New', monospace" },
];

export const THEME_GROUPS = [
  {
    id: 'brand',
    label: 'Brand',
    icon: 'palette',
    tokens: [
      { var: 'color-accent-light', label: 'Accent light',  type: 'color', light: '#4f87f5', dark: '#6b9bf7' },
      { var: 'color-accent',       label: 'Accent',        type: 'color', light: '#2d6ae0', dark: '#4f87f5' },
      { var: 'color-accent-dark',  label: 'Accent dark',   type: 'color', light: '#1d58cc', dark: '#3b6fd9' },
      { var: 'color-primary',      label: 'Primary',       type: 'color', light: '#2d6ae0', dark: '#4f87f5', help: 'Buttons, links, active nav' },
      { var: 'color-primary-hover',label: 'Primary hover', type: 'color', light: '#1d58cc', dark: '#6b9bf7' },
      { var: 'color-primary-text', label: 'Primary text',  type: 'color', light: '#ffffff', dark: '#ffffff', help: 'Text on primary fills' },
    ],
  },
  {
    id: 'surfaces',
    label: 'Surfaces & text',
    icon: 'contrast',
    tokens: [
      { var: 'color-bg',            label: 'Page background', type: 'color', light: '#f9fafb', dark: '#0f172a' },
      { var: 'color-bg-subtle',     label: 'Subtle bg',       type: 'color', light: '#f1f5f9', dark: '#1e293b' },
      { var: 'color-surface',       label: 'Surface',         type: 'color', light: '#ffffff', dark: '#1e293b', help: 'Cards, modals' },
      { var: 'color-border',        label: 'Border',          type: 'color', light: '#e8edf2', dark: '#2d3f55' },
      { var: 'color-border-strong', label: 'Border strong',   type: 'color', light: '#d4dbe4', dark: '#3d5068' },
      { var: 'color-text',          label: 'Text',            type: 'color', light: '#0f172a', dark: '#f1f5f9' },
      { var: 'color-text-muted',    label: 'Text muted',      type: 'color', light: '#64748b', dark: '#94a3b8' },
      { var: 'color-text-subtle',   label: 'Text subtle',     type: 'color', light: '#94a3b8', dark: '#64748b' },
      { var: 'color-text-inverse',  label: 'Text inverse',    type: 'color', light: '#ffffff', dark: '#0f172a' },
    ],
  },
  {
    id: 'header',
    label: 'App header',
    icon: 'web_asset',
    tokens: [
      { var: 'color-header-bg',     label: 'Header bg',     type: 'color', light: '#1e293b', dark: '#0a111e' },
      { var: 'color-header-border', label: 'Header border', type: 'color', light: '#334155', dark: '#1e293b' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: 'notifications',
    tokens: [
      { var: 'color-success',    label: 'Success',    type: 'color', light: '#16a34a', dark: '#22c55e' },
      { var: 'color-success-bg', label: 'Success bg', type: 'color', light: '#f0fdf4', dark: '#052e16' },
      { var: 'color-warning',    label: 'Warning',    type: 'color', light: '#d97706', dark: '#f59e0b' },
      { var: 'color-warning-bg', label: 'Warning bg', type: 'color', light: '#fffbeb', dark: '#1c1408' },
      { var: 'color-error',      label: 'Error',      type: 'color', light: '#dc2626', dark: '#f87171' },
      { var: 'color-error-bg',   label: 'Error bg',   type: 'color', light: '#fef2f2', dark: '#2d0a0a' },
      { var: 'color-info',       label: 'Info',       type: 'color', light: '#0284c7', dark: '#38bdf8' },
      { var: 'color-info-bg',    label: 'Info bg',    type: 'color', light: '#f0f9ff', dark: '#0a1f2e' },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    icon: 'text_fields',
    tokens: [
      { var: 'font-sans', label: 'Sans font', type: 'select', options: FONT_OPTIONS, light: "'Inter', system-ui, -apple-system, sans-serif" },
      { var: 'font-mono', label: 'Mono font', type: 'select', options: MONO_OPTIONS, light: "'JetBrains Mono', 'Fira Code', monospace" },
      { var: 'text-base', label: 'Base size', type: 'size', unit: 'rem', min: 0.875, max: 1.25, step: 0.0625, light: '1rem', help: 'Other sizes scale relative to this' },
    ],
  },
  {
    id: 'radius',
    label: 'Border radius',
    icon: 'rounded_corner',
    tokens: [
      { var: 'radius-sm', label: 'Small',  type: 'size', unit: 'px', min: 0, max: 16, step: 1, light: '6px',  help: 'Inputs' },
      { var: 'radius-md', label: 'Medium', type: 'size', unit: 'px', min: 0, max: 28, step: 1, light: '12px', help: 'Cards' },
      { var: 'radius-lg', label: 'Large',  type: 'size', unit: 'px', min: 0, max: 40, step: 1, light: '18px', help: 'Large cards' },
    ],
  },
  {
    id: 'spacing',
    label: 'Spacing scale',
    icon: 'space_bar',
    tokens: [
      { var: 'space-4', label: 'Base unit (×4)', type: 'size', unit: 'rem', min: 0.75, max: 1.5, step: 0.0625, light: '1rem', help: 'The 16px rhythm unit' },
    ],
  },
  {
    id: 'shadows',
    label: 'Shadows',
    icon: 'layers',
    tokens: [
      { var: 'shadow-sm', label: 'Card shadow',  type: 'shadow', light: '0 4px 10px -2px rgb(15 23 42 / 0.18), 0 2px 6px -2px rgb(15 23 42 / 0.10)',  dark: '0 4px 10px -2px rgb(0 0 0 / 0.45), 0 2px 6px -2px rgb(0 0 0 / 0.35)' },
      { var: 'shadow-md', label: 'Raised shadow', type: 'shadow', light: '0 12px 24px -6px rgb(15 23 42 / 0.20), 0 6px 12px -4px rgb(15 23 42 / 0.12)', dark: '0 12px 24px -6px rgb(0 0 0 / 0.5), 0 6px 12px -4px rgb(0 0 0 / 0.4)' },
      { var: 'shadow-lg', label: 'Modal shadow',  type: 'shadow', light: '0 28px 44px -10px rgb(15 23 42 / 0.24), 0 12px 22px -8px rgb(15 23 42 / 0.14)', dark: '0 28px 44px -10px rgb(0 0 0 / 0.55), 0 12px 22px -8px rgb(0 0 0 / 0.45)' },
    ],
  },
];

// Flat list of every token for convenience.
export const ALL_TOKENS = THEME_GROUPS.flatMap((g) => g.tokens);

// Build the default theme state: { light: {var:value}, dark: {var:value} }
export function defaultTheme() {
  const light = {};
  const dark = {};
  for (const t of ALL_TOKENS) {
    light[t.var] = t.light;
    dark[t.var] = t.dark ?? t.light;
  }
  return { light, dark };
}

// Which tokens differ per-mode (have a dark value distinct from light handling)
export function isModeScoped(token) {
  return token.dark !== undefined;
}

// ── CSS generation ──────────────────────────────────────────────

function block(selector, entries) {
  const lines = entries
    .filter(([, v]) => v != null && v !== '')
    .map(([name, v]) => `  --${name}: ${v};`)
    .join('\n');
  return `${selector} {\n${lines}\n}`;
}

/**
 * Generate a drop-in theme.css overriding :root (light) and
 * [data-theme="dark"] (dark). Only mode-scoped tokens go in the
 * dark block; mode-agnostic tokens stay in :root.
 */
export function generateThemeCss(state, meta = {}) {
  const name = meta.name || 'Custom theme';
  const date = new Date().toISOString().slice(0, 10);

  const rootEntries = [];
  const darkEntries = [];

  for (const t of ALL_TOKENS) {
    const lv = state.light[t.var];
    rootEntries.push([t.var, lv]);
    if (isModeScoped(t)) {
      const dv = state.dark[t.var];
      if (dv !== lv) darkEntries.push([t.var, dv]);
    }
  }

  const header =
`/* ${name}
   Generated by Svelte Style Theme Builder · ${date}
   Drop-in overlay — load AFTER the design system base:
     <link rel="stylesheet" href="/css/index.css" />
     <link rel="stylesheet" href="/css/theme.css" />
*/`;

  const parts = [header, block(':root', rootEntries)];
  if (darkEntries.length) parts.push(block('[data-theme="dark"]', darkEntries));
  return parts.join('\n\n') + '\n';
}

// Serialize / restore the editable state (for the JSON-ish round trip if needed)
export function serializeTheme(state, meta = {}) {
  return JSON.stringify({ meta, ...state }, null, 2);
}
