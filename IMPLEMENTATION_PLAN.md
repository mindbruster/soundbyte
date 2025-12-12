# Amrita Sethi Portfolio - Implementation Plan

## Architecture Overview

### Hierarchy Flow (Authority-First Positioning)
```
1. AUTHORITY → Who is Amrita Sethi (Global recognition)
2. LEGACY → Achievements, Exhibitions, Awards
3. PORTFOLIO → The Art Collection
4. PRODUCT → SoundBYTE Originals (High-end art piece, NOT a tool)
5. ACCESS → Sonic Identity (Interactive experience)
6. COMMISSION → Premium questionnaire flow
```

---

## Technical Architecture (SOLID & DRY Principles)

### Directory Structure
```
src/
├── components/
│   ├── animations/           # Reusable animation components
│   │   ├── SoundWaveCanvas.tsx (existing)
│   │   ├── ScrollReveal.tsx    # GSAP scroll-triggered reveals
│   │   ├── MorphingShape.tsx   # Three.js morphing geometries
│   │   ├── ParallaxLayer.tsx   # Physics-based parallax
│   │   ├── MagneticElement.tsx # Cursor-following magnetic effect
│   │   └── FluidCursor.tsx     # Custom cursor with trails
│   │
│   ├── sections/             # Page sections (scrollytelling)
│   │   ├── HeroSection.tsx     # Authority introduction
│   │   ├── LegacySection.tsx   # Achievements, awards, exhibitions
│   │   ├── PortfolioSection.tsx # Gallery showcase
│   │   ├── SoundByteSection.tsx # SoundBYTE Originals presentation
│   │   ├── SonicIdentitySection.tsx # Interactive playground
│   │   ├── CommissionSection.tsx # Commission CTA + questionnaire
│   │   └── FooterSection.tsx   # Contact + about
│   │
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx          # Premium button variants
│   │   ├── Card.tsx            # Artwork cards
│   │   ├── Modal.tsx           # Gallery modal
│   │   ├── Typography.tsx      # Heading/text components
│   │   ├── Container.tsx       # Layout container
│   │   └── Divider.tsx         # Decorative dividers
│   │
│   └── three/                # Three.js specific components
│       ├── Scene.tsx           # Base 3D scene setup
│       ├── Lighting.tsx        # Reusable lighting rigs
│       ├── PostProcessing.tsx  # Bloom, DOF effects
│       └── Materials.tsx       # Custom shader materials
│
├── hooks/
│   ├── useAudioAnalyzer.ts   (existing)
│   ├── useScrollProgress.ts    # Scroll position tracking
│   ├── useSmoothScroll.ts      # Lenis/locomotive scroll
│   ├── useMousePosition.ts     # Cursor tracking
│   ├── useMediaQuery.ts        # Responsive breakpoints
│   └── useGSAPContext.ts       # GSAP context management
│
├── lib/
│   ├── animations/
│   │   ├── easings.ts          # Custom cubic-bezier curves
│   │   ├── physics.ts          # Spring physics calculations
│   │   ├── interpolations.ts   # Lerp, slerp utilities
│   │   └── timelines.ts        # GSAP timeline factories
│   │
│   ├── math/
│   │   ├── vectors.ts          # Vector operations
│   │   ├── noise.ts            # Perlin/Simplex noise
│   │   └── curves.ts           # Bezier curve calculations
│   │
│   └── utils/
│       ├── cn.ts               # Class name utility
│       └── constants.ts        # Global constants
│
├── styles/
│   └── animations.css          # CSS keyframe animations
│
├── types/
│   └── index.ts                # TypeScript interfaces
│
└── data/
    ├── artworks.ts             # Portfolio data
    ├── achievements.ts         # Awards, exhibitions
    └── testimonials.ts         # Client quotes
```

---

## Animation System Design

### 1. Custom Easing Library (Physics-Based Bezier Curves)

Following Framer Motion's approach with custom cubic-bezier curves:

```typescript
// lib/animations/easings.ts

// Premium easing curves (like Framer's signature animations)
export const easings = {
  // Smooth, luxurious transitions
  luxuryEase: [0.16, 1, 0.3, 1],           // cubic-bezier(0.16, 1, 0.3, 1)
  luxuryEaseIn: [0.6, 0.01, 0.4, 1],       // cubic-bezier(0.6, 0.01, 0.4, 1)
  luxuryEaseOut: [0.16, 1, 0.3, 1],        // cubic-bezier(0.16, 1, 0.3, 1)

  // Elastic/Spring curves
  elasticOut: [0.68, -0.55, 0.265, 1.55],  // Overshoot effect
  bounceOut: [0.34, 1.56, 0.64, 1],        // Subtle bounce

  // Dramatic reveals
  dramaticReveal: [0.22, 1, 0.36, 1],      // For hero text
  smoothPower: [0.45, 0, 0.55, 1],         // Power4 equivalent

  // Scroll-based
  scrollSmooth: [0.25, 0.1, 0.25, 1],      // Natural scroll feel
  parallaxEase: [0.33, 1, 0.68, 1],        // Parallax layers
}

// Spring physics configurations
export const springs = {
  gentle: { stiffness: 120, damping: 14, mass: 1 },
  smooth: { stiffness: 100, damping: 20, mass: 1 },
  snappy: { stiffness: 400, damping: 30, mass: 1 },
  bouncy: { stiffness: 200, damping: 10, mass: 1 },
  slow: { stiffness: 50, damping: 20, mass: 2 },
}
```

### 2. Animation Components

#### ScrollReveal Component
- Intersection Observer + GSAP ScrollTrigger
- Configurable reveal directions (up, down, left, right, scale, fade)
- Stagger support for lists
- Pin support for scrollytelling

#### MagneticElement Component
- Cursor-following magnetic effect
- Physics-based spring animations
- Customizable strength and damping

#### ParallaxLayer Component
- Depth-based parallax
- 3D transform optimizations
- Mobile-aware (reduced motion)

---

## Section Breakdown

### 1. Hero Section (Authority First)

**Purpose:** Immediately establish Amrita as a globally recognized, high-end artist.

**Content:**
- Full-viewport 3D animation with morphing sound waves
- Bold statement: "Amrita Sethi" (large, elegant typography)
- Subtitle: "Internationally Acclaimed Sound Artist"
- Key credentials ticker or floating badges (Dubai, London, New York, etc.)
- Subtle ambient audio visualization in background

**Animations:**
- Staggered text reveal with dramatic easing
- 3D sound wave visualization (existing component, enhanced)
- Floating achievement badges with magnetic hover
- Scroll indicator with gentle bounce

**Technical:**
- Three.js background scene
- GSAP SplitText for character-level animations
- Framer Motion for interactive elements

### 2. Legacy Section (Achievements, Awards, Exhibitions)

**Purpose:** Build credibility before showing products.

**Content:**
- Timeline or grid of major achievements
- Exhibition venues (galleries, museums, events)
- Awards and recognition
- Press mentions / media logos
- Notable collectors or commissions

**Animations:**
- Scroll-triggered reveals
- Counter animations for statistics
- Image parallax effects
- Staggered card appearances

**Layout Ideas:**
- Horizontal scroll gallery of venues
- Masonry grid of press logos
- Timeline with milestone markers

### 3. Portfolio Section

**Purpose:** Showcase the art itself in a premium gallery experience.

**Content:**
- Curated selection of best works
- Full-screen artwork viewer
- Artwork details (title, medium, story)

**Animations:**
- Smooth image transitions
- Zoom-on-hover with depth
- Modal with morphing animation
- Image reveal with curtain effect

### 4. SoundBYTE Originals Section

**Purpose:** Present as HIGH-END ART PIECE, not a tool or system.

**Content:**
- Immersive explanation of what SoundBYTE Originals are
- The artistic process (sound → visual art)
- Size/complexity variations
- Price anchoring statement ($3,500 - $15,000+)
- Commission CTA

**Animations:**
- Scrollytelling transformation (sound wave → artwork)
- 3D mockups of finished pieces
- Process visualization
- Dramatic reveal of finished piece

**Key Messaging:**
- "Each piece is a unique translation of your voice into timeless art"
- "Commissioned by collectors worldwide"
- "A one-of-a-kind artwork that captures the essence of your sound"

### 5. Sonic Identity Section

**Purpose:** Interactive playground, positioned as accessible product.

**Content:**
- Live microphone input visualization
- Experiment with your own sound
- Clear product differentiation from SoundBYTE Originals
- Gift-oriented messaging
- Price indication (more accessible tier)

**Animations:**
- Real-time audio visualization (existing hook)
- Interactive 3D canvas
- Record/playback UI
- Share/save functionality preview

### 6. Commission Section

**Purpose:** Premium questionnaire flow for high-value conversions.

**Content:**
- Multi-step form with elegant transitions
- Personal sound story capture
- Size/format preferences
- Timeline expectations
- Budget alignment

**Animations:**
- Step transitions with morphing
- Progress indicator
- Form field animations
- Success celebration animation

### 7. Footer Section

**Content:**
- Contact information
- Social links
- Newsletter signup
- Quick navigation
- Copyright

**Animations:**
- Subtle reveal on scroll
- Magnetic social icons
- Wave animation at bottom

---

## Scrollytelling Flow

The entire homepage will use a continuous scroll narrative:

```
SCROLL POSITION    SECTION              NARRATIVE
─────────────────────────────────────────────────────
0%                 Hero                 "Meet Amrita Sethi"
                   ↓
10%                Legacy               "A Legacy of Recognition"
                   ↓
30%                Portfolio            "The Art Collection"
                   ↓
50%                SoundBYTE            "SoundBYTE Originals"
                   ↓
70%                Sonic Identity       "Your Sound, Your Art"
                   ↓
85%                Commission           "Begin Your Journey"
                   ↓
95%                Footer               "Stay Connected"
```

Each section will have:
- Pin-and-reveal animations
- Smooth transitions between sections
- Progress indicator on side
- Subtle audio cues (optional)

---

## Implementation Phases

### Phase 1: Foundation (Current Focus)
- [x] Project setup (Vite, React, TypeScript, Tailwind)
- [x] Animation libraries (GSAP, Framer Motion, Three.js)
- [x] Base audio visualization component
- [ ] Animation utility library (easings, physics, interpolations)
- [ ] Core UI components (Button, Card, Typography, Container)
- [ ] Scroll management (smooth scroll, progress tracking)

### Phase 2: Hero & Legacy
- [ ] Hero section with 3D background
- [ ] Text reveal animations
- [ ] Legacy section with achievements
- [ ] Timeline/grid components
- [ ] Scroll-triggered reveals

### Phase 3: Portfolio & SoundBYTE
- [ ] Portfolio gallery
- [ ] Image modal with transitions
- [ ] SoundBYTE explanation section
- [ ] Scrollytelling transformations
- [ ] Price anchoring design

### Phase 4: Interactive & Commission
- [ ] Sonic Identity playground
- [ ] Audio recording/playback
- [ ] Commission questionnaire
- [ ] Form animations
- [ ] Success states

### Phase 5: Polish
- [ ] Footer section
- [ ] Navigation component
- [ ] Loading states
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] Accessibility audit

---

## Performance Considerations

1. **GPU Acceleration:** Use `transform` and `opacity` for animations
2. **Lazy Loading:** Load Three.js scenes only when in view
3. **Reduced Motion:** Respect `prefers-reduced-motion`
4. **Image Optimization:** WebP/AVIF with blur placeholders
5. **Code Splitting:** Dynamic imports for heavy sections
6. **RAF Management:** Single requestAnimationFrame loop
7. **Throttling:** Debounce scroll/resize handlers

---

## Next Steps

1. Create the animation utility library (`lib/animations/`)
2. Build core UI components
3. Implement smooth scroll with Lenis
4. Create the Hero section with authority positioning
5. Build the Legacy section with achievements

Ready to begin implementation.
