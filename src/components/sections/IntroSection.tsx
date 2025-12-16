/**
 * Intro Section - Who is Amrita Sethi
 *
 * Core identity introduction:
 * - First NFT artist in UAE
 * - Pioneer of phygital art
 * - Inventor of SoundBYTEs
 * - Thought leader at intersection of art, tech, and consciousness
 * - Philosophy: "Inspiring change through art and technology"
 */

import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// CREDENTIAL BADGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface CredentialProps {
  label: string;
  index: number;
}

function Credential({ label, index }: CredentialProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1, ...springs.waveGentle }}
      className="px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-sm font-medium"
    >
      {label}
    </motion.span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INTRO SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function IntroSection() {
  const credentials = [
    "First NFT Artist in UAE",
    "Pioneer of Phygital Art",
    "Inventor of SoundBYTEs®",
    "Web3 Thought Leader"
  ];

  const collaborators = [
    "Ferrari",
    "Maserati",
    "Canon",
    "Jacob & Co",
    "Meta",
    "Museum of the Future"
  ];

  return (
    <section className="py-24 sm:py-32 bg-luxury-black relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-gray/10 to-luxury-black pointer-events-none" />

      <Container size="lg" className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="text-center mb-12"
        >
          <p className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            The Artist
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Who is <span className="text-gradient-gold font-semibold">Amrita Sethi</span>?
          </h2>
        </motion.div>

        {/* Main intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, ...springs.waveGentle }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-6">
            Amrita Sethi is a <span className="text-gold-500">category creator</span> who uses technology
            as a creative instrument to drive human transformation. As the inventor of{' '}
            <span className="text-white font-medium">SoundBYTEs®</span> — an original, copyrighted art genre —
            she transforms voice and sound into visual masterpieces that carry meaning, emotion, and identity.
          </p>
          <p className="text-white/60 text-lg leading-relaxed">
            Her work exists at the intersection of <span className="text-white/80">art</span>,{' '}
            <span className="text-white/80">technology</span>, and{' '}
            <span className="text-white/80">human consciousness</span>,
            using augmented reality, NFTs, and immersive experiences as extensions of human expression —
            never replacements.
          </p>
        </motion.div>

        {/* Credentials badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {credentials.map((credential, index) => (
            <Credential key={credential} label={credential} index={index} />
          ))}
        </motion.div>

        {/* Philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, ...springs.waveGentle }}
          className="max-w-3xl mx-auto text-center mb-16 p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="w-12 h-px bg-gold-500/50 mx-auto mb-6" />
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-light italic mb-4">
            "Inspiring change through art and technology"
          </blockquote>
          <p className="text-white/40 text-sm uppercase tracking-widest">
            Core Philosophy
          </p>
          <div className="w-12 h-px bg-gold-500/50 mx-auto mt-6" />
        </motion.div>

        {/* Trusted by / Collaborations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">
            Trusted by Global Brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {collaborators.map((brand, index) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="text-white/30 text-sm font-medium tracking-wide hover:text-gold-500/60 transition-colors"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
