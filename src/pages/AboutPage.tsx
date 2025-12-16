/**
 * About Page
 *
 * Comprehensive artist biography and credentials page.
 * Features:
 * - Full artist story
 * - Complete exhibitions list
 * - Awards and achievements
 * - Press coverage
 * - Statistics
 */

import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../components/ui/Container';
import { Heading, Text, Label } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { ScrollReveal, StaggerReveal } from '../components/animations/ScrollReveal';
import {
  statistics,
  exhibitions,
  achievements,
  pressFeatures,
  globalPresence,
  notableCollectors
} from '../data/achievements';
import { springs, durations, staggers } from '../lib/animations';
import { cn } from '../lib/utils';

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
        transition={{ delay, duration: durations.smooth, type: 'spring', ...springs.gentle }}
      >
        <div className="flex items-baseline justify-center gap-1 mb-2">
          {prefix && (
            <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gold-500/70">
              {prefix}
            </span>
          )}
          <span className="stat-value font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-gold">
            0
          </span>
          <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gold-500/70">
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
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
        <span className="text-xs text-gold-500 font-medium">{year}</span>
      </div>

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
  image?: string;
}

function AchievementCard({ title, description, location, year, type, image }: AchievementCardProps) {
  const typeColors = {
    exhibition: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    award: 'bg-gold-500/20 text-gold-400 border-gold-500/30',
    press: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    milestone: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold-500/30 transition-all duration-500 overflow-hidden"
    >
      {image && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium border capitalize',
            typeColors[type as keyof typeof typeColors] || typeColors.milestone
          )}>
            {type}
          </span>
          <span className="text-white/40 text-sm">{year}</span>
          {location && (
            <span className="text-white/40 text-sm">• {location}</span>
          )}
        </div>
        <h4 className="font-display text-lg sm:text-xl text-white font-semibold mb-2 group-hover:text-gold-500 transition-colors">
          {title}
        </h4>
        {description && (
          <p className="text-white/60 text-sm leading-relaxed">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRESS MARQUEE
// ═══════════════════════════════════════════════════════════════════════════

function PressMarquee() {
  const doubledLogos = [...pressFeatures, ...pressFeatures];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-4"
        animate={{ x: [0, -50 * pressFeatures.length] }}
        transition={{ x: { duration: 20, repeat: Infinity, ease: 'linear' } }}
      >
        {doubledLogos.map((press, index) => (
          <motion.div
            key={`${press.id}-${index}`}
            className="flex items-center justify-center px-8 py-4"
            whileHover={{ scale: 1.1 }}
          >
            <span className="font-display text-xl sm:text-2xl font-medium tracking-wide text-white/35 hover:text-gold-500 transition-colors cursor-default">
              {press.publication}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ABOUT PAGE MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function AboutPage() {
  return (
    <section className="relative py-32 sm:py-40 bg-luxury-black min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <Container size="xl">
        {/* Back link */}
        <ScrollReveal direction="up" className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </ScrollReveal>

        {/* Hero section with profile */}
        <ScrollReveal direction="up" className="text-center mb-20">
          <Label variant="gold" className="mb-4">The Artist</Label>
          <Heading as="h1" size="hero" align="center" className="mb-8">
            amrita <span className="text-gradient-gold">sethi</span>
          </Heading>

          {/* Profile image */}
          <motion.div
            className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
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
            <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-2xl" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold-500/50 shadow-2xl shadow-gold-500/20">
              <img
                src="/images/profile/amrita.avif"
                alt="Amrita Sethi"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <Text size="xl" color="secondary" align="center" className="max-w-3xl mx-auto mb-4">
            Sound Artist • Inventor of SoundBYTEs® • Dubai's First NFT Artist
          </Text>
          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            "I pioneer the frontier where art, sound, and technology meet — giving identity a new visual form."
          </Text>
        </ScrollReveal>

        {/* Artist story */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10">
              <h2 className="font-display text-2xl sm:text-3xl text-white font-semibold mb-6">
                The Story
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  amrita sethi is a pioneering sound artist who transforms voice and sound into
                  stunning visual masterpieces. Based in Dubai, she has revolutionized the art
                  world by creating an entirely new medium — the SoundBYTE® — which captures
                  the unique frequency patterns of human voice and translates them into
                  one-of-a-kind artworks.
                </p>
                <p>
                  Her journey began with a simple question: "What does my voice look like?"
                  This curiosity led to years of experimentation with sound visualization
                  technology, eventually developing her signature technique that combines
                  traditional artistic craftsmanship with cutting-edge digital analysis.
                </p>
                <p>
                  Today, her SoundBYTE® Originals hang in the collections of royalty, Fortune 500
                  executives, Hollywood celebrities, and art collectors worldwide. Each piece is
                  a unique testament to the person whose voice it represents — a visual
                  fingerprint that captures their essence in gold leaf, metallic pigments, and
                  museum-grade materials.
                </p>
                <p>
                  As Dubai's first NFT artist and a record-breaking pioneer in the digital art
                  space, Amrita continues to push boundaries. Her work has been featured in
                  prestigious venues from the Louvre Abu Dhabi to Art Basel Miami, and has been
                  covered by CNN, Forbes, Bloomberg, and BBC.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Statistics */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
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
        </ScrollReveal>

        {/* Artist Gallery */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="text-center mb-8">
            <Label variant="gold">Behind The Art</Label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[2, 3, 4, 5, 6].map((num, index) => (
              <motion.div
                key={num}
                className="relative group aspect-square overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <img
                  src={`/images/artist/amrita${num}.avif`}
                  alt={`Amrita Sethi at work ${num}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 rounded-2xl border-2 border-gold-500/0 group-hover:border-gold-500/50 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Global Presence */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="text-center mb-8">
            <Label variant="gold">Global Presence</Label>
            <h3 className="font-display text-2xl text-white mt-4">
              Exhibited & Collected Worldwide
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {globalPresence.map((city) => (
              <span
                key={city}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:border-gold-500/30 hover:text-gold-500 transition-colors"
              >
                {city}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Awards & Achievements */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="text-center mb-12">
            <Label variant="gold">Recognition</Label>
            <h3 className="font-display text-3xl text-white mt-4">
              Awards & Achievements
            </h3>
          </div>
          <StaggerReveal direction="up" stagger={staggers.smooth} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                location={achievement.location}
                year={achievement.year}
                type={achievement.type}
                image={achievement.image}
              />
            ))}
          </StaggerReveal>
        </ScrollReveal>

        {/* Exhibitions */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="text-center mb-12">
            <Label variant="gold">Exhibitions</Label>
            <h3 className="font-display text-3xl text-white mt-4">
              Featured Exhibitions
            </h3>
          </div>
          <StaggerReveal direction="up" stagger={staggers.smooth} className="grid sm:grid-cols-2 gap-6">
            {exhibitions.map((exhibition) => (
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
        </ScrollReveal>

        {/* Notable Collectors */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="text-center mb-8">
            <Label variant="gold">Collected By</Label>
            <h3 className="font-display text-2xl text-white mt-4">
              Notable Collectors
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {notableCollectors.map((collector) => (
              <span
                key={collector}
                className="px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500/80 text-sm"
              >
                {collector}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Press Features */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="text-center mb-8">
            <Label variant="gold">As Featured In</Label>
          </div>
          <PressMarquee />
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" className="text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10">
            <h3 className="font-display text-2xl sm:text-3xl text-white font-semibold mb-4">
              Ready to Create Your Own SoundBYTE®?
            </h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Commission a one-of-a-kind artwork that transforms your voice into timeless visual art.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/commission">
                <Button variant="primary" size="lg">
                  Start Your Commission
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" size="lg">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
