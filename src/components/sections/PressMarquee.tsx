/**
 * Press & Brand Marquee
 *
 * Simplified infinite scrolling marquee (matching reference)
 * Features:
 * - Single row with larger text
 * - Combined press & brand logos
 * - Clean, minimal design
 */

import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED PRESS & BRAND DATA
// ═══════════════════════════════════════════════════════════════════════════

const featuredIn = [
  'CNN',
  'Forbes',
  'Bloomberg',
  'BBC',
  'Canon',
  'Ferrari',
  'Maserati',
  'Jacob & Co',
  'Art Dubai',
  'Nivea',
  'CNBC',
  'Cartier'
];

// ═══════════════════════════════════════════════════════════════════════════
// PRESS MARQUEE MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PressMarquee() {
  // Double items for seamless loop
  const doubledItems = [...featuredIn, ...featuredIn];

  return (
    <section className="py-16 border-y border-white/5 bg-luxury-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        {/* Label */}
        <p className="text-center text-xs tracking-[0.25em] uppercase text-white/40 mb-10">
          As Featured In
        </p>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling content */}
          <motion.div
            className="flex items-center gap-16 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {doubledItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="font-display text-xl tracking-wider text-white/40 hover:text-gold-500 transition-colors duration-300 cursor-default"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
