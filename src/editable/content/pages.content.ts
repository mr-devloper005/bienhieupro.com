import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Professional articles, business listings, and expert profiles for Southeast Asia',
      description: 'Discover curated business insights, company listings, and professional profiles across Southeast Asia\'s growing ecosystem.',
      openGraphTitle: 'Professional knowledge and connections for Southeast Asia',
      openGraphDescription: 'Your trusted source for business articles, company listings, and expert profiles in Southeast Asia.',
      keywords: ['Southeast Asia business', 'professional articles', 'business listings', 'SEA startups', 'professional profiles'],
    },
    hero: {
      badge: 'Southeast Asia\'s Professional Platform',
      title: ['Connect with Southeast Asia\'s', 'professional business ecosystem.'],
      description: 'Discover curated articles, business listings, and expert profiles from across Southeast Asia\'s dynamic professional community.',
      primaryCta: { label: 'Read latest articles', href: '/article' },
      secondaryCta: { label: 'Browse listings', href: '/listing' },
      searchPlaceholder: 'Search articles, listings, profiles and more',
      quickActions: [
        { label: 'Read Articles', href: '/article' },
        { label: 'Business Listings', href: '/listing' },
        { label: 'Pro Profiles', href: '/profile' },
        { label: 'Premium Content', href: '/article' },
        { label: 'Explore Posts', href: '/search' },
        { label: 'Browse Business', href: '/listing' },
        { label: 'Submit Article', href: '/create' },
        { label: 'Work With Us', href: '/contact' },
      ],
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for professionals across Southeast Asia.',
      paragraphs: [
        'This platform brings together business articles, company listings, and professional profiles from across Southeast Asia so entrepreneurs and professionals can connect, learn, and grow.',
        'From startup news to established enterprise listings, our curated content helps you stay informed about the region\'s dynamic business landscape.',
        'Whether you\'re looking for industry insights, business partners, or investment opportunities, you\'ll find it here.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Curated articles from industry professionals across Southeast Asia.',
        'Comprehensive business listings and company profiles.',
        'Expert author profiles and professional networking.',
        'Fast, searchable, and mobile-friendly browsing experience.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See listings', href: '/listing' },
    },
    cta: {
      badge: 'Join the community',
      title: 'Share your expertise with Southeast Asia\'s professional community.',
      description: 'Publish articles, list your business, and connect with thousands of professionals across the region.',
      primaryCta: { label: 'Get Started', href: '/create' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'Southeast Asia\'s professional knowledge platform.',
    description: `${slot4BrandConfig.siteName} is built to connect professionals, entrepreneurs, and businesses across Southeast Asia through curated articles, listings, and expert profiles.`,
    paragraphs: [
      'We believe in the power of shared knowledge. By bringing together business insights, company information, and professional expertise in one place, we help Southeast Asia\'s community grow together.',
      'Our platform makes it easy to discover relevant content, find business partners, and stay informed about the region\'s most dynamic industries — from fintech and e-commerce to manufacturing and services.',
    ],
    values: [
      {
        title: 'Professional-first content',
        description: 'Every article, listing, and profile is curated for relevance, accuracy, and professional value for our Southeast Asian readership.',
      },
      {
        title: 'Connected ecosystem',
        description: 'Articles, business listings, and professional profiles stay connected so discovery feels natural and every visit yields new insights.',
      },
      {
        title: 'Built for growth',
        description: 'We focus on clean navigation and high-quality content to help professionals and businesses reach their full potential in Southeast Asia.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Get in touch with our team.',
    description: 'Tell us how we can help — whether you\'re looking to publish content, list your business, or partner with us. We\'ll connect you with the right team.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search articles, business listings, profiles, and content across Southeast Asia\'s professional platform.',
    },
    hero: {
      badge: 'Search the platform',
      title: 'Find articles, listings, and profiles faster.',
      description: 'Use keywords, categories, and content types to discover professional content from every active section of the platform.',
      placeholder: 'Search by keyword, topic, category, or company name',
    },
    resultsTitle: 'Latest professional content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Publish new content on the professional platform.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to publish new content.',
      description: 'Use your account to access the publishing workspace and create articles, listings, and profiles for our professional community.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Share your expertise with the community.',
      description: 'Choose the content type, add your details, and publish professional articles, business listings, and more.',
    },
    formTitle: 'Content details',
    submitLabel: 'Publish content',
    successTitle: 'Content published successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to your professional account.',
      badge: 'Member access',
      title: 'Welcome back to your professional workspace.',
      description: 'Login to continue reading, managing your listings, and publishing new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your professional account.',
      badge: 'Join the community',
      title: 'Create your account and start publishing.',
      description: 'Join Southeast Asia\'s professional platform to read premium content, publish articles, and connect with the business community.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
