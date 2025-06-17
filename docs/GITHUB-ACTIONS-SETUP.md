# GitHub Actions Setup for Cloudflare Workers Deployment

## Overview

This repository uses GitHub Actions to automatically build and deploy the website to Cloudflare Workers whenever:
- Code is pushed to the main branch
- A manual deployment is triggered
- Sanity content is updated (via webhook)

## Required Secrets

You need to add the following secrets to your GitHub repository:

### 1. Navigate to Repository Settings
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"

### 2. Add Required Secrets

Click "New repository secret" for each of the following:

#### `CLOUDFLARE_API_TOKEN`
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Custom token" template with these permissions:
   - Account: `Cloudflare Workers Scripts:Edit`
   - Zone: `Zone:Read`, `Cache Purge:Purge`
4. Copy the token and add it as the secret value

#### `CLOUDFLARE_ACCOUNT_ID`
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Find the Account ID in the right sidebar
4. Copy and add it as the secret value

#### `CLOUDFLARE_ZONE_ID` (Optional - for cache purging)
1. Go to your domain in Cloudflare Dashboard
2. Find the Zone ID in the right sidebar
3. Copy and add it as the secret value

## Deployment Workflows

### Automatic Deployment
Every push to the `main` branch automatically deploys to production.

### Manual Deployment
1. Go to the "Actions" tab in your repository
2. Select "Deploy to Production" workflow
3. Click "Run workflow"
4. Choose environment: `preview` or `production`
5. Click "Run workflow" button

### Sanity Webhook Deployment
When content is updated in Sanity, it can trigger a deployment:

1. In Sanity Studio, set up a webhook pointing to:
   ```
   https://api.github.com/repos/[YOUR-USERNAME]/[YOUR-REPO]/dispatches
   ```

2. Configure the webhook with:
   - Method: `POST`
   - Headers:
     ```
     Authorization: token [YOUR-GITHUB-PERSONAL-ACCESS-TOKEN]
     Accept: application/vnd.github.v3+json
     Content-Type: application/json
     ```
   - Body:
     ```json
     {
       "event_type": "sanity-update"
     }
     ```

## Creating a GitHub Personal Access Token

For Sanity webhooks to trigger deployments:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Give it a name like "Sanity Webhook"
4. Select scope: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token and use it in the Sanity webhook configuration

## Note on Permissions

The workflow uses GitHub's built-in `GITHUB_TOKEN` which has limited permissions. If you see "Resource not accessible by integration" errors, this is normal. The deployment will still work correctly.

## Monitoring Deployments

### View Deployment Status
1. Go to the "Actions" tab in your repository
2. Click on any workflow run to see details
3. Green checkmark = successful deployment
4. Red X = failed deployment (check logs)

### Deployment URLs
- **Production**: https://cindyromanzo.com
- **Preview**: https://preview.cindy-romanzo-coaching.workers.dev

### Troubleshooting

**Build fails with "Module not found"**
- Check that all dependencies are in package.json
- Run `npm install` locally and commit package-lock.json

**Deployment fails with "Authentication error"**
- Verify CLOUDFLARE_API_TOKEN has correct permissions
- Check CLOUDFLARE_ACCOUNT_ID is correct

**Cache not clearing**
- Ensure CLOUDFLARE_ZONE_ID is set
- Verify API token has Cache Purge permission

## Best Practices

1. **Test locally first**: Run `npm run build` before pushing
2. **Use preview environment**: Deploy to preview first, then production
3. **Monitor deployments**: Check Actions tab after pushing
4. **Keep secrets secure**: Never commit secrets to the repository

## Support

If you encounter issues:
1. Check the GitHub Actions logs for error messages
2. Verify all secrets are correctly set
3. Ensure Cloudflare API token has necessary permissions
4. Check that wrangler.toml is properly configured