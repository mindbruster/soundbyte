/**
 * Amrita Sethi Portfolio
 *
 * Premium immersive experience with:
 * - Interactive WebGL background that follows mouse
 * - Physics-based fluid cursor with particle trails
 * - Scroll-triggered section transitions
 * - Magnetic interactive elements
 */

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/ui';
import { InteractiveBackground, FluidCursor } from './components/animations';
import {
  HeroSection,
  LegacySection,
  AwardsSection,
  PortfolioSection,
  SoundByteSection,
  SonicIdentitySection,
  CommissionQuestionnaire,
  FooterSection
} from './components/sections';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize
  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-luxury-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold-500/30 border-t-gold-500 animate-spin" />
          <span className="text-gold-500/60 text-sm font-medium tracking-widest uppercase">
            Loading Experience
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Custom cursor */}
      <FluidCursor enableTrail={true} trailLength={10} />

      {/* Interactive WebGL background - follows mouse and scroll */}
      <InteractiveBackground />

      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Legacy Section */}
        <LegacySection />

        {/* Awards Section */}
        <AwardsSection />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* SoundBYTE Originals */}
        <SoundByteSection />

        {/* Commission Questionnaire - Part of SoundBYTE Originals journey */}
        <CommissionQuestionnaire />

        {/* Sonic Identity - Accessible product line */}
        <SonicIdentitySection />

        {/* Footer */}
        <FooterSection />
      </main>
    </>
  );
}

export default App;
