/**
 * Legacy Section
 *
 * Establishes Amrita's authority through achievements, exhibitions, and awards.
 * This section comes BEFORE showcasing products to build credibility.
 *
 * Features:
 * - Animated statistics counter
 * - Exhibition timeline/grid
 * - Press logos carousel
 * - Achievement highlights
 */

import { useRef, useLayoutEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { Heading, Text, Label } from '../ui/Typography';
import { ScrollReveal, StaggerReveal } from '../animations/ScrollReveal';
import {
  statistics,
  getFeaturedExhibitions,
  getFeaturedAchievements,
  pressFeatures
} from '../../data/achievements';
import { springs, durations, staggers } from '../../lib/animations';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}

function StatCounter({ value, prefix = '', suffix = '', label, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useLayoutEffect(() => {
    if (!isInView || !ref.current) return;

    const element = ref.current.querySelector('.stat-value');
    if (!element) return;

    gsap.fromTo(
      { val: 0 },
      { val: value },
      {
        val: value,
        duration: 2,
        delay,
        ease: 'power2.out',
        onUpdate: function () {
          element.textContent = Math.round(this.targets()[0].val).toString();
        }
      }
    );
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay,
          duration: durations.smooth,
          type: 'spring',
          ...springs.gentle
        }}
      >
        <div className="flex items-baseline justify-center gap-1 mb-2">
          {prefix && (
            <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gold-500/70">
              {prefix}
            </span>
          )}
          <span className="stat-value font-display text-5xl sm:text-6xl md:text-7xl font-bold text-gradient-gold">
            0
          </span>
          <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gold-500/70">
            {suffix}
          </span>
        </div>
        <p className="text-white/60 text-sm sm:text-base uppercase tracking-widest">
          {label}
        </p>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXHIBITION CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ExhibitionCardProps {
  name: string;
  venue: string;
  location: string;
  year: number;
  description?: string;
}

function ExhibitionCard({ name, venue, location, year, description }: ExhibitionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', ...springs.snappy }}
      className={cn(
        'group relative p-6 sm:p-8 rounded-2xl',
        'bg-white/[0.02] hover:bg-white/[0.05]',
        'border border-white/5 hover:border-gold-500/20',
        'transition-colors duration-500'
      )}
    >
      {/* Year badge */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
        <span className="text-xs text-gold-500 font-medium">{year}</span>
      </div>

      {/* Content */}
      <div>
        <h4 className="font-display text-xl sm:text-2xl text-white font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
          {name}
        </h4>
        <p className="text-gold-500/80 font-medium mb-1">{venue}</p>
        <p className="text-white/40 text-sm mb-3">{location}</p>
        {description && (
          <p className="text-white/60 text-sm leading-relaxed">{description}</p>
        )}
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ACHIEVEMENT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface AchievementCardProps {
  title: string;
  description?: string;
  location?: string;
  year: number;
  type: string;
}

function AchievementCard({ title, description, location, year, type }: AchievementCardProps) {
  const typeColors = {
    exhibition: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    award: 'bg-gold-500/20 text-gold-400 border-gold-500/30',
    press: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    milestone: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className="flex gap-4 sm:gap-6">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-gold-500" />
        <div className="flex-1 w-px bg-white/10" />
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium border',
            typeColors[type as keyof typeof typeColors] || typeColors.milestone
          )}>
            {type}
          </span>
          <span className="text-white/40 text-sm">{year}</span>
          {location && (
            <span className="text-white/40 text-sm">• {location}</span>
          )}
        </div>
        <h4 className="font-display text-lg sm:text-xl text-white font-semibold mb-1">
          {title}
        </h4>
        {description && (
          <p className="text-white/60 text-sm leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED PRESS MARQUEE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface PressLogoProps {
  publication: string;
}

function PressLogo({ publication }: PressLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center justify-center px-8 py-4 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      <motion.span
        className="font-display text-xl sm:text-2xl font-medium tracking-wide cursor-default relative"
        animate={{
          color: isHovered ? '#d4a853' : 'rgba(255,255,255,0.35)',
        }}
        transition={{ duration: 0.3 }}
      >
        {publication}
        {/* Underline animation */}
        <motion.span
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
    </motion.div>
  );
}

function PressMarquee() {
  // Double the logos for seamless infinite scroll
  const doubledLogos = [...pressFeatures, ...pressFeatures];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <motion.div
        className="flex items-center gap-4"
        animate={{
          x: [0, -50 * pressFeatures.length],
        }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {doubledLogos.map((press, index) => (
          <PressLogo
            key={`${press.id}-${index}`}
            publication={press.publication}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LEGACY SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredExhibitions = getFeaturedExhibitions();
  const featuredAchievements = getFeaturedAchievements();

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative py-24 sm:py-32 lg:py-40 bg-luxury-black overflow-hidden"
    >
      {/* Background gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      {/* Section header */}
      <Container size="xl">
        <ScrollReveal direction="up" className="text-center mb-16 sm:mb-20">
          <Label variant="gold" className="mb-4">Record-Breaking. Industry-Defining. Globally Recognized.</Label>
          <Heading as="h2" size="title" align="center" className="mb-6">
            Why <span className="text-gradient-gold">Amrita</span> Matters
          </Heading>

          {/* Artist Profile Image */}
          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto my-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            {/* Decorative rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-3 rounded-full border border-gold-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-6 rounded-full border border-gold-500/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-2xl" />

            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold-500/50 shadow-2xl shadow-gold-500/20">
              <img
                src="/images/profile/amrita.avif"
                alt="Amrita Sethi"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            "I pioneer the frontier where art, sound, and technology meet — giving identity a new visual form."
          </Text>
          <Text size="base" color="muted" align="center" className="max-w-xl mx-auto mt-4">
            Inspiring transformation through the power of voice, story, and visual expression.
          </Text>
        </ScrollReveal>

        {/* Statistics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-24 sm:mb-32">
          {statistics.map((stat, index) => (
            <StatCounter
              key={stat.id}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* Two-column layout: Exhibitions + Achievements */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Featured Exhibitions */}
          <div>
            <ScrollReveal direction="left">
              <Label variant="outline" className="mb-6">Featured Exhibitions</Label>
            </ScrollReveal>
            <StaggerReveal
              direction="up"
              stagger={staggers.smooth}
              className="space-y-4"
            >
              {featuredExhibitions.slice(0, 4).map((exhibition) => (
                <ExhibitionCard
                  key={exhibition.id}
                  name={exhibition.name}
                  venue={exhibition.venue}
                  location={exhibition.location}
                  year={exhibition.year}
                  description={exhibition.description}
                />
              ))}
            </StaggerReveal>
          </div>

          {/* Key Achievements Timeline */}
          <div>
            <ScrollReveal direction="right">
              <Label variant="outline" className="mb-6">Key Achievements</Label>
            </ScrollReveal>
            <StaggerReveal
              direction="up"
              stagger={staggers.smooth}
            >
              {featuredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  location={achievement.location}
                  year={achievement.year}
                  type={achievement.type}
                />
              ))}
            </StaggerReveal>
          </div>
        </div>

        {/* Press features marquee */}
        <ScrollReveal direction="up" className="mt-24 sm:mt-32">
          <div className="text-center mb-8">
            <Label variant="gold">As Featured In</Label>
          </div>
          <PressMarquee />
        </ScrollReveal>
      </Container>

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-luxury-charcoal to-transparent" />
    </section>
  );
}
