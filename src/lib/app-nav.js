// app-nav.js
// The design system's own navigation, consumed by AppLayout so the
// real routed pages render inside whichever menu layout is active.
//
// Items may optionally carry a `children` array of sub-items (second
// level). Parents with children show a chevron (vertical menus) or an
// arrow (horizontal menus) to reveal the sub-items. A parent can still
// have its own `href` — in vertical menus the label navigates and the
// chevron expands.

import { COMPONENT_DOCS } from './component-docs.js';

const componentChildren = [
  { href: '/components', icon: 'grid_view', label: 'All components' },
  ...COMPONENT_DOCS.map((c) => ({
    href: `/components/${c.slug}`,
    icon: c.icon,
    label: c.name,
  })),
];

export const APP_NAV = {
  brand: 'SvelteStyle',
  brandIcon: 'layers',
  sections: [
    {
      label: 'Documentation',
      items: [
        { href: '/getting-started', icon: 'rocket_launch', label: 'Getting Started' },
        { href: '/templates',  icon: 'space_dashboard',     label: 'Layouts'       },
        { href: '/layout-reference', icon: 'menu_book',     label: 'Layout reference' },
        {
          href: '/components',
          icon: 'widgets',
          label: 'Components',
          children: componentChildren,
        },
        { href: '/colors',     icon: 'palette',             label: 'Colors & Type' },
      ],
    },
    {
      label: 'Examples',
      items: [
        { href: '/dashboard',         icon: 'dashboard', label: 'Dashboard'     },
        { href: '/forms',             icon: 'edit_note', label: 'Forms'         },
        { href: '/settings/general',  icon: 'person',    label: 'Profile page'  },
        { href: '/settings/security', icon: 'security',  label: 'Security page' },
      ],
    },
  ],
};

// Flattened TOP-LEVEL list for horizontal menus (children handled via flyout).
export const APP_NAV_FLAT = APP_NAV.sections.flatMap((s) => s.items);
