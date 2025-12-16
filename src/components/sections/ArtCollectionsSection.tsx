/**
 * Art Collections Section - Her Artistic Systems
 *
 * Showcases Amrita's signature art systems:
 * - SoundBYTEs (foundational IP)
 * - AlphaBYTEs (language reinvented)
 * - CrystalBYTEs (consciousness & wellness)
 * - AIBYTEs (human + AI co-creation)
 * - AR SoundBYTEs (immersive experience)
 *
 * Each collection is presented as a "world" or "chapter"
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// ART SYSTEMS DATA
// ═══════════════════════════════════════════════════════════════════════════

const artSystems = [
  {
    id: 'soundbytes',
    title: 'SoundBYTEs',
    subtitle: 'The Foundational IP',
    description: 'The original copyrighted art genre that transforms words, names, emotions, and ideas into visual sound identities. Each piece begins with a voice recording, capturing the unique waveform that becomes a hand-drawn masterpiece.',
    highlight: 'See sound. Feel meaning.',
    gradient: 'from-gold-500/30 via-gold-500/10 to-transparent',
    iconPath: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z'
  },
  {
    id: 'alphabytes',
    title: 'AlphaBYTEs',
    subtitle: 'Language Reinvented',
    description: 'A new alphabet for the Web3 era. Each letter is a symbol derived from sound, existing both physically and digitally. Features the world\'s first physically fractionalized sculpture with digital twin NFTs.',
    highlight: 'Rewriting perception.',
    gradient: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    id: 'crystalbytes',
    title: 'CrystalBYTEs',
    subtitle: 'Consciousness & Wellness',
    description: 'A mindful meditation experience in VR combining sound, space, stillness, and intention. Art as healing, technology as a spiritual medium with consciousness embedded into digital environments.',
    highlight: 'Art as transformation.',
    gradient: 'from-purple-500/30 via-purple-500/10 to-transparent',
    iconPath: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
  },
  {
    id: 'aibytes',
    title: 'AIBYTEs',
    subtitle: 'Human + AI Co-Creation',
    description: 'Where AI generates imagery guided by human words, and soundwaves layer meaning back onto AI output. Human consciousness remains central — AI amplifies, never replaces authorship.',
    highlight: 'Future-facing, human-first.',
    gradient: 'from-blue-500/30 via-blue-500/10 to-transparent',
    iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: 'ar-soundbytes',
    title: 'AR SoundBYTEs',
    subtitle: 'Immersive Experience',
    description: 'Artworks that activate through your phone — sound, animation, and motion come alive. The viewer becomes part of the artwork, shifting from observer to participant.',
    highlight: 'Step inside the art.',
    gradient: 'from-pink-500/30 via-pink-500/10 to-transparent',
    iconPath: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// ART SYSTEM CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ArtSystemCardProps {
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  gradient: string;
  iconPath: string;
  index: number;
}

function ArtSystemCard({ title, subtitle, description, highlight, gradient, iconPath, index }: ArtSystemCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ...springs.waveGentle }}
      className="group relative p-6 sm:p-8 rounded-xl bg-luxury-gray/20 border border-white/5 hover:border-gold-500/30 transition-all duration-500 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
          <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
          </svg>
        </div>

        {/* Subtitle */}
        <p className="text-gold-500/70 text-xs uppercase tracking-widest mb-2">
          {subtitle}
        </p>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl text-white group-hover:text-gold-500 transition-colors mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Highlight */}
        <p className="text-gold-500/80 text-sm italic">
          "{highlight}"
        </p>
      </div>

      {/* Hover arrow indicator */}
      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ART COLLECTIONS SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ArtCollectionsSection() {
  return (
    <section className="py-24 sm:py-32 bg-luxury-black relative">
      <Container size="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="text-center mb-16"
        >
          <p className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4">
            The Art Systems
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Her <span className="text-gradient-gold font-semibold">Artistic Worlds</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Each collection is not just a project — it is a system. A complete artistic language
            that transforms how we perceive sound, identity, and meaning.
          </p>
        </motion.div>

        {/* Art systems grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {artSystems.map((system, index) => (
            <ArtSystemCard key={system.id} {...system} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/portfolio">
            <Button variant="outline" size="lg">
              Explore All Collections
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
