# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# SvelteStyle docs site — runtime image.
#
# This image PACKAGES an already-built site; it does not build one. The
# compile step needs the library source (see vite.config.js), which lives in
# a sibling repo, so it happens outside the Docker context — locally via
# `npm run build`, in CI via the `build` job.
#
# Consequences, all deliberate:
#   • no Node in the image, no npm install at build time
#   • no registry access and no credentials needed to build the image
#   • the build is a handful of COPYs, so it is fast and cacheable
#
#   npm run build                                  # produces ./build
#   docker build -t sveltestyle-docs .
#   docker run --rm -p 8080:80 sveltestyle-docs    # → http://localhost:8080
# ─────────────────────────────────────────────────────────────

FROM docker.io/nginx:alpine

# SPA-aware config: adapter-static emits an index.html fallback, so unknown
# paths must serve index.html for client-side routing.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Fails the build with a clear error if ./build is missing, rather than
# silently producing an image that serves nginx's default welcome page.
COPY build/index.html /usr/share/nginx/html/index.html
COPY build/ /usr/share/nginx/html/

EXPOSE 80

# nginx runs in the foreground via its base image CMD.
