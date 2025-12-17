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
import {
  Music,
  BookOpen,
  Moon,
  Monitor,
  Video,
  ChevronRight,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';

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
    icon: Music
  },
  {
    id: 'alphabytes',
    title: 'AlphaBYTEs',
    subtitle: 'Language Reinvented',
    description: 'A new alphabet for the Web3 era. Each letter is a symbol derived from sound, existing both physically and digitally. Features the world\'s first physically fractionalized sculpture with digital twin NFTs.',
    highlight: 'Rewriting perception.',
    gradient: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
    icon: BookOpen
  },
  {
    id: 'crystalbytes',
    title: 'CrystalBYTEs',
    subtitle: 'Consciousness & Wellness',
    description: 'A mindful meditation experience in VR combining sound, space, stillness, and intention. Art as healing, technology as a spiritual medium with consciousness embedded into digital environments.',
    highlight: 'Art as transformation.',
    gradient: 'from-purple-500/30 via-purple-500/10 to-transparent',
    icon: Moon
  },
  {
    id: 'aibytes',
    title: 'AIBYTEs',
    subtitle: 'Human + AI Co-Creation',
    description: 'Where AI generates imagery guided by human words, and soundwaves layer meaning back onto AI output. Human consciousness remains central — AI amplifies, never replaces authorship.',
    highlight: 'Future-facing, human-first.',
    gradient: 'from-blue-500/30 via-blue-500/10 to-transparent',
    icon: Monitor
  },
  {
    id: 'ar-soundbytes',
    title: 'AR SoundBYTEs',
    subtitle: 'Immersive Experience',
    description: 'Artworks that activate through your phone — sound, animation, and motion come alive. The viewer becomes part of the artwork, shifting from observer to participant.',
    highlight: 'Step inside the art.',
    gradient: 'from-pink-500/30 via-pink-500/10 to-transparent',
    icon: Video
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
  icon: LucideIcon;
  index: number;
}

function ArtSystemCard({ title, subtitle, description, highlight, gradient, icon: Icon, index }: ArtSystemCardProps) {
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
          <Icon className="w-6 h-6 text-gold-500" />
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
        <ChevronRight className="w-4 h-4 text-gold-500" />
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
            <Button variant="outline" size="lg" className="group">
              <span>Explore All Collections</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
