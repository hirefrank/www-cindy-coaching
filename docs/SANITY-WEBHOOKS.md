# Configuring Webhooks in Sanity for GitHub Actions

## Overview
This guide explains how to set up automatic deployments via GitHub Actions when content is updated in Sanity Studio.

## Good News!
Sanity's "Projection" field allows you to customize webhook payloads using GROQ, so you can trigger GitHub Actions directly!

## Setting Up Webhooks in Sanity Studio

### 1. Access Webhook Settings

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project: **cindy-coaching**
3. Navigate to **API** → **Webhooks**
4. Click **Create Webhook**

### 2. Configure the Webhook

### Direct GitHub Integration

1. **Create webhook in Sanity**:
   - **Name**: Deploy to Production
   - **URL**: `https://api.github.com/repos/[YOUR-GITHUB-USERNAME]/[YOUR-REPO-NAME]/dispatches`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave empty to trigger on all changes
   - **Projection**: Use this GROQ query:
     ```groq
     {
       "event_type": "sanity-update",
       "client_payload": {
         "dataset": sanity::dataset(),
         "projectId": sanity::projectId()
       }
     }
     ```
   - **HTTP Method**: POST
   - **HTTP Headers**:
     ```
     Authorization: token [YOUR-GITHUB-PERSONAL-ACCESS-TOKEN]
     Accept: application/vnd.github.v3+json
     Content-Type: application/json
     ```
   - **Secret**: (Optional) Add a secret for security
   - **Enable webhook**: On

2. **GitHub Personal Access Token Permissions**:
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select these permissions:
     - `repo` (Full control of private repositories)
     - `workflow` (Update GitHub Action workflows)
   - Or for fine-grained tokens, grant:
     - Repository permissions: `Actions: write`, `Contents: read`, `Metadata: read`

### Manual Deployment Alternative

If you prefer to control when deployments happen:

1. **Publish your content** in Sanity Studio
2. **Go to GitHub Actions**: https://github.com/[YOUR-USERNAME]/[YOUR-REPO]/actions
3. **Click "Deploy to Cloudflare Workers"**
4. **Click "Run workflow" → "Run workflow"**

Your site will deploy in 2-3 minutes.

### 3. Test Your Webhook

1. Make a small change in Sanity Studio
2. Publish the change
3. Check GitHub Actions to see if the workflow was triggered
4. Monitor the deployment progress

### 4. Why This Works

This webhook triggers your **existing** GitHub Actions workflow (`.github/workflows/deploy.yml`) because it listens for:
```yaml
repository_dispatch:
  types: [sanity-update]
```

You don't need a separate workflow - the webhook just tells GitHub to run your existing deployment workflow!

### 5. Webhook Filters (Optional)

To reduce unnecessary deployments, add filters:

**Only deploy when specific document types change**:
```groq
_type in ["homePage", "hero", "service", "testimonial", "ctaBlock", "teamMember"]
```

**Only deploy on publish (not drafts)**:
```groq
!(_id in path("drafts.**"))
```

## How It Works

Your existing GitHub Actions workflow (`.github/workflows/deploy.yml`) already listens for webhook events:

```yaml
on:
  repository_dispatch:
    types: [sanity-update]
```

When Sanity sends a webhook with `"event_type": "sanity-update"`, it triggers this workflow automatically. No additional workflows needed!

## Security Best Practices

1. **Use webhook secrets** to verify requests are from Sanity
2. **Limit webhook scope** with filters to avoid unnecessary deployments
3. **Add rate limiting** to prevent deployment spam
4. **Monitor webhook logs** in Sanity for failed deliveries

## Troubleshooting

### Webhook not firing?
- Check webhook is enabled in Sanity
- Verify dataset matches (production)
- Ensure content was published, not just saved

### Deployment not triggered?
- Check webhook logs in Sanity dashboard
- Verify authentication headers are correct
- Test with curl to debug endpoint

### Too many deployments?
- Add filters to webhook configuration
- Implement debouncing in webhook handler
- Consider batching changes

## Manual Webhook Management

You can also manage webhooks via Sanity CLI:

```bash
# List webhooks
sanity hook list

# Create webhook
sanity hook create \
  --dataset production \
  --name "Deploy to Cloudflare" \
  --url "https://your-webhook-url.com" \
  --trigger create --trigger update --trigger delete

# Delete webhook
sanity hook delete [webhook-id]
```

## Next Steps

1. Choose your webhook endpoint strategy
2. Set up authentication tokens/secrets
3. Create the webhook in Sanity
4. Test with a content change
5. Monitor deployments

Remember: Each content publish will trigger a deployment, so consider implementing smart caching or deployment batching for frequently updated sites.