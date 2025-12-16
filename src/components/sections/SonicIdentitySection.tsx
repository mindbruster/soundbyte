/**
 * Sonic Identity™ Section
 *
 * Focus: Accessible, instant digital art product
 *
 * Key differentiator from SoundBYTE Originals:
 * - More affordable (from $99)
 * - Instant/digital-first
 * - Perfect for gifts
 * - Ships worldwide
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

// ═══════════════════════════════════════════════════════════════════════════
// SONIC IDENTITY SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SonicIdentitySection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const occasions = [
    'Wedding Vows',
    'Baby\'s First Words',
    'Memorial Tribute',
    'Anniversary',
    'Love Message',
    'Pet Sounds'
  ];

  return (
    <section
      id="sonic-identity"
      className="relative py-24 sm:py-32 bg-luxury-charcoal"
    >
      <Container size="lg">
        {/* Header */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <p className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Instant Digital Art
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Sonic <span className="text-gold-500">Identity™</span>
          </h2>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Experience Amrita's signature sound-to-art technology instantly and affordably.
            The perfect meaningful gift, ready in minutes.
          </p>

          {/* Value props */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-500 text-sm font-medium">
              From $99
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
              Ready in Minutes
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm">
              Ships Worldwide
            </span>
          </div>
        </motion.div>

        {/* How it works - Simple 3 steps */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Record', desc: 'Upload any voice or sound' },
              { step: '2', title: 'Customize', desc: 'Choose style and format' },
              { step: '3', title: 'Receive', desc: 'Download or get it shipped' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h4 className="font-display text-lg text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gift occasions */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest mb-6">Perfect for</p>
          <div className="flex flex-wrap justify-center gap-3">
            {occasions.map((occasion) => (
              <span
                key={occasion}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
              >
                {occasion}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/sonic-identity">
            <Button variant="primary" size="lg">
              Create Your Sonic Identity™
            </Button>
          </Link>
          <p className="mt-4 text-white/40 text-sm">
            Free preview • Digital + print options
          </p>
        </motion.div>
      </Container>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
