/**
 * Portfolio Section (Collections)
 *
 * Focus: Showcase Amrita's artwork
 * Clean grid layout with hover effects
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

// ═══════════════════════════════════════════════════════════════════════════
// ARTWORK DATA
// ═══════════════════════════════════════════════════════════════════════════

const featuredWorks = [
  {
    id: 1,
    title: 'Voice of Dubai',
    collection: 'SoundBYTE Originals',
    year: 2023,
    image: '/images/portfolio/work1.jpg'
  },
  {
    id: 2,
    title: 'Eternal Vows',
    collection: 'Commission Series',
    year: 2023,
    image: '/images/portfolio/work2.jpg'
  },
  {
    id: 3,
    title: 'First Words',
    collection: 'SoundBYTE Originals',
    year: 2024,
    image: '/images/portfolio/work3.jpg'
  },
  {
    id: 4,
    title: 'Symphony of Light',
    collection: 'Exhibition Piece',
    year: 2024,
    image: '/images/portfolio/work4.jpg'
  },
  {
    id: 5,
    title: 'Golden Frequencies',
    collection: 'Art Dubai',
    year: 2024,
    image: '/images/portfolio/work5.jpg'
  },
  {
    id: 6,
    title: 'Heritage',
    collection: 'Cultural Series',
    year: 2023,
    image: '/images/portfolio/work6.jpg'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// ARTWORK CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ArtworkCardProps {
  title: string;
  collection: string;
  year: number;
  image: string;
  index: number;
}

function ArtworkCard({ title, collection, year, image, index }: ArtworkCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-luxury-charcoal cursor-pointer"
    >
      {/* Image placeholder - gradient for now */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gold-500/20 via-luxury-charcoal to-luxury-black transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <p className="text-gold-500/80 text-xs uppercase tracking-widest mb-2">
          {collection}
        </p>
        <h3 className="font-display text-xl text-white font-semibold mb-1 group-hover:text-gold-500 transition-colors">
          {title}
        </h3>
        <p className="text-white/40 text-sm">{year}</p>
      </div>

      {/* Hover border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gold-500/30 transition-colors duration-300" />
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PORTFOLIO SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PortfolioSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-32 bg-luxury-black"
    >
      <Container size="xl">
        {/* Header */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <p className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Selected Works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Collections
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A curated selection of SoundBYTE Originals, commissions, and exhibition pieces.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredWorks.map((work, index) => (
            <ArtworkCard key={work.id} {...work} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeIn} className="text-center">
          <Link to="/portfolio">
            <Button variant="outline" size="lg">
              View All Collections
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
