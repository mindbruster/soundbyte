/**
 * Main Layout
 *
 * Shared layout for all pages with:
 * - Interactive WebGL background
 * - Fluid cursor
 * - Navigation
 * - Footer
 */

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '../components/ui';
import { InteractiveBackground, FluidCursor } from '../components/animations';
import { FooterSection } from '../components/sections';

gsap.registerPlugin(ScrollTrigger);

export function MainLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Initialize
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Refresh ScrollTrigger on route change
  useEffect(() => {
    ScrollTrigger.refresh();
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

      {/* Interactive WebGL background */}
      <InteractiveBackground />

      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content - rendered by React Router */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <FooterSection />
    </>
  );
}
