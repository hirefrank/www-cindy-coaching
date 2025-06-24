import { sanityClient } from './sanity';

/**
 * Adapter to fetch from new modular structure but return data in old format
 * This allows us to keep the UI exactly the same while using the new backend
 */

export async function getHomePage() {
  // First try to get the old structure (for backwards compatibility)
  const oldHomePage = await sanityClient.fetch(`*[_type == "homePage"][0]{
    seo,
    hero,
    trustIndicators,
    servicesSection,
    aboutSection,
    ctaSection
  }`);

  // If old structure exists, return it as-is
  if (oldHomePage) {
    return oldHomePage;
  }

  // Otherwise, fetch from new modular structure and transform
  const newHomePage = await sanityClient.fetch(`*[_type == "homePageNew"][0]{
    seo,
    hero->{
      heading,
      subheading,
      description,
      primaryButton,
      secondaryButton,
      image
    },
    trustIndicators{
      stats
    },
    servicesSection{
      heading,
      subheading,
      services[]->{
        title,
        shortDescription
      }
    },
    aboutSection{
      heading,
      teamMember->{
        shortBio,
        image
      },
      ctaButton
    },
    ctaSection->{
      heading,
      subheading,
      description,
      buttons
    }
  }`);

  if (!newHomePage) {
    return null;
  }

  // Transform new structure to old format
  return {
    seo: newHomePage.seo,
    hero: {
      heading: newHomePage.hero?.heading,
      subheading: newHomePage.hero?.subheading || newHomePage.hero?.description,
      primaryButtonText: newHomePage.hero?.primaryButton?.text,
      secondaryButtonText: newHomePage.hero?.secondaryButton?.text,
      image: newHomePage.hero?.image
    },
    trustIndicators: newHomePage.trustIndicators?.stats?.map(stat => ({
      label: stat.icon?.toUpperCase() || stat.value?.match(/\d+/)?.[0] || 'ICF',
      title: stat.label,
      subtitle: stat.value
    })),
    servicesSection: {
      heading: newHomePage.servicesSection?.heading,
      description: newHomePage.servicesSection?.subheading,
      services: newHomePage.servicesSection?.services?.map((service, index) => ({
        icon: ['P', 'A', 'O'][index],
        title: service.title,
        description: service.shortDescription,
        linkText: 'Learn More'
      }))
    },
    aboutSection: {
      heading: newHomePage.aboutSection?.heading || "My Journey from PT to ADHD Coach",
      paragraphs: newHomePage.aboutSection?.teamMember?.shortBio ? [
        newHomePage.aboutSection.teamMember.shortBio,
        "As a mother of triplet teenagers in Bergen County, I understand the daily challenges families face and the importance of practical, sustainable strategies."
      ] : undefined,
      buttonText: newHomePage.aboutSection?.ctaButton?.text,
      image: newHomePage.aboutSection?.teamMember?.image
    },
    ctaSection: {
      heading: newHomePage.ctaSection?.heading,
      description: newHomePage.ctaSection?.description,
      primaryButtonText: newHomePage.ctaSection?.buttons?.[0]?.text,
      secondaryButtonText: newHomePage.ctaSection?.buttons?.[1]?.text
    }
  };
}

export async function getAboutPage() {
  // Try old structure first
  const oldAboutPage = await sanityClient.fetch(`*[_type == "aboutPage"][0]`);
  if (oldAboutPage) return oldAboutPage;

  // Fetch modular structure
  const data = await sanityClient.fetch(`{
    "page": *[_type == "page" && slug.current == "about"][0]{
      seo,
      hero->{...},
      sections[]{
        _type == 'reference' => @->{...},
        _type != 'reference' => @
      }
    },
    "teamMember": *[_type == "teamMember" && name == "Cindy Romanzo"][0],
    "hero": *[_type == "hero" && internalTitle match "About*"][0]
  }`);

  if (!data.teamMember && !data.page) return null;

  // Transform to expected format
  return {
    seo: data.page?.seo,
    hero: {
      heading: data.hero?.heading || data.page?.hero?.heading,
      description: data.hero?.description || data.page?.hero?.description
    },
    personalJourney: {
      heading: "My Personal Journey",
      paragraphs: data.teamMember?.bio || [],
      image: data.teamMember?.image
    },
    professionalEvolution: {
      heading: "Professional Evolution",
      paragraphs: ["Over 25 years of pediatric physical therapy experience..."],
      image: null
    },
    credentials: {
      heading: "Credentials & Certifications",
      description: "Committed to continuous learning and professional development",
      certifications: data.teamMember?.credentials || [],
      continuingEducation: {
        heading: "Continuing Education",
        items: []
      }
    },
    approach: {
      heading: "My Approach",
      description: "I believe in a holistic, brain-body approach",
      principles: data.teamMember?.specialties || []
    },
    personal: {
      heading: "Beyond Work",
      description: "Mother of triplets in Bergen County",
      interests: [],
      conclusion: "I understand the challenges families face"
    },
    ctaSection: {
      heading: "Ready to Work Together?",
      description: "Let's discuss how I can support your journey",
      primaryButtonText: "Schedule Consultation",
      secondaryButtonText: "View Services"
    }
  };
}

export async function getServicesPage() {
  // Try old structure first
  const oldServicesPage = await sanityClient.fetch(`*[_type == "servicesPage"][0]`);
  if (oldServicesPage) return oldServicesPage;

  // Fetch modular structure
  const data = await sanityClient.fetch(`{
    "services": *[_type == "service"] | order(order asc),
    "hero": *[_type == "hero" && internalTitle match "Service*"][0],
    "ctaBlock": *[_type == "ctaBlock" && internalTitle match "*Service*"][0]
  }`);

  if (!data.services || data.services.length === 0) return null;

  // Group services into categories
  const parentServices = data.services.filter(s => s.featured);
  const individualServices = data.services.filter(s => !s.featured);

  return {
    seo: {
      title: "Services",
      description: "ADHD coaching and executive function support for parents, students, and adults"
    },
    hero: {
      heading: data.hero?.heading || "How I Can Help",
      description: data.hero?.description || "Personalized coaching solutions for your unique needs"
    },
    serviceCategories: [
      {
        categoryTitle: "Parent & Family Support",
        services: parentServices.map(s => ({
          icon: "P",
          title: s.title,
          description: s.shortDescription,
          features: s.benefits || [],
          format: s.targetAudience
        }))
      },
      {
        categoryTitle: "Individual Coaching",
        services: individualServices.map(s => ({
          icon: "I",
          title: s.title,
          description: s.shortDescription,
          features: s.benefits || [],
          format: s.targetAudience
        }))
      }
    ],
    ctaSection: {
      heading: data.ctaBlock?.heading || "Ready to Get Started?",
      description: data.ctaBlock?.description || "Schedule a consultation to discuss your needs",
      buttonText: data.ctaBlock?.buttons?.[0]?.text || "Schedule Consultation"
    }
  };
}

export async function getResourcesPage() {
  // Try old structure first
  const oldResourcesPage = await sanityClient.fetch(`*[_type == "resourcesPage"][0]`);
  if (oldResourcesPage) return oldResourcesPage;

  // Fetch modular structure
  const data = await sanityClient.fetch(`{
    "hero": *[_type == "hero" && internalTitle match "Resource*"][0],
    "resources": *[_type == "resource"] | order(publishedAt desc)[0...10],
    "ctaBlock": *[_type == "ctaBlock" && internalTitle match "*Resource*"][0]
  }`);

  return {
    seo: {
      title: "Resources",
      description: "Free ADHD resources, guides, and tools for parents and students"
    },
    hero: {
      heading: data.hero?.heading || "ADHD Resources & Tools",
      description: data.hero?.description || "Practical guides and strategies for success"
    },
    newsletter: {
      heading: "Stay Updated",
      description: "Get the latest resources and tips delivered to your inbox",
      placeholder: "Enter your email",
      buttonText: "Subscribe"
    },
    categoriesSection: {
      heading: "Browse by Category"
    },
    ctaSection: {
      heading: data.ctaBlock?.heading || "Need Personalized Support?",
      description: data.ctaBlock?.description || "Work with me directly for customized strategies",
      buttonText: data.ctaBlock?.buttons?.[0]?.text || "Schedule Consultation"
    }
  };
}

export async function getContactPage() {
  // Try old structure first
  const oldContactPage = await sanityClient.fetch(`*[_type == "contactPage"][0]`);
  if (oldContactPage) return oldContactPage;

  // Fetch modular structure
  const data = await sanityClient.fetch(`{
    "hero": *[_type == "hero" && internalTitle match "Contact*"][0],
    "siteSettings": *[_type == "siteSettings"][0],
    "ctaBlock": *[_type == "ctaBlock" && internalTitle match "*Contact*"][0]
  }`);

  const contact = data.siteSettings?.contact || {};

  return {
    seo: {
      title: "Contact",
      description: "Schedule a consultation with Cindy Romanzo, ICF Certified ADHD Coach"
    },
    hero: {
      heading: data.hero?.heading || "Let's Connect",
      description: data.hero?.description || "Ready to start your coaching journey? I'm here to help."
    },
    contactInfo: {
      heading: "Get in Touch",
      email: {
        icon: "email",
        label: "Email",
        value: contact.email || "hello@mindfulbalanceadhdcoaching.com"
      },
      location: {
        icon: "location",
        label: "Location",
        value: contact.address || "Bergen County, New Jersey"
      },
      hours: {
        icon: "clock",
        label: "Hours",
        regularHours: "Monday - Friday: 9:00 AM - 5:00 PM EST",
        additionalInfo: "Flexible evening hours available"
      }
    },
    schedulingSection: {
      heading: "Schedule a Session",
      options: [
        {
          title: "Free Consultation",
          description: "15-minute discovery call to discuss your needs",
          buttonText: "Schedule Consultation",
          calendlyLink: "mindfulbalance/consultation"
        },
        {
          title: "Office Hours",
          description: "Quick questions or follow-up support",
          buttonText: "Book Office Hours",
          calendlyLink: "mindfulbalance/office-hours"
        }
      ]
    },
    faq: {
      heading: "Frequently Asked Questions",
      questions: []
    },
    ctaSection: {
      heading: data.ctaBlock?.heading || "Ready to Transform Your Challenges?",
      description: data.ctaBlock?.description || "Take the first step towards success",
      buttonText: data.ctaBlock?.buttons?.[0]?.text || "Get Started"
    }
  };
}

export async function getResources() {
  const resources = await sanityClient.fetch(`*[_type == "resource"] | order(publishedAt desc){
    _id,
    title,
    slug,
    category,
    type,
    description,
    publishedAt,
    featured
  }`);
  
  return resources || [];
}

export async function getSiteSettings() {
  const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    navigation,
    footer,
    contact,
    forms,
    buttons,
    errorPages
  }`);
  
  return settings || {
    navigation: [
      { title: 'Home', link: '/' },
      { title: 'About', link: '/about' },
      { title: 'Services', link: '/services' },
      { title: 'Resources', link: '/resources' },
      { title: 'Contact', link: '/contact' }
    ],
    footer: {
      aboutTitle: 'Cindy Romanzo',
      aboutDescription: 'Helping families navigate ADHD and autism with evidence-based coaching strategies.',
      credentials: [
        'ICF Associate Certified Coach (ACC)',
        'Licensed Physical Therapist (MPT)',
        'Certified ADHD Specialist (CAS)'
      ],
      copyrightText: '© 2024 Cindy Romanzo. All rights reserved.'
    },
    contact: {
      email: 'hello@mindfulbalanceadhdcoaching.com',
      location: 'Bergen County, NJ'
    },
    forms: {
      serviceOptions: [
        {value: 'parent-coaching', label: 'Parent Coaching'},
        {value: 'teen-coaching', label: 'Teen Coaching'},
        {value: 'family-consulting', label: 'Family Consulting'},
        {value: 'school-support', label: 'School Support'},
        {value: 'workshops', label: 'Workshops & Training'},
        {value: 'other', label: 'Other'}
      ]
    },
    buttons: {
      scheduleConsultation: 'Schedule Consultation',
      scheduleOfficeHours: 'Schedule Office Hours'
    },
    errorPages: {
      error404: {
        title: '404',
        message: 'Oops! Page not found',
        description: 'The page you are looking for might have been moved or deleted.',
        buttonText: 'Return to Home'
      }
    }
  };
}