/**
 * SoundBYTE Originals™ Section
 *
 * Focus: Premium bespoke art commissions
 *
 * Clean, minimal design that:
 * - Explains what a SoundBYTE Original is
 * - Shows the process simply
 * - Provides price expectation
 * - Drives to commission
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import {
  Mic,
  AudioWaveform,
  Paintbrush,
  Package,
  ArrowRight,
  Quote,
  Clock,
  MessageSquare,
  type LucideIcon
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS STEPS DATA
// ═══════════════════════════════════════════════════════════════════════════

const processSteps = [
  { icon: Mic, title: 'Capture', description: 'Record your meaningful sound or voice' },
  { icon: AudioWaveform, title: 'Analyze', description: 'Amrita studies the unique frequency patterns' },
  { icon: Paintbrush, title: 'Create', description: 'Hand-painted with gold leaf and premium materials' },
  { icon: Package, title: 'Deliver', description: 'Museum-ready with certificate of authenticity' }
];

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS STEP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function ProcessStep({ icon: Icon, title, description }: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-500 mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-display text-lg text-white font-semibold mb-2">{title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SOUNDBYTE SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SoundByteSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section
      id="soundbyte"
      className="relative py-24 sm:py-32 bg-luxury-black"
    >
      <Container size="lg">
        {/* Header */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <p className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Premium Commissions
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            SoundBYTE <span className="text-gold-500">Originals™</span>
          </h2>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Transform your most meaningful sounds into museum-quality fine art.
            Each piece is a one-of-a-kind masterpiece, handcrafted by Amrita.
          </p>
        </motion.div>

        {/* What is a SoundBYTE */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-20"
        >
          <div className="max-w-3xl mx-auto text-center p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="font-display text-xl sm:text-2xl text-white font-semibold mb-4">
              What is a SoundBYTE Original?
            </h3>
            <p className="text-white/60 leading-relaxed mb-6">
              A SoundBYTE Original captures the unique waveform of a voice or sound—wedding vows,
              a baby's first words, a loved one's message—and transforms it into a physical artwork.
              Created with 24k gold leaf, metallic pigments, and archival materials on gallery-grade canvas.
            </p>
            <p className="text-gold-500/80 text-sm italic inline-flex items-center gap-2">
              <Quote className="w-4 h-4 text-gold-500/50" />
              A word is worth a thousand pictures.
            </p>
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="font-display text-xl text-white text-center mb-10">
            The Process
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <ProcessStep key={step.title} {...step} />
            ))}
          </div>
        </motion.div>

        {/* Investment & CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          {/* Price anchor */}
          <p className="text-white/40 text-sm mb-2">Investment</p>
          <p className="text-white/80 text-xl sm:text-2xl mb-8">
            Custom pieces from <span className="text-gold-500 font-semibold">$3,500</span>
          </p>

          {/* CTA */}
          <Link to="/commission">
            <Button variant="primary" size="lg" className="group">
              <span>Commission Your Piece</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <p className="mt-4 text-white/40 text-sm inline-flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Complimentary consultation
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              6-8 week creation time
            </span>
          </p>
        </motion.div>
      </Container>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
