# Sanity CMS Setup Guide

This website now uses Sanity.io as a headless CMS for content management. This allows your client to edit all website copy through a user-friendly interface.

## Setup Instructions

### 1. Create a Sanity Project

1. Go to [Sanity.io](https://www.sanity.io/) and create an account
2. Create a new project in the [Sanity Management Console](https://www.sanity.io/manage)
3. Note your Project ID

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the values:
   ```
   PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   SANITY_TOKEN=your-write-token
   ```

3. To create a write token:
   - Go to your project settings in Sanity
   - Navigate to API → Tokens
   - Create a new token with "Editor" permissions

### 3. Install Sanity Studio

```bash
cd sanity
npm install
```

### 4. Deploy Sanity Studio

```bash
cd sanity
npm run deploy
```

This will give you a URL like `https://your-project.sanity.studio` where your client can edit content.

### 5. Run Initial Content Migration

```bash
npm run migrate-to-sanity
```

This will import all existing website content into Sanity.

## How It Works

### Content Structure

The CMS is organized by pages:
- **Home Page**: Hero section, trust indicators, services preview, about preview, CTA
- **About Page**: Personal journey, professional evolution, credentials, approach, etc.
- **Services Page**: Service categories with detailed descriptions
- **Contact Page**: Contact info, scheduling options, FAQ
- **Resources Page**: Newsletter signup, categories, CTA

### For Your Client

Once set up, your client can:
1. Go to `https://your-project.sanity.studio`
2. Log in with their Sanity account
3. Click on any page to edit its content
4. Make changes in the visual editor
5. Click "Publish" to make changes live

### Development Workflow

The website fetches content from Sanity on each page load. If Sanity is unavailable, it falls back to default content, so the site will never break.

To test locally:
```bash
# Terminal 1: Run Astro
npm run dev

# Terminal 2: Run Sanity Studio (optional)
cd sanity && npm run dev
```

### Adding New Content Fields

To add new editable fields:
1. Update the schema in `sanity/schemas/`
2. Run the migration script to populate default values
3. Update the Astro page to fetch and display the new field

## Benefits

- **Real-time updates**: Changes appear immediately after publishing
- **Version history**: Track all content changes
- **Visual editing**: No technical knowledge required
- **Structured content**: Ensures consistency across the site
- **Media management**: Upload and manage images directly in Sanity

## Support

For Sanity-specific questions, check their [documentation](https://www.sanity.io/docs) or [community](https://slack.sanity.io/).