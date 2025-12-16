/**
 * Exhibitions Section - Her Exhibitions & Public Art
 *
 * Showcases:
 * - Major exhibitions
 * - Public art installations
 * - Record-breaking achievements
 * - Global presence
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// EXHIBITIONS DATA
// ═══════════════════════════════════════════════════════════════════════════

const exhibitions = [
  {
    id: 'art-dubai-2026',
    title: 'Art Dubai 2026',
    subtitle: 'Presents of Sound',
    location: 'Dubai, UAE',
    date: 'March 2026',
    description: 'A groundbreaking exhibition featuring 145 new works exploring the intersection of voice, memory, and visual art.',
    stats: [
      { value: '145', label: 'New Works' },
      { value: '2026', label: 'Year' }
    ],
    featured: true,
    gradient: 'from-gold-500/20 via-gold-500/5 to-transparent'
  },
  {
    id: 'ar-mural',
    title: "World's Largest AR NFT Mural",
    subtitle: 'DIFC Public Installation',
    location: 'DIFC, Dubai',
    date: '2022',
    description: 'A record-breaking 60,000 sq ft AR-enabled public mural — the first of its kind in the Middle East, combining physical art with digital innovation.',
    stats: [
      { value: '60K', label: 'Sq Ft' },
      { value: '$60K', label: 'Value' }
    ],
    featured: false,
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent'
  },
  {
    id: 'museum-future',
    title: 'Museum of the Future',
    subtitle: 'Permanent Collection',
    location: 'Dubai, UAE',
    date: '2023',
    description: 'Featured in the Museum of the Future\'s permanent collection, representing the convergence of art and technology in the UAE.',
    stats: [
      { value: '1', label: 'Permanent Piece' }
    ],
    featured: false,
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// EXHIBITION CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ExhibitionCardProps {
  title: string;
  subtitle: string;
  location: string;
  date: string;
  description: string;
  stats: { value: string; label: string }[];
  featured: boolean;
  gradient: string;
  index: number;
}

function ExhibitionCard({
  title,
  subtitle,
  location,
  date,
  description,
  stats,
  featured,
  gradient,
  index
}: ExhibitionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, ...springs.waveGentle }}
      className={`group relative rounded-xl overflow-hidden transition-all duration-500 ${
        featured
          ? 'lg:col-span-2 lg:row-span-2'
          : ''
      }`}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="absolute inset-0 bg-luxury-gray/40" />

      {/* Content */}
      <div className={`relative z-10 p-6 sm:p-8 ${featured ? 'lg:p-12' : ''} h-full flex flex-col`}>
        {/* Badge */}
        {featured && (
          <div className="absolute top-6 right-6 px-3 py-1 bg-gold-500/90 text-luxury-black text-xs font-medium tracking-wider uppercase rounded-full">
            Coming Soon
          </div>
        )}

        {/* Date & Location */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gold-500 text-xs uppercase tracking-widest">{date}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-white/40 text-xs">{location}</span>
        </div>

        {/* Subtitle */}
        <p className="text-gold-500/70 text-sm mb-2">{subtitle}</p>

        {/* Title */}
        <h3 className={`font-display text-white group-hover:text-gold-500 transition-colors mb-4 ${
          featured ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl'
        }`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`text-white/50 leading-relaxed mb-6 flex-grow ${
          featured ? 'text-base lg:text-lg max-w-2xl' : 'text-sm'
        }`}>
          {description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className={`font-display text-gold-500 ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                {stat.value}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Border on hover */}
      <div className="absolute inset-0 rounded-xl border border-white/5 group-hover:border-gold-500/30 transition-colors pointer-events-none" />
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ACHIEVEMENT HIGHLIGHTS
// ═══════════════════════════════════════════════════════════════════════════

const achievements = [
  { value: 'First', label: 'NFT Artist in UAE' },
  { value: '$102K', label: 'Highest NFT Sale' },
  { value: '1M+', label: 'Global Followers' },
  { value: 'World', label: 'Record Holder' }
];

// ═══════════════════════════════════════════════════════════════════════════
// EXHIBITIONS SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ExhibitionsSection() {
  return (
    <section className="py-24 sm:py-32 bg-luxury-charcoal relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="text-center mb-16"
        >
          <p className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Global Presence
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Exhibitions & <span className="text-gradient-gold font-semibold">Public Art</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            From record-breaking installations to prestigious exhibitions, Amrita's work
            transforms public spaces and challenges the boundaries of art.
          </p>
        </motion.div>

        {/* Achievement highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, ...springs.waveGentle }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <p className="font-display text-2xl sm:text-3xl text-gold-500 mb-1">{achievement.value}</p>
              <p className="text-white/40 text-xs uppercase tracking-wider">{achievement.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Exhibitions grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {exhibitions.map((exhibition, index) => (
            <ExhibitionCard key={exhibition.id} {...exhibition} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/about">
            <Button variant="outline" size="lg">
              Learn More About Amrita
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
