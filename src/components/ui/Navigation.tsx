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

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { cn } from '../../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface NavItem {
  href: string;
  label: string;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', isRoute: true },
  { href: '/soundbyte', label: 'SoundBYTE Originals™', isRoute: true },
  { href: '/sonic-identity', label: 'Sonic Identity™', isRoute: true },
  { href: '/portfolio', label: 'Collections', isRoute: true },
  { href: '/about', label: 'About', isRoute: true },
  { href: '/contact', label: 'Contact', isRoute: true }
];

// ═══════════════════════════════════════════════════════════════════════════
// NAV LINK COMPONENT - Clean & Minimal
// ═══════════════════════════════════════════════════════════════════════════

interface NavLinkProps {
  href: string;
  children: string;
  isActive?: boolean;
  onClick?: () => void;
  isRoute?: boolean;
}

function NavLink({ href, children, isActive, onClick, isRoute }: NavLinkProps) {
  const linkContent = (
    <span className="relative">
      {children}
      <span
        className={cn(
          'absolute -bottom-1 left-0 h-px bg-gold-500 transition-all duration-300',
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </span>
  );

  if (isRoute) {
    return (
      <Link
        to={href}
        onClick={onClick}
        className={cn(
          'group relative text-sm font-medium transition-colors duration-300',
          isActive ? 'text-gold-500' : 'text-white/70 hover:text-white'
        )}
      >
        {linkContent}
      </Link>
    );
  }

  return (
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
        'group relative text-sm font-medium transition-colors duration-300',
        isActive ? 'text-gold-500' : 'text-white/70 hover:text-white'
      )}
    >
      {linkContent}
    </a>
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
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                amrita <span className="text-gradient-gold">sethi</span>
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
// LOGO COMPONENT - Clean & Simple
// ═══════════════════════════════════════════════════════════════════════════

function Logo() {
  return (
    <Link
      to="/"
      className="font-display text-xl sm:text-2xl text-white font-semibold tracking-tight hover:opacity-80 transition-opacity duration-300"
    >
      amrita <span className="text-gold-500">sethi</span>
    </Link>
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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-luxury-black/90 backdrop-blur-lg border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo />

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
