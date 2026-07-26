// theme-presets.js
// ──────────────────────────────────────────────────────────────
// Named, ready-made themes. Each preset supplies overrides that are
// merged over the default theme (theme-model defaultTheme()), so a
// preset only needs to specify what differs. Overrides are split by
// mode: { light: {var:value}, dark: {var:value} }.
//
// Used by:
//   - the floating window in preview mode (quick switch)
//   - the Theme Builder ("load a preset to start from")
// ──────────────────────────────────────────────────────────────

const INTER  = "'Inter', system-ui, -apple-system, sans-serif";
const PLEX   = "'IBM Plex Sans', system-ui, sans-serif";
const NUNITO = "'Nunito', system-ui, sans-serif";
const GEORGIA = "Georgia, 'Times New Roman', serif";
const POPPINS = "'Poppins', system-ui, sans-serif";

export const PRESETS = [
  {
    id: 'default',
    name: 'Midnight Blue',
    swatch: '#2d6ae0',
    desc: 'The original — cool blue, crisp Inter, medium radius.',
    overrides: { light: {}, dark: {} }, // pure defaults
  },

  {
    id: 'forest',
    name: 'Forest',
    swatch: '#15803d',
    desc: 'Green accent, Nunito, softer rounding and gentle shadows.',
    overrides: {
      light: {
        'color-accent-light': '#34d07f',
        'color-accent':       '#15803d',
        'color-accent-dark':  '#0f5f2e',
        'color-primary':       '#15803d',
        'color-primary-hover': '#0f5f2e',
        'color-header-bg':     '#10271a',
        'color-header-border': '#1c3a28',
        'color-info':          '#15803d',
        'color-info-bg':       '#f0fdf4',
        'font-sans':  NUNITO,
        'radius-sm':  '8px',
        'radius-md':  '16px',
        'radius-lg':  '24px',
        'shadow-sm':  '0 4px 10px -2px rgb(20 83 45 / 0.16), 0 2px 6px -2px rgb(20 83 45 / 0.10)',
        'shadow-md':  '0 12px 24px -6px rgb(20 83 45 / 0.18), 0 6px 12px -4px rgb(20 83 45 / 0.10)',
      },
      dark: {
        'color-accent-light': '#4ade80',
        'color-accent':       '#22c55e',
        'color-accent-dark':  '#16a34a',
        'color-primary':       '#34d07f',
        'color-primary-hover': '#4ade80',
        'color-bg':            '#0b1f14',
        'color-bg-subtle':     '#11301f',
        'color-surface':       '#11301f',
        'color-border':        '#1d4730',
        'color-border-strong': '#2a5d40',
        'color-header-bg':     '#08160e',
        'color-header-border': '#11301f',
        'color-info':          '#34d07f',
        'color-info-bg':       '#0a2417',
        'font-sans':  NUNITO,
        'radius-sm':  '8px',
        'radius-md':  '16px',
        'radius-lg':  '24px',
      },
    },
  },

  {
    id: 'sunset',
    name: 'Sunset',
    swatch: '#ea580c',
    desc: 'Warm orange, geometric Poppins, tight radius, punchy shadows.',
    overrides: {
      light: {
        'color-accent-light': '#fb923c',
        'color-accent':       '#ea580c',
        'color-accent-dark':  '#c2410c',
        'color-primary':       '#ea580c',
        'color-primary-hover': '#c2410c',
        'color-bg':            '#fdfaf7',
        'color-bg-subtle':     '#faf2ea',
        'color-border':        '#f0e2d6',
        'color-border-strong': '#e3cdb9',
        'color-header-bg':     '#3a2415',
        'color-header-border': '#4d3320',
        'color-info':          '#ea580c',
        'color-info-bg':       '#fff7ed',
        'font-sans':  POPPINS,
        'radius-sm':  '4px',
        'radius-md':  '8px',
        'radius-lg':  '12px',
        'shadow-sm':  '0 4px 12px -2px rgb(234 88 12 / 0.20), 0 2px 6px -2px rgb(234 88 12 / 0.12)',
        'shadow-md':  '0 14px 28px -6px rgb(234 88 12 / 0.22), 0 6px 14px -4px rgb(234 88 12 / 0.14)',
      },
      dark: {
        'color-accent-light': '#fdba74',
        'color-accent':       '#fb923c',
        'color-accent-dark':  '#ea580c',
        'color-primary':       '#fb923c',
        'color-primary-hover': '#fdba74',
        'color-bg':            '#1c1410',
        'color-bg-subtle':     '#2a1d14',
        'color-surface':       '#2a1d14',
        'color-border':        '#42301f',
        'color-border-strong': '#573f29',
        'color-header-bg':     '#140d08',
        'color-header-border': '#2a1d14',
        'color-info':          '#fb923c',
        'color-info-bg':       '#241710',
        'font-sans':  POPPINS,
        'radius-sm':  '4px',
        'radius-md':  '8px',
        'radius-lg':  '12px',
      },
    },
  },

  {
    id: 'editorial',
    name: 'Editorial',
    swatch: '#7c3aed',
    desc: 'Violet accent on a serif body — large radius, soft shadows.',
    overrides: {
      light: {
        'color-accent-light': '#a78bfa',
        'color-accent':       '#7c3aed',
        'color-accent-dark':  '#6d28d9',
        'color-primary':       '#7c3aed',
        'color-primary-hover': '#6d28d9',
        'color-bg':            '#faf9fc',
        'color-bg-subtle':     '#f3f0f9',
        'color-border':        '#e9e4f2',
        'color-header-bg':     '#241b33',
        'color-header-border': '#352849',
        'color-info':          '#7c3aed',
        'color-info-bg':       '#f5f3ff',
        'font-sans':  GEORGIA,
        'radius-sm':  '8px',
        'radius-md':  '18px',
        'radius-lg':  '28px',
        'shadow-sm':  '0 6px 16px -4px rgb(124 58 237 / 0.14), 0 2px 6px -2px rgb(124 58 237 / 0.08)',
        'shadow-md':  '0 16px 32px -8px rgb(124 58 237 / 0.18), 0 8px 16px -6px rgb(124 58 237 / 0.10)',
      },
      dark: {
        'color-accent-light': '#c4b5fd',
        'color-accent':       '#a78bfa',
        'color-accent-dark':  '#8b5cf6',
        'color-primary':       '#a78bfa',
        'color-primary-hover': '#c4b5fd',
        'color-bg':            '#15111f',
        'color-bg-subtle':     '#1f1830',
        'color-surface':       '#1f1830',
        'color-border':        '#332a4a',
        'color-border-strong': '#453a60',
        'color-header-bg':     '#100c18',
        'color-header-border': '#1f1830',
        'color-info':          '#a78bfa',
        'color-info-bg':       '#1a1428',
        'font-sans':  GEORGIA,
        'radius-sm':  '8px',
        'radius-md':  '18px',
        'radius-lg':  '28px',
      },
    },
  },
];

export function getPreset(id) {
  return PRESETS.find((p) => p.id === id) ?? PRESETS[0];
}
