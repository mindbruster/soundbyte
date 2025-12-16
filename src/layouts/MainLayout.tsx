/**
 * Main Layout
 *
 * Clean, minimal layout with:
 * - Navigation
 * - Main content
 * - Footer
 *
 * Removed heavy WebGL background for performance
 */

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from '../components/ui';
import { FooterSection } from '../components/sections';

export function MainLayout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
