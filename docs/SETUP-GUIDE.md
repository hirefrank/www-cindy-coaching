# Cindy Romanzo Coaching Website - Complete Setup Guide

## Overview

This website is built with Astro and uses Sanity CMS for content management, deployed on Cloudflare Workers.

## Prerequisites

- Node.js 18+ and npm/pnpm
- Cloudflare account
- Sanity account (free tier works)
- Git

## Initial Setup

### 1. Clone and Install

```bash
git clone [repository-url]
cd www-cindy-coaching
npm install
```

### 2. Environment Variables

Create a `.env` file in the root:

```bash
PUBLIC_SANITY_PROJECT_ID=y67p94j5
SANITY_TOKEN=your-token-here  # Only needed for developers running migration scripts
```

**Note:** The build process and website only need `PUBLIC_SANITY_PROJECT_ID` for read-only access. The `SANITY_TOKEN` is only required for administrative scripts like content migration.

### 3. Sanity Studio Setup

The Sanity Studio is already deployed at: https://cindy-coaching.sanity.studio/

To run locally:
```bash
cd sanity
npm install
npm run dev
```

## Development

```bash
npm run dev
```

Visit http://localhost:4321

## Deployment

### Setting up Cloudflare

1. **Environment variables are already configured** in `wrangler.toml`:
   - `PUBLIC_SANITY_PROJECT_ID` is set for all environments
   - Observability/logging is enabled for monitoring

2. **Deploy Commands:**
   ```bash
   # Standard deployment
   npm run deploy

   # Production deployment (ensures env vars)
   npm run deploy:prod
   ```

### Content Management Workflow

1. **Client edits content** at https://cindy-coaching.sanity.studio/
2. **Client publishes changes** in Sanity
3. **Deploy to update site:**
   ```bash
   npm run deploy
   ```

### Automated Deployments (Optional)

See [SANITY-WEBHOOKS.md](./SANITY-WEBHOOKS.md) for detailed instructions on:
- Setting up webhooks in Sanity Studio
- Configuring GitHub Actions for automatic deployments
- Creating custom webhook handlers
- Using Cloudflare Deploy Hooks

Quick setup:
1. Go to [Sanity Manage](https://www.sanity.io/manage) → Your project → API → Webhooks
2. Create webhook with your chosen endpoint (GitHub, Cloudflare, or custom)
3. Configure authentication and test the webhook

## Project Structure

```
.
├── src/
│   ├── pages/        # Astro pages (fetch from Sanity)
│   ├── components/   # React components
│   ├── layouts/      # Page layouts
│   └── lib/          # Utilities (Sanity client)
├── sanity/
│   ├── schemas/      # Content models
│   └── sanity.config.ts
├── scripts/
│   ├── migrate-to-sanity.js  # Initial content migration
│   ├── deploy.sh             # Deployment script
│   └── webhook-deploy.js     # Webhook handler
└── public/           # Static assets
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build locally

# Deployment
npm run deploy       # Deploy to Cloudflare
npm run deploy:prod  # Deploy with env vars

# Content Management  
npm run migrate-to-sanity  # One-time migration of hardcoded content to Sanity (requires SANITY_TOKEN)

# Legacy CSV Scripts (only if content still hardcoded in Astro files)
npm run extract-copy       # Export hardcoded content from Astro files to CSV
npm run import-copy        # Import CSV changes back to Astro files
```

## Troubleshooting

### Build Failures
- Memory issues are fixed with `NODE_OPTIONS='--max-old-space-size=4096'`
- Check console for specific errors

### Content Not Updating
1. Verify content is published in Sanity (not just saved)
2. Check PUBLIC_SANITY_PROJECT_ID is set correctly
3. Run deployment after publishing

### Deployment Issues
1. Verify Cloudflare authentication: `wrangler whoami`
2. Check project name matches in wrangler.toml
3. Ensure environment variables are set in Cloudflare

### Sanity Studio Access
- URL: https://cindy-coaching.sanity.studio/
- Login with Google account
- Request access from project owner if needed

## Adding New Pages

1. **Create schema** in `sanity/schemas/`
2. **Add to index** in `sanity/schemas/index.ts`
3. **Deploy schema**: `cd sanity && npm run deploy`
4. **Create Astro page** that fetches from Sanity
5. **Run migration** if importing existing content

## Security Notes

- Never commit `.env` file
- SANITY_TOKEN is only needed by developers for migration/maintenance scripts
- The build process and production website do NOT need SANITY_TOKEN
- PUBLIC_SANITY_PROJECT_ID is safe to expose (provides read-only access)
- Content editors use Sanity Studio with their own Google authentication
- Use Cloudflare's environment variables for production (only PUBLIC_SANITY_PROJECT_ID needed)

## Support

- Sanity docs: https://www.sanity.io/docs
- Astro docs: https://docs.astro.build
- Cloudflare Workers: https://developers.cloudflare.com/workers

## Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies
- [ ] Set up environment variables
- [ ] Verify Sanity Studio access
- [ ] Test local development
- [ ] Configure Cloudflare environment
- [ ] Deploy to production
- [ ] Set up content update workflow