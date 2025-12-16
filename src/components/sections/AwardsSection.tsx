/**
 * Awards Section
 *
 * Showcases Amrita's prestigious awards with stunning 3D animations.
 * Features:
 * - 3D trophy/medal cards with tilt effects
 * - Animated shine/glitter effects
 * - Floating particles
 * - Staggered reveal animations
 */

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Container } from '../ui/Container';
import { Heading, Text, Label } from '../ui/Typography';
import { ScrollReveal } from '../animations/ScrollReveal';
import { getFeaturedAchievements } from '../../data/achievements';
import { cn } from '../../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING PARTICLES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gold-500/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -1200],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// AWARD CARD COMPONENT - 3D Tilt with Shine Effect
// ═══════════════════════════════════════════════════════════════════════════

interface AwardCardProps {
  title: string;
  description?: string;
  location?: string;
  year: number;
  type: string;
  index: number;
  image?: string;
}

function AwardCard({ title, description, year, index, image }: AwardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring animation for tilt
  const springConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [20, -20]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);

  // Shine effect position
  const shineX = useSpring(useTransform(mouseX, [0, 1], [-100, 200]), springConfig);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  // Award icon based on type
  const awardIcons = {
    award: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 sm:w-16 sm:h-16">
        <motion.path
          d="M12 15l-3.09 1.64.59-3.44-2.5-2.44 3.46-.5L12 7l1.54 3.26 3.46.5-2.5 2.44.59 3.44L12 15z"
          fill="currentColor"
          className="text-gold-400"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-gold-500/50"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ delay: index * 0.2, duration: 1 }}
        />
      </svg>
    ),
    milestone: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 sm:w-16 sm:h-16">
        <motion.path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          className="text-gold-400"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 150 }}
        />
      </svg>
    ),
    press: (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 sm:w-16 sm:h-16">
        <motion.rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-gold-500/50"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ delay: index * 0.2, duration: 1 }}
        />
        <motion.path
          d="M7 7h10M7 12h10M7 17h6"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold-400"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
        />
      </svg>
    ),
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="relative group cursor-pointer"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
        }}
        animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />

      {/* Card container */}
      <div
        className={cn(
          'relative p-6 sm:p-8 rounded-2xl overflow-hidden',
          'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
          'border border-gold-500/20 group-hover:border-gold-500/50',
          'transition-all duration-500',
          'min-h-[280px] flex flex-col'
        )}
      >
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              shineX,
              (x) => `linear-gradient(105deg, transparent ${x - 50}%, rgba(255,255,255,0.1) ${x}%, transparent ${x + 50}%)`
            ),
          }}
        />

        {/* Top decoration line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
        />

        {/* Year badge */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.4, type: 'spring' }}
        >
          <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-sm font-medium">
            {year}
          </span>
        </motion.div>

        {/* Image or Icon container */}
        {image ? (
          <motion.div
            className="mb-6 overflow-hidden rounded-xl"
            style={{ transform: 'translateZ(30px)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        ) : (
          <div className="mb-6" style={{ transform: 'translateZ(30px)' }}>
            {awardIcons.award}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-display text-xl sm:text-2xl text-white font-semibold mb-3 group-hover:text-gradient-gold transition-all duration-500">
            {title}
          </h3>

          {description && (
            <p className="text-white/60 text-sm sm:text-base leading-relaxed flex-1">
              {description}
            </p>
          )}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Corner decorations */}
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold-500/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// AWARDS SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredAchievements = getFeaturedAchievements();

  // Filter only award types for the main display
  const awards = featuredAchievements.filter(a => a.type === 'award');

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-luxury-black via-luxury-charcoal to-luxury-black overflow-hidden"
    >
      {/* Floating particles */}
      <FloatingParticles />

      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[80px]" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gold opacity-20" />

      <Container size="xl">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-16 sm:mb-20">
          <Label variant="gold" className="mb-4">Recognition</Label>
          <Heading as="h2" size="title" align="center" className="mb-6">
            Awards & <span className="text-gradient-gold">Accolades</span>
          </Heading>
          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            Globally recognized for pioneering the intersection of art, sound, and technology.
          </Text>
        </ScrollReveal>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {awards.map((award, index) => (
            <AwardCard
              key={award.id}
              title={award.title}
              description={award.description}
              location={award.location}
              year={award.year}
              type={award.type}
              index={index}
              image={award.image}
            />
          ))}
        </div>

        {/* Additional milestone highlight */}
        <ScrollReveal direction="up" className="mt-16 sm:mt-20">
          <motion.div
            className="relative p-8 sm:p-12 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%)',
            }}
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['200% 0%', '-200% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className="absolute inset-[1px] rounded-3xl bg-luxury-charcoal/95" />

            {/* Content */}
            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-500/20 border border-gold-500/30 mb-6"
              >
                <svg className="w-10 h-10 text-gold-500" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>

              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mb-4">
                World's Largest NFT AR Mural
              </h3>
              <p className="text-white/60 text-lg mb-2">
                Middle East's first Augmented Reality mural at DIFC Dubai
              </p>
              <p className="text-gold-500 font-medium">
                $60,000 • 2022
              </p>
            </div>
          </motion.div>
        </ScrollReveal>
      </Container>

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent" />
    </section>
  );
}
