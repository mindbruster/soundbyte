/**
 * Navigation Component
 *
 * Premium header navigation with scroll effects.
 * Features:
 * - Transparent to solid on scroll
 * - Mobile hamburger menu
 * - React Router navigation
 * - Active route indicator
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Button } from './Button';
import { cn } from '../../lib/utils';
import { springs, durations } from '../../lib/animations';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface NavItem {
  href: string;
  label: string;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { href: '/about', label: 'About', isRoute: true },
  { href: '/portfolio', label: 'Portfolio', isRoute: true },
  { href: '/soundbyte', label: 'SoundBYTE', isRoute: true },
  { href: '/sonic-identity', label: 'Sonic Identity', isRoute: true }
];

// ═══════════════════════════════════════════════════════════════════════════
// NAV LINK COMPONENT WITH MAGNETIC EFFECT
// ═══════════════════════════════════════════════════════════════════════════

interface NavLinkProps {
  href: string;
  children: string;
  isActive?: boolean;
  onClick?: () => void;
  isRoute?: boolean;
}

function NavLink({ href, children, isActive, onClick, isRoute }: NavLinkProps) {
  const linkRef = useRef<HTMLDivElement>(null);

  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = link.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const radius = 80;
      if (distance < radius) {
        const strength = (1 - distance / radius) * 0.4;
        x.set(deltaX * strength);
        y.set(deltaY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  const linkContent = (
    <>
      {children}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500"
          transition={{ type: 'spring', ...springs.snappy }}
        />
      )}
    </>
  );

  if (isRoute) {
    return (
      <motion.div
        ref={linkRef}
        style={{ x: xSpring, y: ySpring }}
        className="inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to={href}
          onClick={onClick}
          className={cn(
            'relative text-sm font-medium transition-colors duration-300 inline-block',
            isActive ? 'text-gold-500' : 'text-white/70 hover:text-white'
          )}
        >
          {linkContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={linkRef}
      style={{ x: xSpring, y: ySpring }}
      className="inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          onClick?.();
        }}
        className={cn(
          'relative text-sm font-medium transition-colors duration-300 inline-block',
          isActive ? 'text-gold-500' : 'text-white/70 hover:text-white'
        )}
      >
        {linkContent}
      </a>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════════════════════

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-luxury-black/90 backdrop-blur-lg z-40"
          />

          {/* Menu panel */}
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', ...springs.smooth }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-luxury-charcoal border-l border-white/10 z-50 p-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="mb-12">
              <Link to="/" onClick={onClose} className="font-display text-2xl text-white font-bold">
                Amrita <span className="text-gradient-gold">Sethi</span>
              </Link>
            </div>

            {/* Nav links */}
            <div className="space-y-6">
              {navItems.map((item) => (
                <motion.div key={item.href} whileHover={{ x: 10 }}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'block text-2xl font-display font-semibold transition-colors',
                      activeSection === item.href
                        ? 'text-gold-500'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="absolute bottom-8 left-8 right-8">
              <Link to="/commission" onClick={onClose}>
                <Button variant="primary" fullWidth>
                  Commission
                </Button>
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC LOGO COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function MagneticLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 100, damping: 12, mass: 0.2 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 12, mass: 0.2 });
  const rotateSpring = useSpring(rotate, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = logo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const radius = 120;
      if (distance < radius) {
        const strength = (1 - distance / radius) * 0.5;
        x.set(deltaX * strength);
        y.set(deltaY * strength);
        rotate.set(deltaX * strength * 0.1);
      } else {
        x.set(0);
        y.set(0);
        rotate.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      rotate.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    logo.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      logo.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, rotate]);

  return (
    <motion.div
      ref={logoRef}
      style={{ x: xSpring, y: ySpring, rotate: rotateSpring }}
      className="inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to="/"
        className="font-display text-xl sm:text-2xl text-white font-bold inline-block"
      >
        Amrita <span className="text-gradient-gold">Sethi</span>
      </Link>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Handle scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: durations.smooth, delay: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-luxury-black/90 backdrop-blur-lg border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with magnetic effect */}
            <MagneticLogo />

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  isActive={currentPath === item.href}
                  isRoute={item.isRoute}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* CTA and mobile menu button */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <Link to="/commission">
                  <Button variant="primary" size="sm">
                    Commission
                  </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={currentPath}
      />
    </>
  );
}
