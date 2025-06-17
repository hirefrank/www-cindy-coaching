import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Read .env file manually
function loadEnv() {
  try {
    const envFile = fs.readFileSync('.env', 'utf-8')
    const lines = envFile.split('\n')
    const env = {}
    
    lines.forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        env[key.trim()] = valueParts.join('=').trim()
      }
    })
    
    return env
  } catch (error) {
    console.error('Could not read .env file:', error.message)
    return {}
  }
}

const env = loadEnv()

// Initialize Sanity client
const sanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID || 'y67p94j5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: env.SANITY_TOKEN,
  useCdn: false,
})

// Read the existing content from our JSON backup
const contentData = JSON.parse(fs.readFileSync('./website-copy-backup.json', 'utf-8'))

// Group content by page
const contentByPage = {}
contentData.forEach(item => {
  if (!contentByPage[item.page]) {
    contentByPage[item.page] = []
  }
  contentByPage[item.page].push(item)
})

// Helper function - removed since we're using hardcoded values

// Migration data for each page
const migrations = {
  homePage: {
    _id: 'homePage',
    _type: 'homePage',
    seo: {
      title: 'Home',
      description: 'Physical Therapist turned ADHD Coach helping parents and neurodiverse individuals thrive through brain-body strategies',
    },
    hero: {
      heading: 'Physical Therapist turned ADHD Coach helping parents and neurodiverse individuals thrive through brain-body strategies',
      subheading: 'With 25+ years of pediatric PT experience and ICF certification, I bridge the gap between brain science and practical daily strategies for ADHD and executive function challenges.',
      primaryButtonText: 'Schedule Office Hours',
      secondaryButtonText: 'Learn About My Services',
    },
    trustIndicators: [
      { label: 'ICF', title: 'Certified Coach', subtitle: 'ACC Credential' },
      { label: '25+', title: 'Years Experience', subtitle: 'Physical Therapy' },
      { label: 'MPT', title: 'Licensed PT', subtitle: 'Brain-Body Expert' },
      { label: 'CAS', title: 'ADHD Specialist', subtitle: 'Certified' }
    ],
    servicesSection: {
      heading: 'How I Can Help',
      description: 'Combining my physical therapy background with ADHD coaching expertise to provide comprehensive support for individuals and families.',
      services: [
        {
          icon: 'P',
          title: 'For Parents & Families',
          description: 'Supporting parents in understanding and advocating for their neurodiverse children, plus direct coaching for teens and family consulting.',
          linkText: 'Learn More'
        },
        {
          icon: 'A',
          title: 'For Adults',
          description: 'Individual ADHD and executive function coaching for adults looking to develop practical strategies and build sustainable systems.',
          linkText: 'Learn More'
        },
        {
          icon: 'O',
          title: 'For Organizations',
          description: 'Teacher training, classroom support, and presentations for parent groups to build understanding of neurodiverse learners.',
          linkText: 'Learn More'
        }
      ]
    },
    aboutSection: {
      heading: 'My Journey from PT to ADHD Coach',
      paragraphs: [
        'After 25+ years as a pediatric physical therapist specializing in brain-based rehabilitation, I discovered my true calling in ADHD coaching. My personal experience with ADHD, combined with my clinical expertise, gives me a unique perspective on the brain-body connection.',
        'As a mother of triplet teenagers in Bergen County, I understand the daily challenges families face and the importance of practical, sustainable strategies.'
      ],
      buttonText: 'Read My Full Story',
    },
    ctaSection: {
      heading: 'Ready to Start Your Journey?',
      description: 'Schedule a consultation to discuss how brain-body strategies can transform your family\'s approach to ADHD and executive function challenges.',
      primaryButtonText: 'Schedule Consultation',
      secondaryButtonText: 'Schedule Office Hours'
    }
  },
  
  aboutPage: {
    _id: 'aboutPage',
    _type: 'aboutPage',
    seo: {
      title: 'About',
      description: 'Discover how 25+ years of pediatric physical therapy experience led me to become an ICF certified ADHD coach'
    },
    hero: {
      heading: 'My Story: From Physical Therapist to ADHD Coach',
      description: 'Discover how 25+ years of pediatric physical therapy experience led me to become an ICF certified ADHD coach, bridging brain science with practical daily strategies.'
    },
    personalJourney: {
      heading: 'The Personal Journey',
      paragraphs: [
        'My path to ADHD coaching began with my own personal discovery. After years of working with children with neurological differences, I began to recognize patterns in my own life that pointed to ADHD.',
        'This revelation transformed not only my understanding of myself but also my approach to helping others. I realized that my struggles with executive function, organization, and focus weren\'t character flaws—they were neurological differences that could be understood and managed with the right strategies.',
        'As a mother of triplet teenagers, I\'ve experienced firsthand the complexities of parenting while managing ADHD. This personal experience, combined with my professional expertise, gives me a unique perspective on the challenges families face.'
      ]
    },
    professionalEvolution: {
      heading: 'Professional Evolution',
      paragraphs: [
        'My career as a physical therapist began over 25 years ago with a focus on pediatrics and brain-based rehabilitation. I specialized in working with children who had neurological differences, developmental delays, and learning challenges.',
        'Through my work in early intervention and school-based therapy, I developed a deep understanding of how the brain and body work together. I learned that movement, sensory processing, and executive function are all interconnected.',
        'This foundation in understanding the neurological basis of behavior and learning naturally evolved into an interest in ADHD coaching, where I could apply these same principles in a different format.'
      ]
    },
    credentials: {
      heading: 'Credentials & Training',
      description: 'My educational background and ongoing professional development reflect my commitment to providing evidence-based, comprehensive support.',
      certifications: [
        {
          abbreviation: 'ICF',
          title: 'ICF ACC Certification',
          description: 'International Coaching Federation Associate Certified Coach credential, ensuring ethical and professional coaching practices.'
        },
        {
          abbreviation: 'MPT',
          title: 'Master of Physical Therapy',
          description: 'Advanced degree in physical therapy with specialized training in pediatric and neurological rehabilitation.'
        },
        {
          abbreviation: 'CAS',
          title: 'Certified ADHD Specialist',
          description: 'Specialized certification in ADHD coaching methodologies and evidence-based intervention strategies.'
        }
      ],
      continuingEducation: {
        heading: 'Continuing Education & Training',
        items: [
          '• Advanced ADHD Coaching Certification',
          '• Executive Function Coaching Training',
          '• Mindfulness-Based Interventions',
          '• Trauma-Informed Coaching Practices',
          '• Sensory Processing and ADHD',
          '• Parent Coaching Methodologies',
          '• Adolescent Development and ADHD',
          '• Workplace Accommodations Training'
        ]
      }
    },
    approach: {
      heading: 'My Approach & Philosophy',
      description: 'My coaching philosophy is grounded in the understanding that ADHD is not a disorder to be fixed, but a neurological difference to be understood and supported.',
      principles: [
        {
          title: 'Brain-Body Connection',
          description: 'My physical therapy background gives me a unique perspective on how movement, sensory processing, and cognitive function are interconnected. I incorporate body-based strategies alongside traditional coaching techniques.'
        },
        {
          title: 'Collaborative Partnership',
          description: 'I believe in working with clients as partners in their journey. You are the expert on your own life, and I bring knowledge, strategies, and support to help you achieve your goals.'
        },
        {
          title: 'Practical, Sustainable Strategies',
          description: 'Every strategy I recommend is designed to be practical and sustainable. I focus on small changes that can make a big difference in daily life, rather than overwhelming transformations.'
        },
        {
          title: 'Strength-Based Approach',
          description: 'I help clients identify and leverage their unique strengths while developing strategies to manage challenges. ADHD comes with many gifts, and I believe in celebrating those while building skills.'
        }
      ]
    },
    personal: {
      heading: 'Beyond the Professional',
      description: 'When I\'m not coaching, you\'ll find me enjoying life in Bergen County with my family. As a mother of triplet teenagers, I understand the beautiful chaos of family life and the importance of finding balance.',
      interests: [
        { emoji: '📚', label: 'Reading' },
        { emoji: '🧘', label: 'Yoga' },
        { emoji: '💪', label: 'Fitness' },
        { emoji: '✈️', label: 'Travel' }
      ],
      conclusion: 'These personal experiences and interests inform my coaching approach, helping me understand the real-world challenges my clients face and the importance of self-care in the journey toward growth and success.'
    },
    ctaSection: {
      heading: 'Ready to Work Together?',
      description: 'I\'d love to learn more about your unique situation and discuss how my brain-body approach to ADHD coaching might support your goals.',
      primaryButtonText: 'Schedule Consultation',
      secondaryButtonText: 'Learn About My Services'
    }
  },
  
  servicesPage: {
    _id: 'servicesPage',
    _type: 'servicesPage',
    seo: {
      title: 'Services - Cindy Coaching',
      description: 'Comprehensive ADHD coaching services for parents, families, adults, and organizations.'
    },
    hero: {
      heading: 'Comprehensive ADHD Coaching Services',
      description: 'Personalized support that bridges brain science with practical daily strategies for lasting change.'
    },
    serviceCategories: [
      {
        categoryTitle: 'For Parents & Families',
        services: [
          {
            icon: 'P',
            title: 'Parent Coaching',
            description: 'Empowering parents with strategies and support to help their neurodiverse children thrive.',
            features: [
              '• Understanding your child\'s unique brain',
              '• Developing effective communication strategies',
              '• Creating supportive home environments',
              '• School advocacy and IEP support'
            ],
            format: 'Ongoing coaching relationships'
          },
          {
            icon: 'T',
            title: 'Individual Coaching for Teens',
            description: 'Direct support for teenagers navigating ADHD and executive function challenges.',
            features: [
              '• Time management and organization',
              '• Social skills and peer relationships',
              '• College and career preparation'
            ],
            format: 'Weekly sessions'
          },
          {
            icon: 'F',
            title: 'Family Consulting',
            description: 'Comprehensive support for the whole family system.',
            features: [
              '• Family system assessment',
              '• Sibling relationship support',
              '• Communication training',
              '• Crisis intervention and planning'
            ],
            format: 'Project-based or ongoing'
          }
        ]
      },
      {
        categoryTitle: 'For Adults',
        services: [
          {
            icon: 'A',
            title: 'Individual ADHD/Executive Function Coaching',
            description: 'Personalized coaching for adults seeking to understand and work with their ADHD brain.',
            features: [
              'Workplace productivity and organization systems',
              'Time management and priority setting',
              'Emotional regulation and stress management',
              'Relationship and communication skills',
              'Goal setting and achievement strategies',
              'Building sustainable daily routines'
            ],
            format: 'Weekly or bi-weekly sessions, 45-60 minutes each'
          }
        ]
      },
      {
        categoryTitle: 'For Organizations & Professionals',
        services: [
          {
            icon: 'T',
            title: 'Teacher Training & Classroom Support',
            description: 'Professional development for educators working with neurodiverse students.',
            features: [
              '• Understanding ADHD in the classroom',
              '• Sensory and movement strategies',
              '• Behavior intervention planning'
            ],
            format: 'Workshops, presentations, ongoing consultation'
          },
          {
            icon: 'P',
            title: 'Presentations for Parent Advisory Groups',
            description: 'Educational presentations for parent organizations and school groups.',
            features: [
              '• ADHD myths and realities',
              '• Home-school collaboration',
              '• IEP and 504 plan guidance',
              '• Building resilience in children'
            ],
            format: '1-2 hour presentations with Q&A'
          },
          {
            icon: 'O',
            title: 'Professional Networking (Office Hours)',
            description: 'Open consultation time for professionals and potential collaborators.',
            features: [
              '• Professional consultation',
              '• Resource sharing',
              '• Referral discussions',
              '• Introductory conversations'
            ],
            format: '15-30 minute informal sessions'
          }
        ]
      }
    ],
    ctaSection: {
      heading: 'Ready to Get Started?',
      description: 'Schedule a consultation to discuss which service best meets your needs.',
      buttonText: 'Schedule Consultation'
    }
  },
  
  contactPage: {
    _id: 'contactPage',
    _type: 'contactPage',
    seo: {
      title: 'Contact - Cindy Romanzo Coaching',
      description: 'Get in touch to schedule a consultation or learn more about ADHD coaching services.'
    },
    hero: {
      heading: 'Let\'s Connect',
      description: 'Ready to explore how brain-body ADHD coaching can support you or your family? I\'d love to hear from you.'
    },
    contactInfo: {
      heading: 'Get in Touch',
      email: {
        icon: '📧',
        label: 'Email',
        value: 'cindy@mindfulbalanceadhdcoaching.com'
      },
      location: {
        icon: '📍',
        label: 'Location',
        value: 'Bergen County, New Jersey'
      },
      hours: {
        icon: '⏰',
        label: 'Office Hours',
        regularHours: 'Monday - Friday: 9:00 AM - 5:00 PM',
        additionalInfo: 'Evening and weekend sessions available by appointment'
      }
    },
    schedulingSection: {
      heading: 'Quick Scheduling Options',
      options: [
        {
          title: 'Initial Consultation',
          description: 'A 30-minute discovery call to discuss your needs and how I can help.',
          buttonText: 'Schedule Consultation',
          calendlyLink: 'cindy-romanzo/consultation'
        },
        {
          title: 'Office Hours',
          description: 'Quick 15-minute informal chat for professionals or general questions.',
          buttonText: 'Book Office Hours',
          calendlyLink: 'cindy-romanzo/office-hours'
        }
      ]
    },
    faq: {
      heading: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What makes your approach different?',
          answer: 'My unique combination of 25+ years as a pediatric physical therapist and ICF-certified ADHD coach allows me to address both the brain and body aspects of ADHD. I understand the neurological basis of executive function challenges and provide practical, science-based strategies.'
        },
        {
          question: 'Do you work with clients virtually or in-person?',
          answer: 'I offer both virtual and in-person sessions. Virtual sessions provide flexibility and convenience, while in-person sessions are available for clients in the Bergen County, NJ area. Both formats are equally effective.'
        },
        {
          question: 'How long does coaching typically last?',
          answer: 'Coaching duration varies based on individual needs and goals. Some clients benefit from short-term support (3-6 months) for specific challenges, while others prefer ongoing support. We\'ll discuss your needs during the initial consultation.'
        },
        {
          question: 'Do you accept insurance?',
          answer: 'ADHD coaching is typically not covered by insurance. However, I can provide documentation for HSA/FSA reimbursement. I also offer sliding scale rates on a limited basis. Let\'s discuss payment options during our consultation.'
        }
      ]
    },
    ctaSection: {
      heading: 'Ready to Take the Next Step?',
      description: 'Don\'t wait to get the support you deserve. Schedule your consultation today and let\'s explore how brain-body strategies can transform your approach to ADHD.',
      buttonText: 'Schedule Your Consultation'
    }
  },
  
  resourcesPage: {
    _id: 'resourcesPage',
    _type: 'resourcesPage',
    seo: {
      title: 'Resources',
      description: 'Evidence-based strategies, practical tips, and insights for parents, educators, and individuals navigating ADHD'
    },
    hero: {
      heading: 'Resources & Insights',
      description: 'Evidence-based strategies, practical tips, and insights for parents, educators, and individuals navigating ADHD and executive function challenges.'
    },
    newsletter: {
      heading: 'Stay Updated',
      description: 'Get monthly insights on ADHD strategies, brain-body connections, and practical tips delivered to your inbox.',
      placeholder: 'Your email address',
      buttonText: 'Subscribe'
    },
    categoriesSection: {
      heading: 'Browse by Category'
    },
    ctaSection: {
      heading: 'Ready for Personalized Support?',
      description: 'While these resources provide valuable information, nothing replaces personalized coaching tailored to your unique situation.',
      buttonText: 'Schedule a Consultation'
    }
  }
}

// Function to upload documents to Sanity
async function migrateContent() {
  console.log('🚀 Starting content migration to Sanity...\n')
  
  const results = []
  
  for (const [key, document] of Object.entries(migrations)) {
    try {
      console.log(`📝 Migrating ${key}...`)
      
      // Create or update the document
      const result = await sanityClient.createOrReplace(document)
      results.push({ success: true, document: key, id: result._id })
      
      console.log(`✅ Successfully migrated ${key}\n`)
    } catch (error) {
      console.error(`❌ Error migrating ${key}:`, error.message)
      results.push({ success: false, document: key, error: error.message })
    }
  }
  
  // Summary
  console.log('\n📊 Migration Summary:')
  console.log(`✅ Successful: ${results.filter(r => r.success).length}`)
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`)
  
  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed migrations:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.document}: ${r.error}`)
    })
  }
  
  console.log('\n✨ Migration complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Create a Sanity project at https://www.sanity.io/manage')
  console.log('2. Get your project ID and add it to your .env file as PUBLIC_SANITY_PROJECT_ID')
  console.log('3. Create an API token with write access and add it as SANITY_TOKEN')
  console.log('4. Run this script again with the proper credentials')
  console.log('5. Install and run Sanity Studio: cd sanity && npm install && npm run dev')
}

// Run the migration
migrateContent()