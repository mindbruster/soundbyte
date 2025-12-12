/**
 * Global Constants
 *
 * Central location for all magic numbers, breakpoints, and configuration values.
 */

/**
 * Responsive breakpoints (Tailwind CSS aligned)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

/**
 * Z-index layers for consistent stacking
 */
export const Z_LAYERS = {
  base: 0,
  content: 10,
  overlay: 20,
  modal: 30,
  tooltip: 40,
  navigation: 50,
  cursor: 100
} as const;

/**
 * Animation timing constants
 */
export const ANIMATION = {
  /** Frame rate target (60fps) */
  FPS: 60,
  /** Frame duration in ms */
  FRAME_MS: 1000 / 60,
  /** Maximum delta time cap (prevents huge jumps) */
  MAX_DELTA: 0.1,
  /** Scroll smoothing factor */
  SCROLL_SMOOTHING: 0.1
} as const;

/**
 * Audio visualization constants
 */
export const AUDIO = {
  /** FFT size for frequency analysis */
  FFT_SIZE: 256,
  /** Number of frequency bins */
  FREQUENCY_BINS: 128,
  /** Smoothing for audio analyzer */
  SMOOTHING: 0.8
} as const;

/**
 * Three.js scene configuration
 */
export const THREE_CONFIG = {
  /** Field of view */
  FOV: 60,
  /** Near clipping plane */
  NEAR: 0.1,
  /** Far clipping plane */
  FAR: 1000,
  /** Default camera position */
  CAMERA_POSITION: [0, 0, 12] as const,
  /** Pixel ratio cap for performance */
  MAX_PIXEL_RATIO: 2
} as const;

/**
 * Brand colors (matching Tailwind config)
 */
export const COLORS = {
  gold: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#d4a853', // Primary gold
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12'
  },
  luxury: {
    black: '#0a0a0a',
    charcoal: '#1a1a1a',
    slate: '#2a2a2a'
  }
} as const;

/**
 * Typography scale
 */
export const TYPOGRAPHY = {
  displayFont: 'Playfair Display, serif',
  bodyFont: 'Inter, sans-serif'
} as const;

/**
 * Scroll section configuration
 */
export const SECTIONS = {
  hero: 'hero',
  legacy: 'legacy',
  portfolio: 'portfolio',
  soundbyte: 'soundbyte',
  sonicIdentity: 'sonic-identity',
  commission: 'commission',
  footer: 'footer'
} as const;

/**
 * Price anchoring for SoundBYTE Originals
 * Note: High-end art sites don't show price lists — but they anchor expectations
 */
export const PRICING = {
  min: 3500,
  max: 50000,
  currency: 'USD',
  displayText: '$3,500 to $15,000+',
  anchorText: 'Custom SoundBYTE® Originals typically range from $3,500 to $15,000+, depending on size and complexity.'
} as const;

/**
 * SoundBYTE Size Options (for commission questionnaire)
 */
export const SOUNDBYTE_SIZES = [
  { name: 'Small', unframed: '44 × 35 cm', framed: '49 × 40 cm', priceRange: '$3,500 – $5,000' },
  { name: 'Medium', unframed: '64 × 51 cm', framed: '69 × 56 cm', priceRange: '$6,500 – $9,000' },
  { name: 'Large', unframed: '92 × 73 cm', framed: '97 × 78 cm', priceRange: '$10,000 – $15,000' },
  { name: 'Ultra-Large', unframed: '120+ cm', framed: 'Custom', priceRange: '$18,000 – $50,000+' },
] as const;

/**
 * Sonic Identity Pricing Tiers
 */
export const SONIC_IDENTITY_PRICING = {
  digital: { min: 49, max: 199, label: 'Digital Only' },
  smallPrint: { min: 99, max: 299, label: 'Small Prints' },
  mediumPrint: { min: 249, max: 799, label: 'Medium Prints' },
  largePrint: { min: 499, max: 1400, label: 'Large Prints' },
  luxuryAluminium: { max: 3500, label: 'Luxury Aluminium Framed' }
} as const;
