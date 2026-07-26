<script>
  import { page } from '$app/stores';
  import { ThemeToggle,
           TopBarLayout, LeftBarLayout, RightBarLayout, BottomBarLayout, IconRailLayout,
           FloatingTopLayout, FloatingLeftLayout, FloatingDockLayout } from '@sveltestyle/sveltestyle';
  import { APP_NAV } from '$lib/app-nav.js';
  import { appMode } from '$lib/app-mode.svelte.js';

  let { children, onbuilder } = $props();

  // Which layout component is active.
  let tpl = $derived(appMode.template);

  // Adapt the demo's APP_NAV (+ current route) into the library menu contract
  // ({ brand, sections:[{label,items:[{id,label,icon,href,children}]}], active }).
  // `id` = href so active-by-route works with the layout components.
  let libMenu = $derived.by(() => {
    const path = $page.url.pathname;
    return {
      brand: { label: APP_NAV.brand, icon: APP_NAV.brandIcon, href: '/' },
      active: path,
      sections: APP_NAV.sections.map((s) => ({
        label: s.label,
        items: s.items.map((it) => ({
          id: it.href, label: it.label, icon: it.icon, href: it.href,
          badge: it.badge,
          children: it.children?.map((c) => ({ id: c.href, label: c.label, icon: c.icon, href: c.href })),
        })),
      })),
    };
  });
</script>

{#snippet builderActions()}
  <button class="btn btn-secondary btn-sm" onclick={() => onbuilder?.()}>
    <span class="material-symbols-outlined" style="font-size:1.05rem">tune</span> Theme Builder
  </button>
  <ThemeToggle />
{/snippet}

<!-- ─────────────── SIDEBAR ─────────────── -->
{#if tpl === 'sidebar'}
  <LeftBarLayout menu={libMenu}>
    {@render children?.()}
  </LeftBarLayout>

<!-- ─────────────── TOP BAR ─────────────── -->
{:else if tpl === 'topbar'}
  <TopBarLayout menu={libMenu} actions={builderActions}>
    {@render children?.()}
  </TopBarLayout>

<!-- ─────────────── HYBRID (top + side) ─────────────── -->
{:else if tpl === 'hybrid' || tpl === 'top-left'}
  <TopBarLayout menu={libMenu} actions={builderActions}>
    <LeftBarLayout menu={libMenu}>
      {@render children?.()}
    </LeftBarLayout>
  </TopBarLayout>

<!-- ─────────────── RIGHT SIDEBAR ─────────────── -->
{:else if tpl === 'right'}
  <RightBarLayout menu={libMenu}>
    {@render children?.()}
  </RightBarLayout>

<!-- ─────────────── FLOATING CARD ─────────────── -->
{:else if tpl === 'card'}
  <FloatingLeftLayout menu={libMenu}>
    {@render children?.()}
  </FloatingLeftLayout>

<!-- ─────────────── FLOATING TOP ─────────────── -->
{:else if tpl === 'floattop'}
  <FloatingTopLayout menu={libMenu} actions={builderActions}>
    {@render children?.()}
  </FloatingTopLayout>

<!-- ─────────────── FLOATING DOCK ─────────────── -->
{:else if tpl === 'dock'}
  <FloatingDockLayout menu={libMenu}>
    {@render children?.()}
  </FloatingDockLayout>

<!-- ─────────────── ICON RAIL ─────────────── -->
{:else if tpl === 'rail'}
  <IconRailLayout menu={libMenu}>
    {@render children?.()}
  </IconRailLayout>

<!-- ─────────────── BOTTOM BAR ─────────────── -->
{:else if tpl === 'bottom'}
  <BottomBarLayout menu={libMenu}>
    {@render children?.()}
  </BottomBarLayout>

<!-- ─────────────── NESTED: icon rail + left ─────────────── -->
{:else if tpl === 'rail-left'}
  <IconRailLayout menu={libMenu}>
    <LeftBarLayout menu={libMenu}>
      {@render children?.()}
    </LeftBarLayout>
  </IconRailLayout>

<!-- ─────────────── NESTED: rail + top + left ─────────────── -->
{:else if tpl === 'rail-top-left'}
  <IconRailLayout menu={libMenu}>
    <TopBarLayout menu={libMenu} actions={builderActions}>
      <LeftBarLayout menu={libMenu}>
        {@render children?.()}
      </LeftBarLayout>
    </TopBarLayout>
  </IconRailLayout>

<!-- ─────────────── NESTED: stacked top bars ─────────────── -->
{:else if tpl === 'top-top'}
  <TopBarLayout menu={libMenu} actions={builderActions}>
    <TopBarLayout menu={libMenu}>
      {@render children?.()}
    </TopBarLayout>
  </TopBarLayout>

<!-- ─────────────── NESTED: left + top ─────────────── -->
{:else if tpl === 'left-top'}
  <LeftBarLayout menu={libMenu}>
    <TopBarLayout menu={libMenu} actions={builderActions}>
      {@render children?.()}
    </TopBarLayout>
  </LeftBarLayout>

<!-- ─────────────── NESTED: top + left floating ─────────────── -->
{:else if tpl === 'float-both'}
  <FloatingTopLayout menu={libMenu} actions={builderActions}>
    <FloatingLeftLayout menu={libMenu}>
      {@render children?.()}
    </FloatingLeftLayout>
  </FloatingTopLayout>

<!-- ─────────────── FALLBACK (plain content) ─────────────── -->
{:else}
  <div class="nl nl-col" style="height:100vh">
    <div class="nl-fill nl-scroll">{@render children?.()}</div>
  </div>
{/if}
