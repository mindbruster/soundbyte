/**
 * Home Page
 *
 * Restructured Flow:
 * 1. Hero (Two Column) - Left: Introduction / Right: Who is Amrita
 * 2. Her Artworks - Art systems and collections
 * 3. Her Exhibitions - Exhibitions and public art
 * 4. SoundBYTE - Introduction → Commission page
 * 5. Sonic Identity - Introduction → Sonic Identity page
 * 6. BYTEclub - Community signup
 * 7. Footer (in layout)
 */

import {
  HeroSection,
  ArtCollectionsSection,
  ExhibitionsSection,
  SoundByteSection,
  SonicIdentitySection,
  ByteclubSection
} from '../components/sections';

export function HomePage() {
  return (
    <>
      {/* 1. Hero (Two Column) - Left: Intro / Right: Who is Amrita */}
      <HeroSection />

      {/* 2. Her Artworks - Art systems and collections */}
      <ArtCollectionsSection />

      {/* 3. Her Exhibitions - Exhibitions and public art */}
      <ExhibitionsSection />

      {/* 4. SoundBYTE - Introduction → Commission */}
      <SoundByteSection />

      {/* 5. Sonic Identity - Introduction → Sonic Identity page */}
      <SonicIdentitySection />

      {/* 6. BYTEclub - Community */}
      <ByteclubSection />
    </>
  );
}
