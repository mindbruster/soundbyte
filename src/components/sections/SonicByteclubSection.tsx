/**
 * Combined Sonic Identity & BYTEclub Section
 *
 * Two-column layout showcasing both offerings side-by-side
 * with Lucide icons for visual hierarchy
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';
import {
  Mic,
  Palette,
  Download,
  Heart,
  Baby,
  Flower2,
  Calendar,
  MessageCircleHeart,
  PawPrint,
  Sparkles,
  Users,
  Eye,
  Star,
  CalendarCheck,
  Mail,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════════════════════════════════════

const sonicSteps = [
  { icon: Mic, title: 'Record', desc: 'Upload any voice or sound' },
  { icon: Palette, title: 'Customize', desc: 'Choose style and format' },
  { icon: Download, title: 'Receive', desc: 'Download or get it shipped' }
];

const occasions = [
  { icon: Heart, label: 'Wedding Vows' },
  { icon: Baby, label: "Baby's First Words" },
  { icon: Flower2, label: 'Memorial Tribute' },
  { icon: Calendar, label: 'Anniversary' },
  { icon: MessageCircleHeart, label: 'Love Message' },
  { icon: PawPrint, label: 'Pet Sounds' }
];

const byteclubBenefits = [
  { icon: Eye, label: 'Early access to new drops' },
  { icon: Sparkles, label: 'Exclusive behind-the-scenes' },
  { icon: Star, label: 'Priority commission slots' },
  { icon: CalendarCheck, label: 'Private collector events' }
];

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// ═══════════════════════════════════════════════════════════════════════════
// SONIC IDENTITY CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function SonicIdentityCard() {
  return (
    <motion.div
      {...fadeInUp}
      className="relative h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-luxury-gray/60 to-luxury-black border border-white/10 overflow-hidden group"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-medium tracking-wide uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Instant Digital Art
        </div>
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
          Sonic <span className="text-gold-500">Identity™</span>
        </h3>
        <p className="text-white/60 text-sm lg:text-base leading-relaxed">
          Experience Amrita's signature sound-to-art technology instantly and affordably.
          The perfect meaningful gift.
        </p>
      </div>

      {/* Value Props */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-3 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-500 text-xs font-semibold">
          From $99
        </span>
        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
          Ready in Minutes
        </span>
        <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
          Ships Worldwide
        </span>
      </div>

      {/* How it works */}
      <div className="mb-8">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">How it works</p>
        <div className="space-y-3">
          {sonicSteps.map((step) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <step.icon className="w-4 h-4 text-gold-500" />
              </div>
              <div>
                <span className="text-white font-medium text-sm">{step.title}</span>
                <span className="text-white/40 text-sm ml-2">— {step.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Perfect for */}
      <div className="mb-8">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Perfect for</p>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {occasions.map((occasion) => (
            <motion.span
              key={occasion.label}
              variants={staggerItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs hover:border-gold-500/30 hover:text-white/80 transition-colors cursor-default"
            >
              <occasion.icon className="w-3 h-3" />
              {occasion.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="relative z-10">
        <Link to="/sonic-identity">
          <Button variant="primary" size="md" className="w-full sm:w-auto group/btn">
            <span>Create Your Sonic Identity™</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <p className="mt-3 text-white/40 text-xs">
          Free preview • Digital + print options
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// BYTECLUB CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function ByteclubCard() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('BYTEclub signup:', email);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <motion.div
      {...fadeInUp}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="relative h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-gold-500/10 via-luxury-gray/30 to-luxury-black border border-gold-500/20 overflow-hidden group"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-medium tracking-wide uppercase mb-4">
          <Users className="w-3.5 h-3.5" />
          Join the Community
        </div>
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
          Join <span className="text-gold-500">BYTEclub</span>
        </h3>
        <p className="text-white/60 text-sm lg:text-base leading-relaxed">
          Be the first to know about new collections, exclusive drops, and private events.
          Join 2,500+ collectors and art enthusiasts.
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-8">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Member Benefits</p>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {byteclubBenefits.map((benefit) => (
            <motion.div
              key={benefit.label}
              variants={staggerItem}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <benefit.icon className="w-4 h-4 text-gold-500" />
              </div>
              <span className="text-white/70 text-sm">{benefit.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Form */}
      <div className="relative z-10">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 py-6 px-4 rounded-xl bg-gold-500/10 border border-gold-500/30"
          >
            <CheckCircle2 className="w-5 h-5 text-gold-500" />
            <span className="text-gold-500 text-sm font-medium">
              Welcome to BYTEclub! Check your email.
            </span>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ...springs.waveGentle }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>
            <Button type="submit" variant="primary" size="md" className="w-full group/btn">
              <span>Join Free</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.form>
        )}
        <p className="text-white/30 text-xs mt-3 text-center">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SonicByteclubSection() {
  return (
    <section
      id="sonic-byteclub"
      className="relative py-24 sm:py-32 bg-luxury-black"
    >
      <Container size="xl">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <p className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Get Started Today
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Experience the Art of <span className="text-gold-500">Sound</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you're looking to create your own sonic artwork or join our exclusive community,
            there's a perfect path for you.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <SonicIdentityCard />
          <ByteclubCard />
        </div>
      </Container>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
