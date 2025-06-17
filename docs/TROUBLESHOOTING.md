# Troubleshooting Guide

## Common Issues and Solutions

### Sanity Studio Issues

#### "Missing keys" or "Reset value" errors
**Cause**: Fields in schema expecting data that doesn't exist  
**Solution**: 
- Don't include `null` values for optional fields
- Use the `fix-sanity-data.js` script to clean up existing data
- Ensure image fields are either undefined or have proper asset references

#### Content not updating on website
1. Verify content is **published** in Sanity (not just saved)
2. Check that `PUBLIC_SANITY_PROJECT_ID` is set correctly
3. Wait 2-3 minutes for cache to clear after automatic deployment
4. If using webhooks, check GitHub Actions tab for deployment status
5. Check browser console for any API errors

### Build & Deployment Issues

#### JavaScript heap out of memory
**Solution**: Already fixed in package.json with:
```json
"build": "NODE_OPTIONS='--max-old-space-size=4096' astro build"
```

#### Deployment fails with authentication error
- Verify `CLOUDFLARE_API_TOKEN` has correct permissions
- Check `CLOUDFLARE_ACCOUNT_ID` matches your account
- Ensure token has Workers Scripts:Edit permission

#### Double deployments occurring
- This was fixed by removing duplicate workflow files
- Only one deployment should trigger per event now

### Local Development Issues

#### Port already in use
```bash
# Kill the process using port 4321
lsof -ti:4321 | xargs kill -9
# Or use a different port
npm run dev -- --port 4322
```

#### Sanity client errors
- Ensure `.env` file exists with `PUBLIC_SANITY_PROJECT_ID`
- Check that you're in the project root, not the sanity/ folder

## Useful Scripts

### Check Sanity data integrity
```bash
npm run check-old-docs
```

### Fix Sanity data issues
```bash
node scripts/fix-sanity-data.js
```

### Manual deployment via GitHub Actions
1. Go to the GitHub repository
2. Click "Actions" tab
3. Select "Deploy to Production" workflow
4. Click "Run workflow" button

## Getting Help

1. Check error messages in:
   - Browser console
   - Terminal/build output
   - GitHub Actions logs
   - Sanity Studio console

2. Verify environment:
   - All required secrets are set
   - Dependencies are installed (`npm install`)
   - You're using Node.js 18+

3. For persistent issues:
   - Clear browser cache
   - Delete node_modules and reinstall
   - Check Sanity Studio status page