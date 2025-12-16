/**
 * Home Page
 *
 * Focus: Amrita (the artist) + Her Art (for sale)
 *
 * Flow (matching reference site):
 * 1. Hero - First impression, authority stats, CTAs
 * 2. Press Marquee - Credibility (CNN, Forbes, Ferrari, etc.)
 * 3. Featured Exhibition - Art Dubai 2026 highlight
 * 4. Signature Style - SoundBYTEs explanation
 * 5. Signature Works - Notable projects
 * 6. Philosophy - Art + Innovation, Identity + Story, Emotional Impact
 * 7. Choose Your Experience - SoundBYTE, Sonic Identity, BYTEclub
 * 8. Achievements - Record-breaking milestones
 * 9. Portfolio - Collections preview
 * 10. BYTEclub CTA - Newsletter signup
 */

import {
  HeroSection,
  PressMarquee,
  FeaturedExhibitionSection,
  SoundByteSection,
  SignatureWorksSection,
  PhilosophySection,
  VoiceDemoSection,
  ExperienceSection,
  AchievementsSection,
  PortfolioSection,
  ByteclubSection
} from '../components/sections';

export function HomePage() {
  return (
    <>
      {/* Hero - Amrita + Authority */}
      <HeroSection />

      {/* Press & Brand Marquee - Credibility */}
      <PressMarquee />

      {/* Featured Exhibition - Art Dubai 2026 */}
      <FeaturedExhibitionSection />

      {/* Signature Style - What is a SoundBYTE */}
      <SoundByteSection />

      {/* Signature Works - Notable projects */}
      <SignatureWorksSection />

      {/* Philosophy - Three pillars */}
      <PhilosophySection />

      {/* Interactive Voice Demo - Try it yourself! */}
      <VoiceDemoSection />

      {/* Choose Your Experience - Product pathways */}
      <ExperienceSection />

      {/* Achievements - Milestones */}
      <AchievementsSection />

      {/* Portfolio - Collections preview */}
      <PortfolioSection />

      {/* BYTEclub CTA - Newsletter */}
      <ByteclubSection />
    </>
  );
}
