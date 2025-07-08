# Mindful Balance ADHD Coaching Website

A modern, responsive website for Cindy Romanzo's ADHD coaching practice built with Astro, React, and Tailwind CSS. Deployed on Cloudflare Pages with a separate Cloudflare Worker for contact form handling.

## 🏗️ Architecture

- **Main Site**: Cloudflare Pages (Static Site)
- **Contact Form**: Dedicated Cloudflare Worker
- **Framework**: Astro with React components
- **Styling**: Tailwind CSS
- **Forms**: Custom React components with server-side validation

## � Project Structure

```text
/
├── public/
│   ├── _redirects              # Cloudflare Pages redirects
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── components/             # React components
│   │   ├── ContactForm.tsx     # Main contact form
│   │   ├── CalButton.tsx       # Cal.com integration
│   │   └── ui/                 # UI components
│   ├── layouts/
│   │   └── Layout.astro        # Main layout
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro         # About page
│   │   ├── services.astro      # Services page
│   │   └── contact.astro       # Contact page
│   └── styles/
│       └── global.css          # Global styles
├── workers/
│   └── contact-form/           # Dedicated contact form worker
│       ├── src/
│       │   └── index.js        # Worker logic
│       ├── package.json
│       └── wrangler.toml       # Worker configuration
├── wrangler.toml               # Pages configuration
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`     |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run deploy`          | Deploy Pages site to Cloudflare                 |
| `npm run deploy:worker`   | Deploy contact form worker to Cloudflare        |

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy the Contact Form Worker
```bash
# Install worker dependencies
cd workers/contact-form
npm install

# Deploy the worker
npm run deploy

# Go back to root
cd ../..
```

### 3. Update Redirects
After deploying the worker, update `public/_redirects` with your actual worker URL.

### 4. Deploy the Main Site
```bash
npm run deploy
```

## � Deployment

### Pages Deployment
- The main site is deployed as a Cloudflare Pages project
- Static files are served from the `dist/` directory
- Redirects are handled via `public/_redirects`

### Worker Deployment
- Contact form is handled by a separate Cloudflare Worker
- Worker is configured to handle `/api/contact` requests
- Routes are configured in `workers/contact-form/wrangler.toml`

## 📧 Contact Form

The contact form is powered by a dedicated Cloudflare Worker that:
- Validates form input (firstName, lastName, email, subject, message)
- Handles CORS for cross-origin requests
- Logs submissions to Cloudflare dashboard
- Returns appropriate success/error responses

## 🛠️ Development

### Local Development
```bash
# Start the main site
npm run dev

# In another terminal, start the worker (optional)
cd workers/contact-form
npm run dev
```

### Adding New Pages
1. Create new `.astro` files in `src/pages/`
2. Use the `Layout.astro` component for consistent styling
3. Add navigation links as needed

### Customizing Components
- React components are in `src/components/`
- UI components follow a consistent pattern in `src/components/ui/`
- Tailwind classes are used for styling

## 📝 Configuration Files

- `wrangler.toml` - Main Cloudflare Pages configuration
- `workers/contact-form/wrangler.toml` - Worker configuration
- `astro.config.mjs` - Astro framework configuration
- `tailwind.config.mjs` - Tailwind CSS configuration
- `public/_redirects` - Cloudflare Pages redirects

## 🔗 Links

- **Live Site**: https://mindfulbalanceadhdcoaching.com/
- **Framework**: [Astro](https://astro.build)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Worker**: [Cloudflare Workers](https://workers.cloudflare.com)
