import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: 'Professional insights for Southeast Asia',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Knowledge. Connections. Growth.',
    announcement: 'Expand your professional reach in Southeast Asia. Discover curated articles, business listings, and expert profiles.',
    announcementCta: 'Explore now →',
    announcementHref: '/article',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Listings', href: '/listing' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Sign Up', href: '/signup' },
      secondary: { label: 'Login', href: '/login' },
    },
  },
  footer: {
    tagline: 'Professional insights for Southeast Asia',
    description: 'Your trusted source for business intelligence, professional articles, company listings, and expert profiles across Southeast Asia.',
    columns: [
      {
        title: 'About',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Advertise With Us', href: '/contact' },
          { label: 'Privacy Policy', href: '/about' },
          { label: 'Terms', href: '/about' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Articles', href: '/article' },
          { label: 'Listings', href: '/listing' },
          { label: 'Profiles', href: '/profile' },
          { label: 'Search', href: '/search' },
        ],
      },
    ],
    bottomNote: 'Built for Southeast Asia\'s professional business community.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
