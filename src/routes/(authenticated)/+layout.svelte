<script>
  import '@sveltestyle/sveltestyle/css';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { theme } from '@sveltestyle/sveltestyle/theme';
  import { draftTheme } from '$lib/theme-store.svelte.js';
  import { appMode } from '$lib/app-mode.svelte.js';
  import AppLayout from '$lib/AppLayout.svelte';
  import FloatingThemeWindow from '$lib/FloatingThemeWindow.svelte';

  let { children } = $props();

  onMount(() => {
    theme.init();
    // Apply the active (preset or custom) theme so it persists across reloads.
    draftTheme.applyLive();
  });

  // The /theme-builder route forces builder mode; everything else is preview.
  let onBuilderRoute = $derived($page.url.pathname === '/theme-builder');

  function enterBuilder() {
    appMode.set('builder');
    goto('/theme-builder');
  }
</script>

{#if onBuilderRoute}
  <!-- Builder mode: full-screen app, no shell. -->
  {@render children?.()}
{:else}
  <!-- Preview mode: the active template wraps the real routed pages,
       so choosing a layout restyles the whole design system. -->
  <AppLayout onbuilder={enterBuilder}>
    {@render children?.()}
  </AppLayout>

  <FloatingThemeWindow ontobuilder={enterBuilder} />
{/if}
