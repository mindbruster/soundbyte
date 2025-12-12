/**
 * Amrita Sethi - Artwork Collection
 *
 * Portfolio data for the gallery showcase.
 * Each artwork represents a unique translation of sound into visual art.
 */

export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions?: string;
  description: string;
  story?: string;
  collection?: 'soundbyte' | 'sonic-identity' | 'traditional' | 'collaboration';
  image?: string;
  thumbnail?: string;
  video?: string;
  featured?: boolean;
  sold?: boolean;
  priceRange?: string;
}

export interface ArtworkCategory {
  id: string;
  name: string;
  description: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ARTWORK CATEGORIES
// ═══════════════════════════════════════════════════════════════════════════

export const categories: ArtworkCategory[] = [
  {
    id: 'soundbyte',
    name: 'SoundBYTE Originals',
    description: 'Large-scale commissioned pieces that transform voice into timeless art'
  },
  {
    id: 'sonic-identity',
    name: 'Sonic Identity',
    description: 'Personal sound portraits capturing unique vocal signatures'
  },
  {
    id: 'traditional',
    name: 'Traditional Works',
    description: 'Original paintings and mixed media explorations'
  },
  {
    id: 'collaboration',
    name: 'Collaborations',
    description: 'Special projects with brands and institutions'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// ARTWORKS
// ═══════════════════════════════════════════════════════════════════════════

export const artworks: Artwork[] = [
  // Signature Works - Real portfolio pieces
  {
    id: 'ar-mural',
    title: "World's Largest NFT AR Mural",
    year: 2022,
    medium: 'Augmented Reality NFT Installation',
    dimensions: 'Large-scale public installation',
    description: "Middle East's first Augmented Reality mural — a groundbreaking fusion of physical and digital art featuring crypto, NFT, and Dubai culture",
    story: 'Located in DIFC Dubai, this pioneering installation merges street art with blockchain technology. Features MetaMask fox, Bitcoin, Ethereum, Doge, and Dubai skyline.',
    collection: 'collaboration',
    featured: true,
    sold: true,
    priceRange: '$60,000',
    image: '/images/artworks/wall.avif',
    video: 'https://framerusercontent.com/assets/2wa141dtxJwsjwimJAviGGxg.mp4'
  },
  {
    id: 'wtnft',
    title: 'WTNFT!?',
    year: 2021,
    medium: 'Digital NFT Artwork',
    description: 'Record-breaking NFT sale — the highest by a UAE-based artist',
    story: 'Featured on CNN, this piece shattered records and put Dubai on the NFT art map.',
    collection: 'soundbyte',
    featured: true,
    sold: true,
    priceRange: '$102,000'
  },
  {
    id: 'alphabytes',
    title: 'AlphaBYTEs',
    year: 2022,
    medium: 'Physical-digital sculptures',
    dimensions: '145 Sculptures',
    description: 'Sold-out collection of physical-digital sculptures merging typography and sound',
    story: 'Showcased at Art Dubai 2022, this collection bridged the gap between traditional sculpture and digital art.',
    collection: 'soundbyte',
    featured: true,
    sold: true,
    priceRange: 'Sold Out'
  },

  // AR SoundBYTE Collection - City Series
  {
    id: 'ar-delhi',
    title: 'Delhi AR SoundBYTE',
    year: 2023,
    medium: 'Augmented Reality SoundBYTE',
    description: 'A sonic portrait of Delhi featuring iconic landmarks transformed into sound wave art — Taj Mahal, India Gate, Lotus Temple, and more',
    story: 'Each element represents the soul of Delhi, from ancient monuments to modern culture, unified in a sound wave composition.',
    collection: 'sonic-identity',
    featured: true,
    image: '/images/artworks/delhi.avif'
  },
  {
    id: 'ar-dubai-colour',
    title: 'Dubai Colour AR SoundBYTE',
    year: 2023,
    medium: 'Augmented Reality SoundBYTE',
    description: 'Celebrating UAE\'s 50th anniversary — Burj Khalifa, Museum of the Future, and Dubai skyline in sound wave form',
    story: 'A tribute to Dubai\'s transformation from desert to global metropolis, featuring falcons, camels, and modern architecture.',
    collection: 'sonic-identity',
    featured: true,
    image: '/images/artworks/dubai.avif',
    video: 'https://framerusercontent.com/assets/2wa141dtxJwsjwimJAviGGxg.mp4'
  },
  {
    id: 'ar-eid',
    title: 'Eid AR SoundBYTE',
    year: 2023,
    medium: 'Augmented Reality SoundBYTE',
    description: 'A celebration of Eid featuring traditional Islamic patterns and cultural symbols in sound wave form',
    story: 'Capturing the spirit of Eid through visual art, blending tradition with modern technology.',
    collection: 'sonic-identity',
    featured: true,
    image: '/images/artworks/Eyd.avif'
  },
  {
    id: 'ar-valentines',
    title: "Valentine's Day AR SoundBYTE",
    year: 2024,
    medium: 'Augmented Reality SoundBYTE',
    description: 'Love expressed in sound waves — hearts, doves, and romantic symbols in red and black',
    story: 'A celebration of love transformed into visual art, perfect for couples to capture their voices together.',
    collection: 'sonic-identity',
    featured: true,
    image: "/images/artworks/valentine's day.avif"
  },

  // SoundBYTE Originals
  {
    id: 'soundbyte-original-1',
    title: 'Voice Immortalized I',
    year: 2024,
    medium: 'Mixed media on canvas with gold leaf',
    dimensions: '180 x 120 cm',
    description: 'Bespoke museum-grade artwork transforming voice into timeless masterpiece',
    collection: 'soundbyte',
    featured: true,
    sold: false,
    priceRange: '$3,500 - $15,000+'
  },

  // Collaborations with brands
  {
    id: 'ferrari-collab',
    title: 'Ferrari Collaboration',
    year: 2024,
    medium: 'Exclusive commissioned artwork',
    description: 'Blue-chip partnership bringing sound art to automotive excellence',
    collection: 'collaboration',
    featured: true,
    sold: true
  },
  {
    id: 'jacob-co-collab',
    title: 'Jacob & Co Partnership',
    year: 2024,
    medium: 'Luxury brand collaboration',
    description: 'Where sound art meets haute horlogerie',
    collection: 'collaboration',
    featured: false,
    sold: true
  },
  {
    id: 'canon-collab',
    title: 'Canon Creative Project',
    year: 2023,
    medium: 'Technology meets art',
    description: 'Collaboration showcasing the intersection of imaging technology and sound visualization',
    collection: 'collaboration',
    featured: false,
    sold: true
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter(a => a.featured);
}

export function getArtworksByCollection(collection: Artwork['collection']): Artwork[] {
  return artworks.filter(a => a.collection === collection);
}

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find(a => a.id === id);
}

export function getSoundByteOriginals(): Artwork[] {
  return artworks.filter(a => a.collection === 'soundbyte');
}

export function getSonicIdentityWorks(): Artwork[] {
  return artworks.filter(a => a.collection === 'sonic-identity');
}
