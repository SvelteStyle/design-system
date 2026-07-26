// templates.js
// Shared nav data + sample content used by every site template,
// and the registry of available templates (each arranges menus
// differently).

export const NAV = {
  brand: 'Acme Console',
  brandIcon: 'rocket_launch',
  sections: [
    {
      label: 'Main',
      items: [
        { id: 'dashboard', icon: 'dashboard',   label: 'Dashboard', badge: undefined },
        { id: 'projects',  icon: 'folder',       label: 'Projects',  badge: 8 },
        { id: 'tasks',     icon: 'check_circle', label: 'Tasks',     badge: 24 },
        { id: 'reports',   icon: 'bar_chart',    label: 'Reports' },
      ],
    },
    {
      label: 'Workspace',
      items: [
        { id: 'team',     icon: 'group',     label: 'Team' },
        { id: 'billing',  icon: 'payments',  label: 'Billing' },
        { id: 'settings', icon: 'settings',  label: 'Settings' },
      ],
    },
  ],
};

// Flat list for top-bar style menus
export const TOP_ITEMS = NAV.sections.flatMap((s) => s.items);

export const TEMPLATES = [
  { id: 'topbar',      name: 'Top bar',           icon: 'top_panel_open',   desc: 'A single horizontal top menu, full-width content.' },
  { id: 'sidebar',     name: 'Left bar',          icon: 'left_panel_open',  desc: 'A single left sidebar with grouped sections.' },
  { id: 'right',       name: 'Right bar',         icon: 'right_panel_open', desc: 'A single sidebar on the right edge.' },
  { id: 'bottom',      name: 'Bottom bar',        icon: 'bottom_navigation', desc: 'A single horizontal menu pinned to the bottom.' },
  { id: 'rail',        name: 'Icon rail',         icon: 'view_sidebar',     desc: 'Slim icon-only vertical rail with tooltips.' },
  { id: 'card',        name: 'Floating left',     icon: 'web_asset',        desc: 'Left menu in a detached, floating card.' },
  { id: 'floattop',    name: 'Floating top',      icon: 'web_asset',        desc: 'Top menu in a detached, floating card.' },
  { id: 'dock',        name: 'Floating dock',     icon: 'dock',             desc: 'Centered rounded nav floating over content, macOS-dock style.' },
];
