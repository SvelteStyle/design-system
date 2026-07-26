import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { existsSync, realpathSync } from 'fs';

// ── Library resolution ────────────────────────────────────────────────
// The docs site builds the library FROM SOURCE — it is not an npm
// dependency. That means:
//   • editing the library hot-reloads straight into the docs, and
//   • nothing (locally or in CI) needs the private registry.
//
// Locally that source is a sibling checkout. In CI the pipeline clones the
// library repo to the same place using CI_JOB_TOKEN — no token to manage.
//
// Override the location with STYLEBAKERY_LIB if your checkout lives
// elsewhere.
const LIB_SRC = resolve(process.env.STYLEBAKERY_LIB ?? '../sveltestyle', 'src/lib');

if (!existsSync(LIB_SRC)) {
  throw new Error(
    `\n\n  Cannot find the Svelte Style library source at:\n    ${LIB_SRC}\n\n` +
      `  The docs site builds the library from source, so a checkout must sit\n` +
      `  alongside this repo:\n\n` +
      `    git clone <library-repo> ../sveltestyle\n\n` +
      `  or point STYLEBAKERY_LIB at an existing checkout:\n\n` +
      `    STYLEBAKERY_LIB=/path/to/sveltestyle npm run build\n\n`
  );
}

// realpath bypasses symlinks so Vite's watcher sees the true source path.
const libRoot = realpathSync(LIB_SRC);
console.log(`\x1b[2m[sveltestyle] library source: ${libRoot}\x1b[0m`);

export default defineConfig({
  plugins: [sveltekit()],

  server: {
    port: 8000,
    watch: {
      // Watch the real library source, but keep ignoring node_modules.
      ignored: (path) => {
        if (path.startsWith(libRoot)) return false;
        return path.includes('node_modules');
      }
    }
  },

  resolve: {
    alias: [
      { find: '@sveltestyle/sveltestyle/css',   replacement: resolve(libRoot, 'css/index.css') },
      { find: '@sveltestyle/sveltestyle/theme', replacement: resolve(libRoot, 'theme/theme.svelte.js') },
      { find: '@sveltestyle/sveltestyle',       replacement: resolve(libRoot, 'index.js') }
    ]
  }
});
