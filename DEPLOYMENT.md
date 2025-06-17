# Deployment Guide - Cloudflare Workers with Sanity CMS

## Prerequisites

1. **Cloudflare Workers Account** - Your current setup
2. **Environment Variable Set** - `PUBLIC_SANITY_PROJECT_ID` in Cloudflare dashboard
3. **Sanity Project** - Already configured at https://cindy-coaching.sanity.studio/

## Deployment Methods

### Method 1: Manual Deploy (Current)
```bash
npm run deploy
```

This runs the optimized build process and deploys to Cloudflare Workers.

### Method 2: With Environment Variable
```bash
npm run deploy:prod
```

This ensures the Sanity project ID is set during build.

### Method 3: Webhook Triggered
```bash
node scripts/webhook-deploy.js
```

For automated deployments when Sanity content changes.

## Setting Up Cloudflare Environment Variables

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → Your project
3. Settings → Variables
4. Add variable:
   - Variable name: `PUBLIC_SANITY_PROJECT_ID`
   - Value: `y67p94j5`

## Build Optimizations Applied

1. **Memory Limit Increased** - Prevents build failures
   ```json
   "build": "NODE_OPTIONS='--max-old-space-size=4096' astro build"
   ```

2. **Sanity Client Optimization** - Faster builds
   ```js
   optimizeDeps: {
     exclude: ['@sanity/client']
   }
   ```

3. **Static Output** - Optimized for Cloudflare Workers
   ```js
   output: 'static'
   ```

## Webhook Integration Options

### Option 1: GitHub Actions (Recommended)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy on Sanity Update
on:
  repository_dispatch:
    types: [sanity-update]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run deploy:prod
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### Option 2: Direct Webhook
Use a service like Pipedream or Make.com to:
1. Receive Sanity webhook
2. Trigger your deployment script

### Option 3: CI/CD Platform
Services like Vercel, Netlify, or Buddy.works can:
1. Listen for webhooks
2. Run build & deploy commands

## Testing Deployment

1. Make a change in Sanity Studio
2. Publish the change
3. Run deployment:
   ```bash
   npm run deploy
   ```
4. Verify at your domain

## Monitoring

- **Build logs**: Check console output
- **Cloudflare logs**: Workers dashboard → Logs
- **Sanity webhooks**: Sanity.io → API → Webhooks → Logs

## Troubleshooting

### Build fails with memory error
Already fixed with NODE_OPTIONS in package.json

### Sanity content not updating
1. Check PUBLIC_SANITY_PROJECT_ID is set
2. Verify content is published in Sanity
3. Clear Cloudflare cache if needed

### Deployment fails
1. Check wrangler is authenticated: `wrangler whoami`
2. Verify project name in wrangler.toml
3. Check Cloudflare API permissions