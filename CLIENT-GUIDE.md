# Cindy Romanzo Coaching - Complete Client Guide

Welcome! This guide covers everything you need to know about managing your website and coaching business tools.

## Table of Contents
1. [Content Management (Sanity CMS)](#content-management)
2. [Scheduling Setup (Cal.com)](#scheduling-setup)
3. [Website Deployment](#website-deployment)
4. [Quick Reference](#quick-reference)

---

## Content Management

### Accessing Sanity Studio

Your content management system is available at:
**https://cindy-coaching.sanity.studio/**

Login with your Google account (request access from your developer if needed).

### Understanding the New Structure

Your content is now organized into manageable sections:

```
📁 Content Types
├── 📄 Pages (Home Page)
├── 🎯 Hero Sections (Page banners)
├── 🛠️ Services (Your coaching offerings)
├── 💬 Testimonials (Client reviews)
├── 📢 CTA Blocks (Call-to-action sections)
├── 👤 Team Members (Your profile)
├── 📚 Resources (Articles & guides)
└── ⚙️ Site Settings (Global settings)
```

### Common Tasks

#### Adding a New Testimonial
1. Click "Testimonials" in sidebar
2. Click "+" to create new
3. Fill in:
   - Name: Client's name
   - Role: "Parent of ADHD Teen" or similar
   - Content: Their testimonial
   - Rating: 1-5 stars
   - Featured: Check to show prominently
4. Click "Publish"

#### Updating Your Services
1. Click "Services"
2. Select the service to edit
3. Update description, benefits, or pricing
4. Click "Publish"

#### Changing Hero Text
1. Click "Hero Sections"
2. Select "Home Page Hero" (or other)
3. Edit heading and subheading
4. Click "Publish"

#### Updating Your Bio
1. Click "Team Members"
2. Select "Cindy Romanzo"
3. Update bio, credentials, or specialties
4. Click "Publish"

### Publishing Changes

**Important**: After making any changes:
1. Click "Publish" in Sanity
2. Your website will automatically update within 2-3 minutes
3. If urgent, you can trigger a manual deployment (see deployment section)

---

## Scheduling Setup

See [CAL-COM-SETUP.md](./CAL-COM-SETUP.md) for detailed Cal.com configuration.

### Quick Setup Checklist
- [ ] Create Cal.com account
- [ ] Set up two event types:
  - `cindy-romanzo/consultation` (15 min)
  - `cindy-romanzo/office-hours` (30 min)
- [ ] Connect your calendar
- [ ] Customize booking questions
- [ ] Test the booking flow

---

## Website Deployment

Your website automatically deploys when:
- You publish content in Sanity (2-3 minute delay)
- Technical updates are made by your developer

### Manual Deployment (if needed)

If you need to force an immediate update:

1. Go to your GitHub repository
2. Click "Actions" tab
3. Select "Deploy to Production"
4. Click "Run workflow" → "Run workflow"
5. Wait 2-3 minutes for completion

---

## Quick Reference

### Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Your Website | https://cindyromanzo.com | Live website |
| Content Management | https://cindy-coaching.sanity.studio/ | Edit content |
| Scheduling | https://cal.com/cindy-romanzo | Manage bookings |
| GitHub | [Your GitHub URL] | Code & deployment |

### Content Types Cheat Sheet

| Content Type | What It Controls | How Often to Update |
|--------------|------------------|---------------------|
| Hero Sections | Page banners & main headings | Seasonally |
| Services | Your coaching offerings | As services change |
| Testimonials | Client success stories | Monthly |
| Resources | Blog posts & guides | Weekly/Bi-weekly |
| Team Members | Your bio & credentials | As needed |
| Site Settings | Contact info & navigation | Rarely |

### Booking Links for Your Website

Your website has two booking types:
- **Consultation**: 15-minute free discovery call
- **Office Hours**: 30-minute follow-up sessions

These automatically open Cal.com when clicked.

### Getting Help

**For content/website issues:**
- Check if you clicked "Publish" in Sanity
- Wait 2-3 minutes for changes to appear
- Try a manual deployment if urgent

**For scheduling issues:**
- Verify your Cal.com event URLs match exactly
- Check your calendar is properly synced
- Ensure availability is set correctly

**For technical issues:**
- Contact your developer
- Include screenshots of any errors
- Note what you were trying to do

---

## Monthly Maintenance Checklist

- [ ] Add new testimonials from happy clients
- [ ] Update any service descriptions or pricing
- [ ] Create new resources/blog posts
- [ ] Review and update your availability in Cal.com
- [ ] Check for any outdated content
- [ ] Block out vacation dates in calendar

---

## Security Reminders

1. **Never share your Sanity access** - Request individual accounts for team members
2. **Keep Cal.com logged in** on your primary device only
3. **Use strong passwords** for all accounts
4. **Regular backups** are automatic - no action needed

---

## Training Videos

Consider recording yourself doing these common tasks:
1. Adding a testimonial
2. Updating service descriptions
3. Creating a resource/blog post
4. Blocking time in Cal.com
5. Checking booking notifications

This will help you remember the process and train any future team members.

---

**Remember**: The new modular system means you only edit small, focused pieces of content instead of massive pages. This makes updates quicker and reduces the chance of breaking anything!

For additional details, see:
- [SANITY-WEBHOOKS.md](./SANITY-WEBHOOKS.md) - Advanced automation
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) - Technical documentation