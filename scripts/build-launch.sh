#!/bin/sh
# `npm run build:launch`: the launch build and its checks (BRIEF §13B).
#
# Cloudflare Pages has one build command for production and previews. On Cloudflare preview
# branches (CF_PAGES_BRANCH set and not "main") this runs the ordinary preview build instead, so
# CMS draft previews keep their placeholders highlighted and stay noindex. Production (main) and
# local runs always get the full launch build: placeholders excluded, demonstration files pruned,
# and the launch gate, which fails the build if anything is left.
set -e

if [ -n "$CF_PAGES_BRANCH" ] && [ "$CF_PAGES_BRANCH" != "main" ]; then
  echo "Preview branch \"$CF_PAGES_BRANCH\": running the preview build (npm run build), not the launch build."
  exec npm run build
fi

export SITE_LAUNCHED=true EXCLUDE_PLACEHOLDERS=true
npx astro build
node scripts/write-headers.mjs
node scripts/prune-placeholders.mjs
node scripts/check-placeholders.mjs
