# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

Build and development:
- `pnpm run dev` or `npm run dev` - Start local dev server at localhost:4321
- `pnpm run build` or `npm run build` - Build production site (includes astro check)
- `pnpm run preview` or `npm run preview` - Preview build locally
- `astro check` - TypeScript checking for Astro files

Deployment:
- `pnpm run deploy` - Deploy main site to Cloudflare Pages
- `pnpm run deploy:preview` - Deploy to preview environment
- `pnpm run deploy:worker` - Deploy contact form worker only

Worker development:
- `cd workers/contact-form && pnpm run dev` - Start contact form worker locally

## Architecture Overview

This is an Astro-based ADHD coaching website with a hybrid architecture:

**Main Site**: Static site deployed on Cloudflare Pages
- Astro framework with React components for interactivity
- Tailwind CSS for styling
- Cosmic CMS integration for content management
- Static site generation with selective client-side hydration

**Contact Form Worker**: Separate Cloudflare Worker handling form submissions
- Located in `workers/contact-form/`
- Handles `/api/contact` endpoint
- Independent deployment and configuration

**Content Management**: 
- Cosmic CMS integration via `src/lib/cosmic.ts`
- Content types: homepage, about, services, contact, footer, global-settings
- Environment variables: `COSMIC_BUCKET_SLUG` and `COSMIC_READ_KEY`

## Key Components

**Layouts**: `src/layouts/Layout.astro` - Main layout wrapper
**Components**: 
- `ContactForm.tsx` - Main contact form with worker integration
- `CalButton.tsx` - Cal.com booking integration
- `ui/` - Reusable UI components (button, card, input, select, textarea)

**Pages**: Standard Astro pages in `src/pages/` with CMS integration

## Configuration Files

- `wrangler.toml` - Main Cloudflare Pages configuration
- `workers/contact-form/wrangler.toml` - Worker-specific configuration
- `public/_redirects` - Cloudflare Pages redirects (update after worker deployment)
- `astro.config.mjs` - Astro configuration with path alias (`@` -> `/src`)

## Development Notes

The project uses pnpm but npm commands work as well. When working with the contact form worker, navigate to its directory first as it has separate dependencies and deployment configuration.

The site integrates with Cosmic CMS for content, so environment variables for Cosmic are required for full functionality. Content fetching includes error handling that returns null on failure.