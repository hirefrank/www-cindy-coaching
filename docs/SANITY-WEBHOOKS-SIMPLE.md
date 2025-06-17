# Simple Sanity Webhook Setup

## Good News!
Sanity's "Projection" field allows you to customize webhook payloads using GROQ, so you can trigger GitHub Actions directly without a proxy!

## Option 1: Direct GitHub Integration (Recommended)

1. **In Sanity Studio Webhooks**:
   - URL: `https://api.github.com/repos/[YOUR-USERNAME]/[YOUR-REPO]/dispatches`
   - Method: `POST`
   - HTTP Headers:
     ```
     Authorization: token [YOUR-GITHUB-TOKEN]
     Accept: application/vnd.github.v3+json
     Content-Type: application/json
     ```
   - **Required GitHub Token Permissions**: `repo` and `workflow`
   - Projection field:
     ```groq
     {
       "event_type": "sanity-update",
       "client_payload": {
         "dataset": sanity::dataset(),
         "projectId": sanity::projectId()
       }
     }
     ```

2. **That's it!** Your site will automatically deploy when you publish content.

## Option 2: Manual Deployment

If you prefer to control when deployments happen:

1. **Publish your content** in Sanity Studio
2. **Go to GitHub Actions**: https://github.com/[YOUR-USERNAME]/[YOUR-REPO]/actions
3. **Click "Deploy to Cloudflare Workers"**
4. **Click "Run workflow" → "Run workflow"**

Your site will deploy in 2-3 minutes.

## Alternative: Webhook Proxy (If Direct Integration Fails)

If you encounter issues with the direct integration, we've included a Cloudflare Worker proxy:

```bash
# Deploy the worker
cd scripts
wrangler deploy sanity-webhook-proxy.js --name sanity-webhook-proxy

# Configure secrets
wrangler secret put GITHUB_OWNER
wrangler secret put GITHUB_REPO  
wrangler secret put GITHUB_TOKEN
```

Then use the Worker URL instead of GitHub's API URL in your webhook settings.

## Recommendation

Try **Option 1 (Direct GitHub Integration)** first - it's the simplest and requires no additional infrastructure. If that doesn't work due to authentication or CORS issues, fall back to the webhook proxy.

For infrequent content updates, **manual deployment** is also perfectly fine.