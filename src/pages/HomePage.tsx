/**
 * Home Page
 *
 * The original single-page immersive experience.
 * Contains all sections for the full scroll journey.
 */

import {
  HeroSection,
  LegacySection,
  AwardsSection,
  PortfolioSection,
  SoundByteSection,
  SonicIdentitySection
} from '../components/sections';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <LegacySection />
      <AwardsSection />
      <PortfolioSection />
      <SoundByteSection />
      <SonicIdentitySection />
    </>
  );
}
