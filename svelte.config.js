import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ fallback: 'index.html' }),
    // TEMPORARY: demo pages link to #anchors that don't exist (e.g.
    // /components/layouts#d). Warn instead of failing the prerender until
    // those links are fixed, then remove this.
    prerender: {
      handleMissingId: 'warn'
    }
  }
};
