# AGENTS.md

This document provides guidance for AI agents working on this codebase.

## Project Overview

Astro-based ADHD coaching website with a hybrid architecture. The main site is a static site deployed on Cloudflare Pages, with a separate Cloudflare Worker handling form submissions.

## Build Commands

```bash
# Start development server
pnpm run dev
pnpm run start

# Type-check and build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Deploy to Cloudflare Pages
pnpm run deploy

# Deploy to preview environment
pnpm run deploy:preview

# Deploy contact form worker only
pnpm run deploy:worker

# Run type-checking separately
astro check

# Run single type-check file
npx tsc --noEmit src/file.ts
```

## Code Style Guidelines

### General Principles

- Write clean, readable code over clever optimizations
- Prefer explicit over implicit
- Single responsibility: each function/component should do one thing well
- Avoid premature abstraction - wait until patterns repeat 3+ times

### TypeScript

- Enable strict mode (extends `astro/tsconfigs/strict`)
- Use TypeScript for all new code; provide type annotations for function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use `any` sparingly - prefer `unknown` if type is truly unknown
- Example:
  ```typescript
  interface Props {
    title: string;
    description?: string;
  }

  const Component = ({ title, description }: Props) => { ... }
  ```

### React Components (`.tsx`)

- Use functional components with TypeScript
- Use `client:load` or `client:visible` for interactive components in Astro
- Use Radix UI primitives (`@radix-ui/react-select`, etc.) for accessible UI components
- Prefer composition over inheritance
- Keep components small and focused
- Use the `cn()` utility (Tailwind merge) for className composition
- Handle loading and error states explicitly

### Astro Components (`.astro`)

- Use frontmatter fence `---` for TypeScript logic
- Fetch CMS content at the top of the component
- Use `set:html` directive for rendering HTML content from Cosmic CMS
- Separate static UI from interactive React components
- Example pattern:
  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import { getContent } from '../lib/cosmic';

  const data = await getContent();
  ---
  <Layout>
    <section>{data.title}</section>
  </Layout>
  ```

### Tailwind CSS

- Use utility classes for styling (built into the project)
- Component classes are defined in `src/styles/global.css` under `@layer components`
- Common classes: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.section-padding`, `.container-padding`
- Custom design tokens defined in CSS variables (colors, spacing, radius, etc.)

### Imports

- Use path alias `@/*` for imports from `src/` (configured in `tsconfig.json` and `astro.config.mjs`)
- Example: `import Layout from '@/layouts/Layout.astro';`
- Group imports: React → Components → UI Components → Utilities
- Use named exports for components

### Naming Conventions

- **Files**: kebab-case for Astro (`.astro`), PascalCase for React components (`.tsx`)
- **Variables/functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Component props**: PascalCase for components, camelCase for props
- **CSS classes**: kebab-case (Tailwind utilities) or BEM-style for custom classes

### Error Handling

- Wrap async operations in try/catch blocks
- Log errors with descriptive messages: `console.error('Action failed:', error)`
- Return `null` or fallback values from content fetchers on error
- Never expose sensitive information in error messages

### Content Management (Cosmic CMS)

- Content types: homepage, about, services, contact, footer, global-settings
- Environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
- Fetch helpers are in `src/lib/cosmic.ts`
- Always provide fallback values when content may be missing
- Use `set:html` for rendering rich text from CMS

### File Structure

```
src/
├── components/        # React components (interactive)
│   └── ui/           # Reusable UI components (buttons, inputs, etc.)
├── layouts/          # Astro layouts
├── lib/              # Utilities and integrations (cosmic.ts)
├── pages/            # Astro pages (routing)
│   └── api/         # API routes (if any)
├── styles/           # Global CSS and Tailwind
└── env.d.ts          # TypeScript declarations
```

### Environment Variables

- Create `.env` from `.env.example`
- Never commit `.env` to version control
- Required: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`

### Working with Git

- Create feature branches for changes
- Commit with descriptive messages explaining the "why"
- Pull and rebase from main before submitting PRs
- Never commit directly to main unless explicitly requested

### Common Patterns

- **CMS Content Fetching**: Always await content, handle null returns gracefully
- **Form Handling**: Use React components with controlled inputs
- **Client-side Interactivity**: Use `client:load` for critical, `client:visible` for non-critical
- **Tailwind Classes**: Use responsive prefixes (`md:`, `lg:`) for breakpoints

### What to Avoid

- Don't modify `.env` or commit secrets
- Don't use `cd` in commands; use `workdir` parameter instead
- Don't add comments unless necessary
- Don't commit broken builds
- Don't skip type-checking before committing
