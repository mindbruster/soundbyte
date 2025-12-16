/**
 * Choose Your Experience Section
 *
 * Three pathways: SoundBYTE Originals, Sonic Identity, BYTEclub
 * Clear CTAs for each product/service
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE DATA
// ═══════════════════════════════════════════════════════════════════════════

const experiences = [
  {
    title: "SoundBYTE Originals™",
    description: "Commission a bespoke, museum-quality artwork that transforms your meaningful sound into a visual masterpiece. Hand-painted with 24k gold leaf.",
    price: "From $3,500",
    cta: "Commission Now",
    href: "/soundbyte",
    highlight: true
  },
  {
    title: "Sonic Identity™",
    description: "Generate your unique visual identity based on your voice frequency. Perfect for personal branding, gifts, or discovering your sonic signature.",
    price: "From $99",
    cta: "Generate Yours",
    href: "/sonic-identity",
    highlight: false
  },
  {
    title: "BYTEclub",
    description: "Join an exclusive community of collectors and art enthusiasts. Get early access to drops, private events, and behind-the-scenes content.",
    price: "Free to Join",
    cta: "Join Community",
    href: "/contact",
    highlight: false
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ExperienceCardProps {
  title: string;
  description: string;
  price: string;
  cta: string;
  href: string;
  highlight: boolean;
  index: number;
}

function ExperienceCard({ title, description, price, cta, href, highlight, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, ...springs.waveGentle }}
      className={`group relative p-8 md:p-10 rounded-lg transition-all duration-500 ${
        highlight
          ? 'bg-gold-500/10 border-2 border-gold-500/30 hover:border-gold-500/50'
          : 'bg-white/[0.02] border border-white/5 hover:border-gold-500/20'
      }`}
    >
      {/* Highlight badge */}
      {highlight && (
        <div className="absolute -top-3 left-8 px-3 py-1 bg-gold-500 text-luxury-black text-xs font-medium tracking-wider uppercase rounded-full">
          Most Popular
        </div>
      )}

      {/* Content */}
      <h3 className="font-display text-2xl text-white group-hover:text-gold-500 transition-colors mb-4">
        {title}
      </h3>

      <p className="text-white/50 leading-relaxed mb-6">
        {description}
      </p>

      {/* Price */}
      <p className="text-gold-500 font-semibold text-lg mb-6">
        {price}
      </p>

      {/* CTA */}
      <Link
        to={href}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
          highlight
            ? 'bg-gold-500 text-luxury-black hover:bg-gold-400'
            : 'bg-white/5 text-white hover:bg-gold-500/20 hover:text-gold-500 border border-white/10 hover:border-gold-500/30'
        }`}
      >
        {cta}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ExperienceSection() {
  return (
    <section className="py-32 bg-luxury-gray/20">
      <Container size="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="text-center mb-16"
        >
          <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-4">
            Start Your Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
            Choose Your Experience
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From bespoke commissions to digital identities, find the perfect way to own a piece of sound art.
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.title} {...experience} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
