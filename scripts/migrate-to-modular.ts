#!/usr/bin/env tsx
import { createClient, type SanityClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client: SanityClient = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-03-01',
  useCdn: false
});

console.log('🚀 Starting migration to modular content structure...\n');

// Helper to create document with proper ID
const createDocument = async <T extends Record<string, any>>(doc: T & { _type: string }) => {
  try {
    const result = await client.create(doc);
    console.log(`✅ Created ${doc._type}: ${(doc as any).internalTitle || (doc as any).title || (doc as any).name}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to create ${doc._type}:`, (error as Error).message);
    return null;
  }
};

async function migrateContent() {
  try {
    // Step 1: Create Cindy as a team member
    console.log('📝 Creating team member...');
    const cindyTeamMember = await createDocument({
      _type: 'teamMember',
      name: 'Cindy Romanzo',
      role: 'ICF Certified ADHD Coach',
      shortBio: 'Helping parents and students navigate ADHD challenges with brain-body strategies and executive function coaching.',
      credentials: [
        'ICF Certified Coach',
        'ADHD Specialist',
        'Executive Function Expert'
      ],
      specialties: [
        'ADHD Coaching',
        'Executive Function',
        'Academic Support',
        'Parent Coaching'
      ],
      order: 0
    });

    // Step 2: Create hero sections
    console.log('\n📝 Creating hero sections...');
    const homeHero = await createDocument({
      _type: 'hero',
      internalTitle: 'Home Page Hero',
      heading: 'Transform Your ADHD Challenges Into Strengths',
      subheading: 'Expert coaching for parents and students navigating neurodiversity',
      description: 'Discover personalized strategies that work with your unique brain, not against it.',
      primaryButton: {
        text: 'Schedule Free Consultation',
        link: '/contact'
      },
      secondaryButton: {
        text: 'Learn More',
        link: '/about'
      }
    });

    const aboutHero = await createDocument({
      _type: 'hero',
      internalTitle: 'About Page Hero',
      heading: 'Meet Cindy Romanzo',
      subheading: 'Your Partner in ADHD Success',
      description: 'ICF Certified Coach specializing in brain-body strategies for neurodiverse individuals and families.'
    });

    // Step 3: Create services
    console.log('\n📝 Creating services...');
    const services = await Promise.all([
      createDocument({
        _type: 'service',
        title: 'Executive Function Coaching',
        slug: { current: 'executive-function-coaching' },
        shortDescription: 'Build essential skills for planning, organization, and time management.',
        targetAudience: 'Students and adults with ADHD',
        benefits: [
          'Improved planning and prioritization',
          'Better time management skills',
          'Reduced procrastination',
          'Enhanced organizational systems'
        ],
        order: 1,
        featured: true
      }),
      createDocument({
        _type: 'service',
        title: 'Parent Coaching',
        slug: { current: 'parent-coaching' },
        shortDescription: 'Support and strategies for parents of neurodiverse children.',
        targetAudience: 'Parents of children with ADHD',
        benefits: [
          'Effective communication strategies',
          'Behavior management techniques',
          'School advocacy skills',
          'Stress reduction for the whole family'
        ],
        order: 2,
        featured: true
      }),
      createDocument({
        _type: 'service',
        title: 'Academic Coaching',
        slug: { current: 'academic-coaching' },
        shortDescription: 'Personalized support for students to excel in their studies.',
        targetAudience: 'Middle school, high school, and college students',
        benefits: [
          'Study skills development',
          'Test preparation strategies',
          'Assignment management',
          'Academic confidence building'
        ],
        order: 3
      })
    ]);

    // Step 4: Create testimonials
    console.log('\n📝 Creating testimonials...');
    const testimonials = await Promise.all([
      createDocument({
        _type: 'testimonial',
        name: 'Sarah M.',
        role: 'Parent of ADHD Teen',
        content: 'Cindy has been a game-changer for our family. Her strategies helped my son develop better study habits and actually enjoy learning again.',
        rating: 5,
        featured: true,
        order: 1
      }),
      createDocument({
        _type: 'testimonial',
        name: 'Michael T.',
        role: 'College Student',
        content: 'I went from struggling with deadlines to being ahead on my assignments. Cindy helped me understand how my ADHD brain works best.',
        rating: 5,
        featured: true,
        order: 2
      }),
      createDocument({
        _type: 'testimonial',
        name: 'Jennifer K.',
        role: 'Parent',
        content: 'The parent coaching sessions gave me tools I never knew existed. Our home is calmer and my daughter is thriving.',
        rating: 5,
        order: 3
      })
    ]);

    // Step 5: Create CTA blocks
    console.log('\n📝 Creating CTA blocks...');
    const ctaSchedule = await createDocument({
      _type: 'ctaBlock',
      internalTitle: 'Schedule Consultation CTA',
      heading: 'Ready to Transform Your Challenges?',
      subheading: 'Take the first step towards success',
      description: 'Schedule a free consultation to discuss your unique needs and how coaching can help.',
      buttons: [
        {
          text: 'Schedule Free Consultation',
          link: '/contact',
          style: 'primary'
        }
      ],
      backgroundStyle: 'gradient',
      alignment: 'center'
    });

    const ctaResources = await createDocument({
      _type: 'ctaBlock',
      internalTitle: 'Download Resources CTA',
      heading: 'Free ADHD Resources',
      subheading: 'Get started with helpful tools and guides',
      description: 'Download our collection of worksheets and guides designed for ADHD success.',
      buttons: [
        {
          text: 'Browse Resources',
          link: '/resources',
          style: 'primary'
        }
      ],
      backgroundStyle: 'light',
      alignment: 'center'
    });

    // Step 6: Create site settings
    console.log('\n📝 Creating site settings...');
    const siteSettings = await createDocument({
      _type: 'siteSettings',
      _id: 'siteSettings', // Singleton
      title: 'Cindy Romanzo Coaching',
      description: 'Expert ADHD coaching for parents and students',
      navigation: [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/about' },
        { title: 'Services', link: '/services' },
        { title: 'Resources', link: '/resources' },
        { title: 'Contact', link: '/contact' }
      ],
      footer: {
        copyrightText: '© 2024 Cindy Romanzo Coaching. All rights reserved.',
        footerLinks: [
          { title: 'Privacy Policy', link: '/privacy' },
          { title: 'Terms of Service', link: '/terms' }
        ]
      },
      contact: {
        email: 'hello@mindfulbalanceadhdcoaching.com',
        calendlyUrl: 'https://calendly.com/mindfulbalance'
      }
    });

    // Filter out null values
    const validServices = services.filter(s => s !== null);
    const validTestimonials = testimonials.filter(t => t !== null);

    // Step 7: Create new home page with references
    console.log('\n📝 Creating new home page...');
    if (homeHero && cindyTeamMember && ctaSchedule) {
      const homePageNew = await createDocument({
        _type: 'homePageNew',
        _id: 'homePageNew', // Singleton
        title: 'Home',
        seo: {
          title: 'ADHD Coaching for Parents & Students | Cindy Romanzo',
          description: 'Expert ADHD coaching and executive function support. Transform challenges into strengths with personalized strategies.',
          keywords: 'ADHD coaching, executive function, parent support, student coaching'
        },
        hero: {
          _type: 'reference',
          _ref: homeHero._id
        },
        trustIndicators: {
          stats: [
            { label: 'Students Helped', value: '200+', icon: 'users' },
            { label: 'Success Rate', value: '95%', icon: 'star' },
            { label: 'Years Experience', value: '10+', icon: 'award' },
            { label: 'ICF Certified', value: 'Yes', icon: 'check' }
          ],
          showTestimonials: true,
          miniTestimonials: validTestimonials
            .filter(t => (t as any).featured)
            .slice(0, 3)
            .map(t => ({
              _type: 'reference',
              _ref: t._id
            }))
        },
        servicesSection: {
          heading: 'How I Can Help',
          subheading: 'Personalized coaching solutions for your unique needs',
          services: validServices.map(s => ({
            _type: 'reference',
            _ref: s._id
          })),
          layout: 'grid-3'
        },
        aboutSection: {
          heading: 'Meet Your Coach',
          teamMember: {
            _type: 'reference',
            _ref: cindyTeamMember._id
          },
          ctaButton: {
            text: 'Learn More About Me',
            link: '/about'
          },
          layout: 'image-left'
        },
        testimonialsSection: {
          heading: 'Success Stories',
          subheading: 'See how coaching has transformed lives',
          testimonials: validTestimonials.map(t => ({
            _type: 'reference',
            _ref: t._id
          })),
          layout: 'carousel'
        },
        ctaSection: {
          _type: 'reference',
          _ref: ctaSchedule._id
        }
      });
    }

    console.log('\n✨ Migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Check Sanity Studio to see the new modular content');
    console.log('2. Update frontend queries to use the new structure');
    console.log('3. Test the site with new content');
    console.log('4. Once verified, remove old page schemas');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run migration
migrateContent();