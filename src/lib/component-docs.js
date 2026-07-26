// component-docs.js
// Registry of components that have a dedicated docs page. Drives the
// Components sub-navigation. Add an entry here when you add a new
// component docs page under routes/(authenticated)/components/<slug>/.

export const COMPONENT_DOCS = [
  { slug: 'button',    name: 'Button',        icon: 'smart_button', status: 'ready' },
  { slug: 'card',      name: 'Card',          icon: 'web_asset',    status: 'ready' },
  { slug: 'badge',     name: 'Badge',         icon: 'sell',         status: 'ready' },
  { slug: 'alert',     name: 'Alert',         icon: 'campaign',     status: 'ready' },
  { slug: 'modal',     name: 'Modal & Dialog', icon: 'web_asset',   status: 'ready' },
  { slug: 'form',      name: 'Form controls', icon: 'edit_note',    status: 'ready' },
  { slug: 'accordion', name: 'Accordion',     icon: 'expand',       status: 'ready' },
  { slug: 'checkbox-radio', name: 'Checkbox & Radio', icon: 'check_box', status: 'ready' },
  { slug: 'textarea',  name: 'Textarea',      icon: 'notes',        status: 'ready' },
  { slug: 'masked-input', name: 'Masked Input', icon: 'pin',        status: 'ready' },
  { slug: 'dropdown',  name: 'Dropdown',      icon: 'arrow_drop_down_circle', status: 'ready' },
  { slug: 'table',     name: 'Table',         icon: 'table_rows',   status: 'ready' },
  { slug: 'spinner',   name: 'Spinner',       icon: 'progress_activity', status: 'ready' },
  { slug: 'tooltip',   name: 'Tooltip',       icon: 'chat_bubble',  status: 'ready' },
  { slug: 'divider',   name: 'Divider',       icon: 'horizontal_rule', status: 'ready' },
  { slug: 'progress',  name: 'Progress',      icon: 'linear_scale', status: 'ready' },
  { slug: 'pagination', name: 'Pagination',   icon: 'more_horiz',   status: 'ready' },
  { slug: 'date-picker', name: 'Calendar & Date Picker', icon: 'calendar_month', status: 'ready' },
  { slug: 'collapsible', name: 'Chevron & Collapsible', icon: 'expand_circle_down', status: 'ready' },
];

export const READY_DOCS = COMPONENT_DOCS.filter((c) => c.status === 'ready');
