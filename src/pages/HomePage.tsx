/**
 * Home Page
 *
 * Focus: Amrita (the artist) + Her Art (for sale)
 *
 * Flow:
 * 1. Hero - First impression, authority stats, CTA
 * 2. Press Marquee - Credibility (CNN, Forbes, Ferrari, etc.)
 * 3. Products - SoundBYTE Originals™ & Sonic Identity™
 * 4. Portfolio - Her work
 * 5. About preview - Lead to full About page
 */

import {
  HeroSection,
  PressMarquee,
  SoundByteSection,
  SonicIdentitySection,
  PortfolioSection
} from '../components/sections';

export function HomePage() {
  return (
    <>
      {/* Hero - Amrita + Authority */}
      <HeroSection />

      {/* Press & Brand Marquee - Credibility */}
      <PressMarquee />

      {/* Products - Art for Sale */}
      <SoundByteSection />
      <SonicIdentitySection />

      {/* Portfolio - Her Work */}
      <PortfolioSection />
    </>
  );
}
