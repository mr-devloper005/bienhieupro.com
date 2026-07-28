import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Professional Articles',
    headline: 'Business insights, industry analysis, and expert knowledge for Southeast Asia.',
    description: 'Explore in-depth articles, professional guides, market analysis, and thought leadership content curated for Southeast Asia\'s business community.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Stay informed with the latest professional insights from industry experts across the region.',
    chips: ['Industry insights', 'Business guides', 'Market analysis', 'Expert knowledge'],
  },
  classified: {
    eyebrow: 'Classified Listings',
    headline: 'Business opportunities, services, and professional classifieds.',
    description: 'Find and post classified listings for business services, job opportunities, equipment, and professional offerings across Southeast Asia.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Connect with buyers, sellers, and service providers directly through professional classifieds.',
    chips: ['Services', 'Opportunities', 'Partnerships', 'Professional ads'],
  },
  sbm: {
    eyebrow: 'Curated Resources',
    headline: 'Bookmarked tools, guides, and professional resources.',
    description: 'A curated collection of the best professional tools, references, and business resources for Southeast Asian entrepreneurs and professionals.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Save time with our hand-picked collection of essential professional resources.',
    chips: ['Tools', 'References', 'Guides', 'Resources'],
  },
  profile: {
    eyebrow: 'Professional Profiles',
    headline: 'Connect with experts, leaders, and businesses across Southeast Asia.',
    description: 'Discover verified professional profiles, industry experts, and business leaders from across Southeast Asia\'s thriving business ecosystem.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Build meaningful professional connections with Southeast Asia\'s most influential leaders.',
    chips: ['Experts', 'Leaders', 'Businesses', 'Entrepreneurs'],
  },
  pdf: {
    eyebrow: 'Document Library',
    headline: 'Professional reports, whitepapers, and business guides.',
    description: 'Download authoritative business reports, market research, industry whitepapers, and professional reference materials for Southeast Asian markets.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Access the knowledge you need with our growing library of professional documents.',
    chips: ['Reports', 'Whitepapers', 'Guides', 'Research'],
  },
  listing: {
    eyebrow: 'Business Directory',
    headline: 'Discover and connect with businesses across Southeast Asia.',
    description: 'Browse our comprehensive directory of verified businesses, service providers, and companies operating across Southeast Asia\'s key markets.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Find trusted business partners with detailed profiles, locations, and direct contact information.',
    chips: ['Companies', 'Services', 'Partners', 'Directory'],
  },
  image: {
    eyebrow: 'Visual Gallery',
    headline: 'Professional photography, infographics, and business visuals.',
    description: 'Explore a curated gallery of professional images, business infographics, and visual content from across Southeast Asia.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Discover compelling visual stories and professional photography from the region.',
    chips: ['Photography', 'Infographics', 'Business visuals', 'Gallery'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
