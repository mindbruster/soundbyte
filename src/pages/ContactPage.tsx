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
import {
  ChevronLeft,
  ArrowRight,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';

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
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-gold-500" />
        </div>
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

      <Button type="submit" variant="primary" size="lg" fullWidth className="group">
        <span>Send Message</span>
        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
  const socialLinks = [
    { href: 'https://instagram.com/amritasethi', icon: Instagram, label: 'Instagram', handle: '@amritasethi' },
    { href: 'https://twitter.com/amritasethi', icon: Twitter, label: 'Twitter / X', handle: '@amritasethi' },
    { href: 'https://linkedin.com/in/amritasethi', icon: Linkedin, label: 'LinkedIn', handle: 'amrita sethi' }
  ];

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
          <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
                    <Mail className="w-5 h-5 text-gold-500" />
                    hello@amritasethi.com
                  </a>
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-5 h-5 text-gold-500" />
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
                  {socialLinks.map((social) => (
                    <SocialLink
                      key={social.label}
                      href={social.href}
                      icon={<social.icon className="w-5 h-5" />}
                      label={social.label}
                      handle={social.handle}
                    />
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Clock className="w-5 h-5" />
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
              <Button variant="primary" size="lg" className="group">
                <span>Start Your Commission</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
