# Configuring Webhooks in Sanity

## Overview
Webhooks allow Sanity to automatically trigger deployments whenever content is published, updated, or deleted. This guide shows how to connect Sanity to your existing GitHub Actions deployment workflow.

## Setting Up Webhooks in Sanity Studio

### 1. Access Webhook Settings

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project: **cindy-coaching**
3. Navigate to **API** → **Webhooks**
4. Click **Create Webhook**

### 2. Configure the Webhook

Fill in the following fields:

#### Basic Configuration
- **Name**: `Deploy to Cloudflare`
- **Description**: `Trigger deployment when content changes`
- **URL**: 
  ```
  https://api.github.com/repos/[YOUR-USERNAME]/[YOUR-REPO]/dispatches
  ```
  (Replace with your actual GitHub username and repository name)

#### Dataset
- Select: `production`

#### Trigger On
- ✅ Create
- ✅ Update  
- ✅ Delete

#### Filter (Optional)
Leave empty to trigger on all content changes

#### Projection (Optional)
Leave empty - not needed for deployment triggers

#### HTTP Method
- Select: `POST`

#### HTTP Headers
Add these headers one by one:
1. Click "Add header"
2. **Header name**: `Authorization`
   **Value**: `Bearer [YOUR-GITHUB-TOKEN]` (or `token [YOUR-GITHUB-TOKEN]`)
3. Click "Add header" again
4. **Header name**: `Accept`
   **Value**: `application/vnd.github.v3+json`
5. Click "Add header" again
6. **Header name**: `Content-Type`
   **Value**: `application/json`

#### Request Body
Look for one of these fields in the Sanity webhook form:
- **Body**
- **Payload**
- **Request body**
- **Custom payload**

Enter this JSON:
```json
{
  "event_type": "sanity-update"
}
```

💡 **Note**: If you don't see a body/payload field, check if there's an "Advanced" section or toggle that reveals more options.

### 3. Why This Works

This webhook triggers your **existing** GitHub Actions workflow (`.github/workflows/deploy.yml`) because it listens for:
```yaml
repository_dispatch:
  types: [sanity-update]
```

You don't need a separate workflow - the webhook just tells GitHub to run your existing deployment workflow!

### 4. Test the Webhook

1. Click **Save** to create the webhook
2. Click **Test webhook** to send a test payload
3. Verify the deployment was triggered

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