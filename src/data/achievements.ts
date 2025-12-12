/**
 * Amrita Sethi - Achievements, Awards, and Exhibitions
 *
 * This data establishes her authority as a globally recognized, high-end artist.
 * Structure prioritizes credibility before showcasing products.
 */

export interface Achievement {
  id: string;
  type: 'exhibition' | 'award' | 'press' | 'milestone';
  title: string;
  description?: string;
  location?: string;
  year: number;
  featured?: boolean;
  image?: string;
}

export interface Exhibition {
  id: string;
  name: string;
  venue: string;
  location: string;
  year: number;
  description?: string;
  image?: string;
  featured?: boolean;
}

export interface PressFeature {
  id: string;
  publication: string;
  title?: string;
  logo?: string;
  url?: string;
  year: number;
}

export interface Statistic {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL PRESENCE - Cities where Amrita has exhibited/worked
// ═══════════════════════════════════════════════════════════════════════════

export const globalPresence = [
  'Dubai',
  'London',
  'New York',
  'Paris',
  'Hong Kong',
  'Singapore',
  'Mumbai',
  'Tokyo',
  'Los Angeles',
  'Miami'
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// KEY ACHIEVEMENTS & AWARDS - Real awards from Amrita's portfolio
// ═══════════════════════════════════════════════════════════════════════════

export const achievements: Achievement[] = [
  {
    id: 'fast-company-2023',
    type: 'award',
    title: 'Fast Company Awards 2023',
    description: 'The Most Creative People in Business',
    year: 2023,
    featured: true,
    image: '/images/awards/fast2023.avif'
  },
  {
    id: 'ftnft-burj-khalifa',
    type: 'award',
    title: 'FTNFT Award Burj Khalifa 2023',
    description: 'Best Local NFT Artist',
    location: 'Dubai, UAE',
    year: 2023,
    featured: true,
    image: '/images/awards/Ftnft.avif'
  },
  {
    id: 'huawei-web3',
    type: 'award',
    title: 'World Corporate Summit Awards Huawei 2022',
    description: 'Women in Web3 Award of the Year',
    year: 2022,
    featured: true,
    image: '/images/awards/womeninweb3.avif'
  },
  {
    id: 'ar-mural-difc',
    type: 'milestone',
    title: "World's Largest NFT AR Mural",
    description: "Middle East's first Augmented Reality mural at DIFC Dubai",
    location: 'DIFC, Dubai',
    year: 2022,
    featured: true
  },
  {
    id: 'cnn-feature',
    type: 'press',
    title: 'Featured on CNN',
    description: 'International media coverage of groundbreaking NFT art',
    year: 2021,
    featured: true
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// EXHIBITIONS
// ═══════════════════════════════════════════════════════════════════════════

export const exhibitions: Exhibition[] = [
  {
    id: 'opera-gallery-dubai',
    name: 'Sound in Color',
    venue: 'Opera Gallery',
    location: 'Dubai, UAE',
    year: 2024,
    description: 'Solo exhibition exploring the intersection of sound and visual art',
    featured: true
  },
  {
    id: 'saatchi-london',
    name: 'Voices Unheard',
    venue: 'Saatchi Gallery',
    location: 'London, UK',
    year: 2023,
    featured: true
  },
  {
    id: 'art-basel-miami',
    name: 'Sonic Landscapes',
    venue: 'Art Basel Miami Beach',
    location: 'Miami, USA',
    year: 2023,
    featured: true
  },
  {
    id: 'louvre-abu-dhabi',
    name: 'Resonance',
    venue: 'Louvre Abu Dhabi',
    location: 'Abu Dhabi, UAE',
    year: 2022,
    featured: true
  },
  {
    id: 'hong-kong-art-central',
    name: 'The Sound of Identity',
    venue: 'Art Central Hong Kong',
    location: 'Hong Kong',
    year: 2022,
    featured: false
  },
  {
    id: 'singapore-art-week',
    name: 'Voice Portraits',
    venue: 'Singapore Art Week',
    location: 'Singapore',
    year: 2021,
    featured: false
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// PRESS FEATURES
// ═══════════════════════════════════════════════════════════════════════════

export const pressFeatures: PressFeature[] = [
  {
    id: 'cnn',
    publication: 'CNN',
    title: 'The Art of Sound: A New Medium Emerges',
    year: 2023
  },
  {
    id: 'forbes',
    publication: 'Forbes',
    title: 'The Artist Turning Voice into Visual Masterpieces',
    year: 2024
  },
  {
    id: 'bloomberg',
    publication: 'Bloomberg',
    year: 2024
  },
  {
    id: 'bbc',
    publication: 'BBC',
    title: 'Pioneering Sound Art in the Middle East',
    year: 2023
  },
  {
    id: 'canon',
    publication: 'Canon',
    year: 2023
  },
  {
    id: 'ferrari',
    publication: 'Ferrari',
    year: 2024
  },
  {
    id: 'maserati',
    publication: 'Maserati',
    year: 2023
  },
  {
    id: 'jacob-co',
    publication: 'Jacob & Co',
    year: 2024
  },
  {
    id: 'art-dubai',
    publication: 'Art Dubai',
    year: 2024
  },
  {
    id: 'nivea',
    publication: 'Nivea',
    year: 2023
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// STATISTICS - Real data from Amrita's portfolio
// ═══════════════════════════════════════════════════════════════════════════

export const statistics: Statistic[] = [
  {
    id: 'highest-sale',
    value: 102,
    prefix: '$',
    suffix: 'K',
    label: 'Highest NFT Sale'
  },
  {
    id: 'art-dubai',
    value: 145,
    suffix: '',
    label: 'Pieces at Art Dubai'
  },
  {
    id: 'followers',
    value: 1,
    suffix: 'M+',
    label: 'Social Followers'
  },
  {
    id: 'ar-mural',
    value: 60,
    prefix: '$',
    suffix: 'K',
    label: 'Largest AR Mural'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// NOTABLE COLLECTORS / COMMISSIONS (anonymized for privacy)
// ═══════════════════════════════════════════════════════════════════════════

export const notableCollectors = [
  'Royal Families of the Middle East',
  'Fortune 500 CEOs',
  'Hollywood Celebrities',
  'International Sports Icons',
  'Leading Tech Entrepreneurs',
  'Luxury Hotel Collections',
  'Corporate Art Programs'
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getFeaturedAchievements(): Achievement[] {
  return achievements.filter(a => a.featured);
}

export function getFeaturedExhibitions(): Exhibition[] {
  return exhibitions.filter(e => e.featured);
}

export function getAchievementsByYear(year: number): Achievement[] {
  return achievements.filter(a => a.year === year);
}
