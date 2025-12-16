/**
 * Achievements Section
 *
 * Record-breaking accomplishments
 * Industry-defining milestones
 */

import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// ACHIEVEMENTS DATA
// ═══════════════════════════════════════════════════════════════════════════

const achievements = [
  {
    title: "World's Largest AR NFT Mural",
    stat: "60,000",
    unit: "sq ft",
    description: "A groundbreaking fusion of physical and digital art in Dubai"
  },
  {
    title: "Highest NFT Sale by UAE Artist",
    stat: "$102K",
    unit: "",
    description: "Setting records in the Middle East NFT art market"
  },
  {
    title: "Inventor of SoundBYTE®",
    stat: "2020",
    unit: "Est.",
    description: "Pioneering voice-to-art technology"
  },
  {
    title: "Global Media Acclaim",
    stat: "50+",
    unit: "Features",
    description: "CNN, Forbes, Bloomberg, BBC, and more"
  },
  {
    title: "Blue-Chip Partnerships",
    stat: "10+",
    unit: "Brands",
    description: "Ferrari, Maserati, Jacob & Co, Cartier"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// ACHIEVEMENT ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface AchievementItemProps {
  title: string;
  stat: string;
  unit: string;
  description: string;
  index: number;
  isFirst?: boolean;
}

function AchievementItem({ title, stat, unit, description, index, isFirst }: AchievementItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ...springs.waveGentle }}
      className={`flex items-start gap-6 ${isFirst ? '' : 'pt-6 border-t border-white/5'}`}
    >
      {/* Stat */}
      <div className="flex-shrink-0 w-24 text-right">
        <span className="font-display text-2xl md:text-3xl text-gold-500">{stat}</span>
        {unit && <span className="text-white/40 text-sm ml-1">{unit}</span>}
      </div>

      {/* Content */}
      <div>
        <h3 className={`font-display text-white mb-1 ${isFirst ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {title}
        </h3>
        <p className="text-white/50 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ACHIEVEMENTS SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function AchievementsSection() {
  return (
    <section className="py-32 bg-luxury-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springs.waveGentle }}
          >
            <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-6">
              Milestones
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              Record-Breaking.
            </h2>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              Industry-Defining.
            </h2>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-gradient-gold">
              Pioneering.
            </h2>
          </motion.div>

          {/* Right side - Achievement list */}
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <AchievementItem
                key={achievement.title}
                {...achievement}
                index={index}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
