/**
 * Philosophy Section
 *
 * Amrita's artistic philosophy and values
 * Three pillars: Art + Innovation, Identity + Story, Emotional Impact
 */

import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// PHILOSOPHY DATA
// ═══════════════════════════════════════════════════════════════════════════

const philosophyPillars = [
  {
    title: "Art + Innovation",
    description: "Pioneering the fusion of traditional fine art techniques with cutting-edge technology. Each SoundBYTE bridges the gap between analog craftsmanship and digital innovation.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Identity + Story",
    description: "Every voice carries a unique story. SoundBYTEs transform these personal narratives into visual legacies, preserving moments that matter for generations to come.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: "Emotional Impact",
    description: "Art should move you. Beyond aesthetics, each piece is designed to evoke deep emotional responses, connecting viewers to the essence of human expression.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// PILLAR CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface PillarCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

function PillarCard({ title, description, icon, index }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, ...springs.waveGentle }}
      className="group text-center p-8 md:p-10 rounded-lg bg-white/[0.02] border border-white/5 hover:border-gold-500/20 transition-all duration-500"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 text-gold-500 mb-6 group-hover:bg-gold-500/20 transition-colors">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl text-white mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/50 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PHILOSOPHY SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PhilosophySection() {
  return (
    <section className="py-32 relative overflow-hidden border-y border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-gray/10 to-luxury-black" />

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="text-center mb-16"
        >
          <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-4">
            Creative Philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
            The Vision Behind the Art
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Three pillars that guide every creation, ensuring each piece resonates with meaning and purpose.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {philosophyPillars.map((pillar, index) => (
            <PillarCard key={pillar.title} {...pillar} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
