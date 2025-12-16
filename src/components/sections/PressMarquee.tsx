/**
 * Press & Brand Marquee
 *
 * Infinite scrolling marquee showing:
 * - Press features (CNN, Forbes, Bloomberg, BBC)
 * - Brand collaborations (Ferrari, Maserati, Jacob & Co, Canon)
 *
 * Purpose: Build credibility immediately after hero
 */

import { motion } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════
// PRESS & BRAND DATA
// ═══════════════════════════════════════════════════════════════════════════

const pressLogos = [
  'CNN',
  'Forbes',
  'Bloomberg',
  'BBC',
  'CNBC',
  'CoinMarketCap',
  'Gulf News',
  'Arab News'
];

const brandLogos = [
  'Ferrari',
  'Maserati',
  'Jacob & Co',
  'Canon',
  'DIFC',
  'Art Dubai',
  'Expo 2020',
  'Cartier'
];

// ═══════════════════════════════════════════════════════════════════════════
// MARQUEE ROW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface MarqueeRowProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  label: string;
}

function MarqueeRow({ items, direction = 'left', speed = 30, label }: MarqueeRowProps) {
  // Double items for seamless loop
  const doubledItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Label */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-luxury-black pr-4">
        <span className="text-xs text-white/30 uppercase tracking-[0.15em]">{label}</span>
      </div>

      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling content */}
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {doubledItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-white/40 text-sm sm:text-base font-medium tracking-wide hover:text-gold-500 transition-colors duration-300 cursor-default"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRESS MARQUEE MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PressMarquee() {
  return (
    <section className="relative py-8 sm:py-12 bg-luxury-black border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Press row */}
        <MarqueeRow
          items={pressLogos}
          direction="left"
          speed={35}
          label="Featured in"
        />

        {/* Divider */}
        <div className="h-px bg-white/5 mx-16" />

        {/* Brands row */}
        <MarqueeRow
          items={brandLogos}
          direction="right"
          speed={40}
          label="Partnered with"
        />
      </div>
    </section>
  );
}
