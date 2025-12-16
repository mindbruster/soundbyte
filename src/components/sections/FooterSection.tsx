/**
 * Footer Section
 *
 * Premium footer with contact information, social links, and navigation.
 * Features:
 * - Elegant animations
 * - Social media links
 * - Newsletter signup
 * - Quick navigation
 */

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../animations/ScrollReveal';

// ═══════════════════════════════════════════════════════════════════════════
// SOCIAL LINK COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/30 flex items-center justify-center text-white/60 hover:text-gold-500 transition-colors"
    >
      {icon}
    </motion.a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NAV LINK COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface NavLinkProps {
  href: string;
  children: string;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      to={href}
      className="text-white/50 hover:text-gold-500 text-sm transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NEWSLETTER FORM
// ═══════════════════════════════════════════════════════════════════════════

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gold-500 text-sm"
      >
        Thank you for subscribing!
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
      />
      <Button type="submit" variant="primary" size="sm">
        Subscribe
      </Button>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  // Social icons
  const socialIcons = {
    instagram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    youtube: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  };

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/soundbyte', label: 'SoundBYTE Originals™' },
    { href: '/sonic-identity', label: 'Sonic Identity™' },
    { href: '/commission', label: 'Commission' },
    { href: '/contact', label: 'Contact' }
  ];

  const studioInfo = {
    location: 'Dubai, United Arab Emirates',
    email: 'hello@amritasethi.com'
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 sm:py-20 bg-luxury-black border-t border-white/5"
    >
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <Container size="xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="up">
              <Link to="/" className="font-display text-2xl text-white font-bold mb-4 block">
                amrita <span className="text-gradient-gold">sethi</span>
              </Link>
              <p className="text-white/60 text-sm mb-2">
                Sound Artist • Inventor of SoundBYTEs® • Dubai's First NFT Artist
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-md">
                Inventor of SoundBYTEs® — Transforming voice into visual art since 2020.
              </p>
              <div className="flex items-center gap-3">
                <SocialLink
                  href="https://instagram.com"
                  icon={socialIcons.instagram}
                  label="Instagram"
                />
                <SocialLink
                  href="https://twitter.com"
                  icon={socialIcons.twitter}
                  label="Twitter"
                />
                <SocialLink
                  href="https://linkedin.com"
                  icon={socialIcons.linkedin}
                  label="LinkedIn"
                />
                <SocialLink
                  href="https://youtube.com"
                  icon={socialIcons.youtube}
                  label="YouTube"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Navigation column */}
          <div>
            <ScrollReveal direction="up">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <nav className="flex flex-col gap-3">
                {navigationLinks.map(link => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </ScrollReveal>
          </div>

          {/* Studio Info column */}
          <div>
            <ScrollReveal direction="up">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Studio
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-white/50">{studioInfo.location}</p>
                <a
                  href={`mailto:${studioInfo.email}`}
                  className="text-gold-500 hover:text-gold-400 transition-colors block"
                >
                  {studioInfo.email}
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* BYTEclub / Newsletter column */}
          <div>
            <ScrollReveal direction="up">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Join BYTEclub
              </h4>
              <p className="text-white/50 text-sm mb-4">
                Be first to access drops, commissions, private events & creative news.
              </p>
              <NewsletterForm />
              <p className="text-white/30 text-xs mt-3">
                No spam. Unsubscribe anytime. Join 2,500+ collectors.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <ScrollReveal direction="up">
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-white/30 text-sm">
                © {new Date().getFullYear()} amrita sethi. All rights reserved.
              </p>
              <p className="text-white/20 text-xs mt-1">
                SoundBYTE® is a registered trademark.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">
                Terms
              </a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">
                Press Kit
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/30 flex items-center justify-center text-gold-500 transition-colors z-40"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
}
