# Cindy Romanzo Coaching Website - Development Specification

## Project Overview

### Client Background
Cynthia (Cindy) Romanzo is an ICF certified ADHD coach with a unique background as a Physical Therapist with 25+ years of experience in pediatrics and brain-based rehabilitation. She specializes in working with neurodivergent adults, teens, and parents of neurodiverse children.

### Primary Goals
1. Attract new coaching clients directly
2. Establish credibility and showcase expertise
3. Provide a resource hub for parents and educators

### Target Audience
- **Primary**: Parents of neurodiverse children
- **Secondary**: Neurodivergent adults and teens
- **Tertiary**: Educators and allied professionals

## Technical Stack

### Core Technologies
- **Framework**: Astro (static site generator)
- **Hosting**: Cloudflare Workers
- **Scheduling**: Cal.com with popup widgets
- **CMS**: Sanity (free tier for public content)
- **Domain**: cindyromanzo.com (pending client confirmation)

### Template Selection
- Look for Astro templates tagged as "business," "consulting," or "professional"
- Prioritize templates with:
  - Clean typography and white space
  - Simple navigation structure
  - Service-focused layouts
  - Built-in blog functionality
  - Minimal color palette

## Design System

### Visual Direction
Based on reference sites (hirefrank.com, adhdcollegesolutions.com, tuckmanpsych.com), prioritize:
- Clean, minimal aesthetic with plenty of white space
- Professional but approachable tone
- Easy navigation without visual overwhelm
- Calming, trustworthy color palette

### Typography
- **Primary Font**: Inter or Open Sans (fallback to system fonts)
- **Heading Scale**: 
  - H1: 2.5rem (40px) desktop / 2rem (32px) mobile
  - H2: 2rem (32px) desktop / 1.75rem (28px) mobile
  - H3: 1.5rem (24px) desktop / 1.25rem (20px) mobile
- **Body Text**: 1.125rem (18px) with 1.6 line height
- **Small Text**: 0.875rem (14px) for captions/metadata

### Color Palette
- **Primary**: Calming blue (#2563eb or similar)
- **Secondary**: Soft green (#059669 or similar)
- **Neutral**: Grays (#f8fafc, #64748b, #1e293b)
- **Background**: White (#ffffff)
- **Text**: Dark gray (#1e293b)

### Spacing System
- **Base unit**: 8px
- **Scale**: 8px, 16px, 24px, 32px, 48px, 64px, 96px
- **Section padding**: 64px desktop / 48px mobile
- **Component spacing**: 24px-32px between elements

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## Site Structure & Navigation

### Main Navigation
1. **Home**
2. **About**
3. **Services**
4. **Resources** (Blog)
5. **Contact**

### Footer
- Contact information
- Professional credentials/badges
- Social links (if applicable)
- Copyright notice

## Page Specifications

### Homepage

#### Hero Section
- **Headline**: "Physical Therapist turned ADHD Coach helping parents and neurodiverse individuals thrive through brain-body strategies"
- **Subheadline**: Brief description of her unique approach and target audience
- **Professional headshot**: Clean, professional photo
- **Primary CTA**: "Schedule Office Hours" (Cal.com popup)
- **Secondary CTA**: "Learn About My Services" (link to Services page)

#### Trust Indicators Section
- ICF certification badge
- Key credentials (ACC, CAS, MPT)
- Years of experience highlight
- Brief testimonial or client success metric (if available)

#### Services Preview
- 3-column layout highlighting main service categories:
  - **For Parents & Families**
  - **For Adults**
  - **For Organizations**
- Each with brief description and "Learn More" CTA

#### About Preview
- Brief personal story snippet
- "Read My Full Story" CTA to About page

### About Page

#### Story-First Structure
1. **Personal Journey**
   - Her path from PT to ADHD coach
   - Personal experience with ADHD
   - What drives her passion for this work

2. **Professional Evolution**
   - 25+ years PT experience
   - Pediatric and brain-based rehabilitation background
   - Transition to coaching

3. **Credentials & Training**
   - ICF ACC certification
   - ADHD coaching training
   - PT education and licensing
   - Continuing education

4. **Approach & Philosophy**
   - Brain-body connection
   - Collaborative coaching style
   - Mindfulness and practical strategies

5. **Personal Touch**
   - Bergen County resident
   - Mother of triplet teenagers
   - Personal interests (reading, yoga, fitness, travel)

#### CTA Section
- "Schedule a Consultation" button
- "Learn About My Services" button

### Services Page

#### Service Categories

**For Parents & Families** (Primary section)
- **Parent Coaching**
  - Description: Supporting parents in understanding and advocating for their neurodiverse children
  - Duration: Ongoing coaching relationships
  - CTA: "Schedule Consultation" popup

- **Individual Coaching for Teens**
  - Description: Direct coaching for neurodiverse teenagers on executive function and life skills
  - Duration: Weekly sessions
  - CTA: "Schedule Consultation" popup

- **Family Consulting**
  - Description: Comprehensive family support and strategy development
  - Duration: Project-based or ongoing
  - CTA: "Schedule Consultation" popup

**For Adults** (Secondary section)
- **Individual ADHD/Executive Function Coaching**
  - Description: One-on-one coaching for adults with ADHD and executive function challenges
  - Duration: Weekly or bi-weekly sessions
  - CTA: "Schedule Consultation" popup

**For Organizations & Professionals** (Tertiary section)
- **Teacher Training & Classroom Support**
  - Description: Professional development for educators working with neurodiverse students
  - Format: Workshops, presentations, ongoing consultation
  - CTA: "Schedule Consultation" popup

- **Presentations for Parent Advisory Groups**
  - Description: Educational presentations for school parent groups
  - Format: 1-2 hour presentations with Q&A
  - CTA: "Schedule Consultation" popup

- **Professional Networking (Office Hours)**
  - Description: 15-30 minute sessions for allied professionals or potential clients
  - Format: Informal check-ins and introductory conversations
  - CTA: "Schedule Office Hours" popup

### Resources (Blog) Page

#### Blog Structure
- **Archive page**: Grid layout showing all posts with excerpts
- **Category filtering**: 5 main categories
- **Individual post pages**: Clean, readable layout
- **Search functionality**: Basic search by title/content

#### Content Categories
1. **ADHD Strategies**
2. **Autism Support**
3. **Executive Function**
4. **Parent Resources**
5. **Classroom/Educational Support**

#### Blog Post Schema (Sanity CMS)
```javascript
{
  title: 'string',
  slug: 'slug',
  publishedAt: 'datetime',
  category: 'reference to categories',
  excerpt: 'text',
  content: 'rich text',
  author: 'reference to author',
  metaDescription: 'string',
  featured: 'boolean'
}
```

### Contact Page

#### Contact Information
- Professional email: cindy@cindyromanzo.com
- Phone number (if provided)
- Location: Bergen County, NJ
- Office hours/availability

#### Contact Form
- Name, Email, Subject, Message fields
- Service interest dropdown
- Submit to email or form service

#### CTA Section
- "Schedule Office Hours" popup
- "Schedule Consultation" popup

## Cal.com Integration

### Setup Requirements
- Create Cal.com account for client
- Set up two event types:
  1. **Office Hours** (15-30 minutes)
  2. **Consultation** (45-60 minutes)

### Popup Implementation
- Use Cal.com's popup widget code
- Implement on CTA buttons throughout site
- Ensure mobile-responsive popup behavior

### Event Type 1: Office Hours
- **Duration**: 15-30 minutes
- **Purpose**: Professional networking and potential client introductions
- **Availability**: Set specific recurring times
- **Integration**: Primary CTA on homepage

### Event Type 2: Consultation
- **Duration**: 45-60 minutes
- **Purpose**: Detailed discussion of coaching needs
- **Availability**: Flexible scheduling
- **Integration**: Services page and other strategic locations

## Sanity CMS Configuration

### Content Types
1. **Blog Posts** (detailed schema above)
2. **Categories** (name, description, slug)
3. **Author** (name, bio, image)
4. **Site Settings** (global content like contact info)

### Content Strategy
- Keep initial setup simple
- Focus on essential fields only
- Plan for future expansion

## SEO & Performance

### Technical SEO
- Clean URL structure
- Proper heading hierarchy
- Meta descriptions for all pages
- Open Graph tags for social sharing
- Schema markup for local business
- XML sitemap generation

### Performance Targets
- Lighthouse score: 90+ on all metrics
- First Contentful Paint: <2 seconds
- Largest Contentful Paint: <2.5 seconds
- Cumulative Layout Shift: <0.1

### Accessibility
- WCAG 2.1 AA compliance
- Proper alt text for images
- Keyboard navigation support
- Color contrast ratios: 4.5:1 minimum

## Development Phases

### Phase 1: Core Site Setup
- [ ] Astro template selection and initial setup
- [ ] Basic page structure (Home, About, Services, Contact)
- [ ] Design system implementation
- [ ] Cal.com popup integration
- [ ] Responsive design testing
- [ ] Initial content population

### Phase 2: CMS Integration
- [ ] Sanity CMS setup and configuration
- [ ] Blog functionality implementation
- [ ] Content schema creation
- [ ] Blog template development
- [ ] Category filtering functionality

### Phase 3: Polish & Launch
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Content review and approval
- [ ] Domain setup and deployment
- [ ] Analytics setup (Google Analytics 4)

## Content Requirements

### Client Deliverables Needed
- [ ] Professional headshots
- [ ] Credential badges/certifications
- [ ] Detailed service descriptions
- [ ] About page content (personal story)
- [ ] Initial blog posts (3-5 posts)
- [ ] Contact information
- [ ] Domain registration confirmation

### Developer Deliverables
- [ ] Responsive website matching specifications
- [ ] Cal.com integration with popup functionality
- [ ] Sanity CMS setup with content editing capabilities
- [ ] Documentation for content management
- [ ] Basic SEO optimization
- [ ] Performance optimization
- [ ] Deployment on Cloudflare Workers

## Success Metrics

### Primary Goals
- Increase in coaching consultation bookings
- Professional credibility establishment
- Parent/educator resource engagement

### Technical Metrics
- Page load speed <2 seconds
- Mobile-first responsive design
- Accessibility compliance
- SEO optimization complete

### Content Metrics
- Blog post engagement
- Resource download rates (future)
- Contact form submissions
- Cal.com booking conversion rates

## Budget Considerations

### Development Costs
- Template customization and setup
- Cal.com integration
- Sanity CMS configuration
- Content migration and setup
- Testing and optimization

### Ongoing Costs
- Domain registration: ~$15/year
- Cloudflare Workers: Free tier initially
- Sanity CMS: Free tier (sufficient for current needs)
- Cal.com: Free tier initially

## Post-Launch Considerations

### Maintenance
- Regular content updates via Sanity CMS
- Cal.com availability management
- Analytics monitoring
- Performance monitoring

### Future Enhancements
- Client testimonials section
- Resource downloads (PDFs, guides)
- Email newsletter integration
- Advanced booking features
- E-commerce for digital products

---

*This specification document serves as a comprehensive guide for developing Cindy Romanzo's coaching website. All technical decisions should align with the goal of creating a clean, professional, and user-friendly experience that converts visitors into coaching clients.*