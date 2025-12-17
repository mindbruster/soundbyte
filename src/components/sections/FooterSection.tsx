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
import {
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUp,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

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
        className="text-gold-500 text-sm flex items-center gap-2"
      >
        <CheckCircle className="w-4 h-4" />
        Thank you for subscribing!
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
        />
      </div>
      <Button type="submit" variant="primary" size="sm" className="group">
        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  // Social links data with Lucide icons
  const socialLinks = [
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' }
  ];

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
                {socialLinks.map((social) => (
                  <SocialLink
                    key={social.label}
                    href={social.href}
                    icon={<social.icon className="w-4 h-4" />}
                    label={social.label}
                  />
                ))}
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
                <p className="text-white/50 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-500/50" />
                  {studioInfo.location}
                </p>
                <a
                  href={`mailto:${studioInfo.email}`}
                  className="text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
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
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
