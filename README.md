# Cindy Romanzo ADHD Coaching Website

Professional website for Cindy Romanzo, an ICF certified ADHD coach with 25+ years of Physical Therapy experience, specializing in brain-body strategies for neurodiverse individuals and families.

## 🚀 Tech Stack

- **Framework**: Astro (Static Site Generator)
- **Styling**: Tailwind CSS
- **Interactive Components**: React (for contact form and resource filtering)
- **Deployment**: Cloudflare Workers
- **Scheduling**: Cal.com integration
- **Analytics**: Google Analytics 4 (placeholder)

## 📁 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── images/         # Professional headshots
├── src/
│   ├── components/
│   │   ├── ui/         # Reusable UI components
│   │   ├── ContactForm.tsx
│   │   ├── MobileMenu.tsx
│   │   └── ResourcesFilter.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── resources.astro
│   │   └── services.astro
│   └── styles/
│       └── global.css
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── wrangler.toml       # Cloudflare Workers config
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🎨 Features

- **Astro Framework**: Static site generation with partial hydration
- **React Islands**: Interactive components (contact form, resources filter) using React
- **TypeScript**: Full TypeScript support
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first responsive design
- **Fast Performance**: Optimized for Core Web Vitals

## 🏃‍♂️ Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:4321](http://localhost:4321) in your browser

## 🏗️ Building for Production

```bash
npm run build
```

Your production-ready site will be in the `./dist/` folder.