/**
 * Contact Page
 *
 * Dedicated contact page with form and information.
 * Features:
 * - Contact form
 * - Social links
 * - Location info
 * - FAQ preview
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Heading, Text, Label } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/animations/ScrollReveal';

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════════════════════

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-5xl mb-6">✨</div>
        <h3 className="font-display text-2xl text-white font-semibold mb-4">
          Message Sent!
        </h3>
        <p className="text-white/60 mb-6">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/70 text-sm mb-2">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-white/70 text-sm mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Subject *</label>
        <select
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
        >
          <option value="" className="bg-luxury-black">Select a subject</option>
          <option value="commission" className="bg-luxury-black">Commission Inquiry</option>
          <option value="collaboration" className="bg-luxury-black">Brand Collaboration</option>
          <option value="press" className="bg-luxury-black">Press / Media</option>
          <option value="general" className="bg-luxury-black">General Inquiry</option>
          <option value="support" className="bg-luxury-black">Support</option>
        </select>
      </div>

      <div>
        <label className="block text-white/70 text-sm mb-2">Message *</label>
        <textarea
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
          placeholder="Tell us about your inquiry..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth>
        Send Message
      </Button>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SOCIAL LINK
// ═══════════════════════════════════════════════════════════════════════════

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
}

function SocialLink({ href, icon, label, handle }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-gold-500/30 transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
        {icon}
      </div>
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-white/50 text-sm">{handle}</p>
      </div>
    </motion.a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT PAGE MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ContactPage() {
  const socialIcons = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  };

  return (
    <section className="relative py-32 sm:py-40 bg-luxury-black min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <Container size="xl">
        {/* Back link */}
        <ScrollReveal direction="up" className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <Label variant="gold" className="mb-4">Get In Touch</Label>
          <Heading as="h1" size="hero" align="center" className="mb-6">
            Contact <span className="text-gradient-gold">Us</span>
          </Heading>
          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            Have a question about commissioning a SoundBYTE, collaboration opportunities,
            or press inquiries? We'd love to hear from you.
          </Text>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact form */}
          <ScrollReveal direction="left">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
              <h2 className="font-display text-2xl text-white font-semibold mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              {/* Quick contact */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20">
                <h3 className="font-display text-xl text-white font-semibold mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@amritasethi.com"
                    className="flex items-center gap-3 text-white/70 hover:text-gold-500 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    hello@amritasethi.com
                  </a>
                  <div className="flex items-center gap-3 text-white/70">
                    <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Dubai, United Arab Emirates
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h3 className="font-display text-xl text-white font-semibold mb-4">
                  Connect With Us
                </h3>
                <div className="space-y-4">
                  <SocialLink
                    href="https://instagram.com/amritasethi"
                    icon={socialIcons.instagram}
                    label="Instagram"
                    handle="@amritasethi"
                  />
                  <SocialLink
                    href="https://twitter.com/amritasethi"
                    icon={socialIcons.twitter}
                    label="Twitter / X"
                    handle="@amritasethi"
                  />
                  <SocialLink
                    href="https://linkedin.com/in/amritasethi"
                    icon={socialIcons.linkedin}
                    label="LinkedIn"
                    handle="Amrita Sethi"
                  />
                </div>
              </div>

              {/* Response time */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Response Time</h4>
                    <p className="text-white/60 text-sm">
                      We typically respond to all inquiries within 24-48 hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Commission CTA */}
        <ScrollReveal direction="up" className="mt-20">
          <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10">
            <h3 className="font-display text-2xl sm:text-3xl text-white font-semibold mb-4">
              Ready to Commission a SoundBYTE®?
            </h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Skip the contact form and start your commission journey directly.
            </p>
            <Link to="/commission">
              <Button variant="primary" size="lg">
                Start Your Commission
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
