/**
 * Signature Works Section
 *
 * Showcases Amrita's most notable works
 * Large cards with hover effects
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// SIGNATURE WORKS DATA
// ═══════════════════════════════════════════════════════════════════════════

const signatureWorks = [
  {
    id: 1,
    title: "World's Largest NFT AR Mural",
    description: "A groundbreaking 60,000 sq ft AR-enabled mural in Dubai, combining physical art with digital innovation.",
    stat: "$60K",
    statLabel: "Project Value",
    gradient: "from-gold-500/40 via-emerald-500/20 to-luxury-black"
  },
  {
    id: 2,
    title: "WTNFT!?",
    description: "What The NFT!? - An educational art series demystifying blockchain technology through visual storytelling.",
    stat: "10K+",
    statLabel: "Editions Sold",
    gradient: "from-emerald-500/30 via-gold-500/20 to-luxury-black"
  },
  {
    id: 3,
    title: "AlphaBYTEs",
    description: "A complete alphabet series where each letter is transformed into unique SoundBYTE artwork.",
    stat: "26",
    statLabel: "Unique Pieces",
    gradient: "from-gold-500/30 via-luxury-gray to-luxury-black"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// WORK CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface WorkCardProps {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  gradient: string;
  index: number;
}

function WorkCard({ title, description, stat, statLabel, gradient, index }: WorkCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, ...springs.waveGentle }}
      className="group relative overflow-hidden rounded-lg bg-luxury-gray/30 border border-white/5 hover:border-gold-500/30 transition-all duration-500"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative p-8 md:p-10">
        <h3 className="font-display text-2xl text-white group-hover:text-gold-500 transition-colors mb-4">
          {title}
        </h3>
        <p className="text-white/50 leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-3xl text-gold-500">{stat}</p>
            <p className="text-white/40 text-sm">{statLabel}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
            <svg className="w-5 h-5 text-white/40 group-hover:text-gold-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIGNATURE WORKS SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SignatureWorksSection() {
  return (
    <section className="py-32 bg-luxury-black">
      <Container size="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="text-center mb-16"
        >
          <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-4">
            Notable Projects
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Signature Works
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Groundbreaking projects that have defined the intersection of sound and visual art.
          </p>
        </motion.div>

        {/* Works grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {signatureWorks.map((work, index) => (
            <WorkCard key={work.id} {...work} index={index} />
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
              Explore All Works
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
