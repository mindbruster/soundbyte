# Amrita Sethi Portfolio Website

## Project Overview
A luxury portfolio website for **Amrita Sethi**, Dubai's first NFT artist and creator of SoundBYTEs® - the patented process of transforming spoken words into collectible visual art masterpieces.

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, GSAP with ScrollTrigger
- **3D Graphics**: Three.js with React Three Fiber (@react-three/fiber, @react-three/drei)
- **Routing**: React Router DOM 7
- **Icons**: Lucide React

## Brand Colors
Primary accent color: `#33CC80` (Custom Green)

Color palette (defined in `src/index.css` as `--color-gold-*`):
- 50: `#e6fbf0`
- 100: `#c2f5db`
- 200: `#8aebbf`
- 300: `#5ce0a3`
- 400/500: `#33cc80` (primary)
- 600: `#2ab36e`
- 700: `#22995c`
- 800: `#1a804a`
- 900: `#126638`

Background colors:
- `luxury-black`: `#0a0a0a`
- `luxury-dark`: `#141414`
- `luxury-gray`: `#1a1a1a`
- `luxury-light`: `#2a2a2a`

## Project Structure

```
src/
├── components/
│   ├── animations/          # Animation components
│   │   ├── FluidCursor.tsx
│   │   ├── InteractiveBackground.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── SoundWaveCanvas.tsx
│   │   └── VoiceSoundWave.tsx
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── PressMarquee.tsx
│   │   ├── FeaturedExhibitionSection.tsx
│   │   ├── SoundByteSection.tsx
│   │   ├── SignatureWorksSection.tsx
│   │   ├── PhilosophySection.tsx
│   │   ├── VoiceDemoSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ByteclubSection.tsx
│   │   ├── CommissionSection.tsx
│   │   ├── CommissionQuestionnaire.tsx
│   │   ├── SonicIdentitySection.tsx
│   │   ├── LegacySection.tsx
│   │   ├── AwardsSection.tsx
│   │   ├── FooterSection.tsx
│   │   └── index.ts
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Container.tsx
│       ├── MagneticElement.tsx
│       ├── Navigation.tsx
│       └── Typography.tsx
├── hooks/
│   └── useSectionObserver.ts
├── layouts/
│   └── MainLayout.tsx
├── lib/
│   ├── animations/
│   │   └── easings.ts       # Custom easing curves & springs
│   └── utils/
│       └── constants.ts     # Global constants, colors, pricing
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── PortfolioPage.tsx
│   ├── SoundBytePage.tsx
│   ├── SonicIdentityPage.tsx
│   ├── CommissionPage.tsx
│   └── ContactPage.tsx
├── App.tsx                  # Router setup
├── main.tsx                 # Entry point
└── index.css                # Global styles & Tailwind theme
```

## Key Features

### Interactive Sound Wave Background
- Canvas-based animated sound waves in HeroSection
- Responds to microphone input (Web Audio API)
- Mouse-reactive parallax effects

### Voice Demo Section
- Interactive voice-to-art demonstration
- Uses MediaRecorder API for voice capture
- Real-time frequency analysis visualization
- Generates unique artwork based on audio frequencies

### Animated Stats Counter
- Scroll-triggered counting animation
- Uses IntersectionObserver
- Custom easeOutQuart easing

### Ken Burns Gallery
- Automatic image cycling with Ken Burns effect
- 3D perspective transforms
- Hover interactions

## Animation System
Custom easing curves in `src/lib/animations/easings.ts`:
- Sound wave-inspired curves (waveFlow, wavePulse, waveCrescendo, etc.)
- Spring physics configurations for Framer Motion
- Premium easing presets

## Pages & Routes
- `/` - Home (main landing page)
- `/about` - About Amrita
- `/portfolio` - Art collections
- `/soundbyte` - SoundBYTE® explanation & pricing
- `/sonic-identity` - Sonic Identity service
- `/commission` - Commission form/questionnaire
- `/contact` - Contact page

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Important Files for Color Changes
When changing the brand color, update these files:
1. `src/index.css` - CSS custom properties (`--color-gold-*`)
2. `src/lib/utils/constants.ts` - COLORS object
3. `src/hooks/useSectionObserver.ts` - SECTION_THEMES
4. Components with hardcoded hex colors (search for the color value)

## Reference Site
Design inspired by: https://amrita-art.lovable.app/

## Notes
- Uses Tailwind CSS 4 with `@theme` directive for custom properties
- Font families: Playfair Display (display), Inter (body)
- Dark theme with luxury aesthetic
- Responsive design with mobile-first approach
