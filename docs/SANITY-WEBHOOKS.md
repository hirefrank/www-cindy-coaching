# Configuring Webhooks in Sanity

## Overview
Webhooks allow Sanity to notify your deployment system whenever content is published, updated, or deleted.

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
- **URL**: Choose one of these options:
  
  **Option A - GitHub Actions (Recommended)**
  ```
  https://api.github.com/repos/[YOUR-USERNAME]/[YOUR-REPO]/dispatches
  ```
  
  **Option B - Custom Webhook Endpoint**
  ```
  https://your-webhook-handler.com/deploy
  ```
  
  **Option C - Cloudflare Deploy Hook**
  ```
  https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/[YOUR-HOOK-ID]
  ```

#### Dataset
- Select: `production`

#### Trigger On
- ✅ Create
- ✅ Update  
- ✅ Delete

#### Filter (Optional)
Leave empty to trigger on all content changes, or add filters like:
```
_type in ["homePage", "servicesPage", "aboutPage", "resourcesPage", "contactPage"]
```

#### Projection (Optional)
Leave empty - not needed for deployment triggers

### 3. Authentication Setup

Depending on your chosen webhook endpoint:

#### For GitHub Actions:
- **HTTP Method**: `POST`
- **HTTP Headers**:
  ```
  Authorization: token [YOUR-GITHUB-TOKEN]
  Accept: application/vnd.github.v3+json
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "event_type": "sanity-update"
  }
  ```

#### For Custom Endpoint:
- **HTTP Method**: `POST`
- **HTTP Headers**:
  ```
  Content-Type: application/json
  X-Sanity-Webhook-Secret: [YOUR-SECRET]
  ```

#### For Cloudflare Deploy Hook:
- **HTTP Method**: `POST`
- No additional headers needed (URL includes authentication)

### 4. Test the Webhook

1. Click **Save** to create the webhook
2. Click **Test webhook** to send a test payload
3. Verify the deployment was triggered

## Setting Up the Receiving End

### Option A: GitHub Actions

Create `.github/workflows/deploy-on-sanity-update.yml`:

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
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        env:
          PUBLIC_SANITY_PROJECT_ID: y67p94j5
          
      - name: Deploy to Cloudflare
        run: npm run deploy:prod
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Option B: Custom Webhook Handler

Use the existing `scripts/webhook-deploy.js` with a service like:

1. **Vercel Functions**
2. **Netlify Functions**
3. **Cloudflare Workers**
4. **AWS Lambda**

Example Cloudflare Worker:

```javascript
export default {
  async fetch(request, env) {
    // Verify webhook secret
    const secret = request.headers.get('X-Sanity-Webhook-Secret');
    if (secret !== env.SANITY_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Trigger deployment
    const response = await fetch('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/' + env.DEPLOY_HOOK_ID, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.CLOUDFLARE_API_TOKEN
      }
    });

    return new Response('Deployment triggered', { status: 200 });
  }
}
```

### Option C: Direct Cloudflare Deploy Hook

1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages → Your project
3. Go to Settings → Deploy Hooks
4. Create a new deploy hook
5. Copy the webhook URL
6. Use this URL directly in Sanity webhook configuration

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