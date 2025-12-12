/**
 * Hero Section - Completely Redesigned
 *
 * A truly immersive, interactive hero with:
 * - Magnetic text effects that respond to cursor
 * - Staggered character-by-character reveals with physics
 * - Parallax depth layers
 * - Interactive credential badges with gravitational pull
 * - Smooth scroll-triggered transformations
 */

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { VoiceSoundWave } from '../animations/VoiceSoundWave';
import { globalPresence } from '../../data/achievements';
import { springs } from '../../lib/animations';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC TEXT CHARACTER
// ═══════════════════════════════════════════════════════════════════════════

interface MagneticCharProps {
  char: string;
  index: number;
}

function MagneticChar({ char, index }: MagneticCharProps) {
  const charRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!charRef.current) return;

      const rect = charRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = 200;
      const strength = Math.max(0, 1 - distance / maxDistance);

      // Push away from cursor
      x.set(-deltaX * strength * 0.3);
      y.set(-deltaY * strength * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  // Staggered entrance animation
  const delay = index * 0.05;

  return (
    <motion.span
      ref={charRef}
      className="inline-block relative"
      style={{ x: xSpring, y: ySpring }}
      initial={{ opacity: 0, y: 100, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: delay + 0.5,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC TITLE
// ═══════════════════════════════════════════════════════════════════════════

function MagneticTitle({ text }: { text: string }) {
  const chars = text.split('');

  return (
    <h1
      className="font-display font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight"
      style={{ perspective: '1000px' }}
    >
      {chars.map((char, i) => (
        <MagneticChar key={i} char={char} index={i} />
      ))}
    </h1>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING CREDENTIAL BADGE WITH PHYSICS
// ═══════════════════════════════════════════════════════════════════════════

interface FloatingBadgeProps {
  text: string;
  index: number;
  totalBadges: number;
}

function FloatingBadge({ text, index, totalBadges }: FloatingBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 10, mass: 1 };
  const xSpring = useSpring(x, springConfig);

  // Calculate initial position in a spiral pattern
  useEffect(() => {
    const angle = (index / totalBadges) * Math.PI * 2;
    const radius = 35 + (index % 3) * 10;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    setPosition({ x: 50 + offsetX, y: 50 + offsetY });
  }, [index, totalBadges]);

  // Mouse interaction - gravitational pull
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!badgeRef.current) return;

      const rect = badgeRef.current.getBoundingClientRect();
      const badgeCenterX = rect.left + rect.width / 2;
      const badgeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - badgeCenterX;
      const deltaY = e.clientY - badgeCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Gravitational attraction
      const attractionRadius = 300;
      const maxForce = 30;

      if (distance < attractionRadius && distance > 10) {
        const force = (1 - distance / attractionRadius) * maxForce;
        x.set(deltaX * force / distance);
        y.set(deltaY * force / distance);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [x, y]);

  // Floating animation
  const floatY = useMotionValue(0);
  const floatYSpring = useSpring(floatY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    let time = index * 0.5;
    const animate = () => {
      time += 0.02;
      floatY.set(Math.sin(time) * 10);
      requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [floatY, index]);

  return (
    <motion.div
      ref={badgeRef}
      className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold-500/30 transition-colors cursor-default"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        x: xSpring,
        y: floatYSpring
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 2 + index * 0.15,
        duration: 0.8,
        type: 'spring',
        ...springs.bouncy
      }}
      whileHover={{ scale: 1.1 }}
      data-cursor="Explore"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
      <span className="text-xs text-white/70 font-medium tracking-wide">{text}</span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED TAGLINE
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedTagline() {
  const words = ['Sound.', 'Art.', 'Tech.'];

  return (
    <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/80 leading-relaxed">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-4 ${i === 1 ? 'text-gradient-gold font-semibold' : ''}`}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 1.5 + i * 0.15,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL INDICATOR WITH PULSE
// ═══════════════════════════════════════════════════════════════════════════

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      <motion.span
        className="text-xs text-white/30 uppercase tracking-[0.3em]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll to explore
      </motion.span>

      <div className="relative w-6 h-10 rounded-full border border-white/20 overflow-hidden">
        <motion.div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-gold-500"
          animate={{ y: [0, 16, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1]
          }}
        />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const waveY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const waveScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Trigger load state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/30 via-transparent to-luxury-black pointer-events-none z-10" />

      {/* Floating credential badges - positioned around edges */}
      <AnimatePresence>
        {isLoaded && globalPresence.map((city, index) => (
          <FloatingBadge
            key={city}
            text={city}
            index={index}
            totalBadges={globalPresence.length}
          />
        ))}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* THE CENTERPIECE - Voice Sound Wave */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-5"
        style={{ y: waveY, scale: waveScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <VoiceSoundWave className="w-full h-full" />
      </motion.div>

      {/* Main content - positioned above the wave */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-20 pt-20"
      >
        <Container size="xl" className="text-center">
          {/* Pre-title label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-4">
              <motion.span
                className="h-px bg-gradient-to-r from-transparent to-gold-500/50"
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              <span className="text-gold-500 text-xs sm:text-sm font-medium tracking-[0.3em] uppercase">
                Inventor of SoundBYTEs® • Dubai's First NFT Artist
              </span>
              <motion.span
                className="h-px bg-gradient-to-l from-transparent to-gold-500/50"
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </motion.div>

          {/* Main title with magnetic effect */}
          <div className="mb-6">
            <MagneticTitle text="Amrita Sethi" />
          </div>

          {/* Animated tagline */}
          <div className="mb-8">
            <AnimatedTagline />
          </div>
        </Container>
      </motion.div>

      {/* Bottom section - Authority + CTAs */}
      <motion.div
        className="absolute bottom-32 left-0 right-0 z-20"
        style={{ opacity: contentOpacity }}
      >
        <Container size="lg" className="text-center">
          {/* Authority statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Inspiring change through art, sound and technology. Featured on{' '}
            <span className="text-white/70">CNN</span>,{' '}
            <span className="text-white/70">Forbes</span>,{' '}
            <span className="text-white/70">Bloomberg</span> & <span className="text-white/70">BBC</span>.
            Partnered with Canon, Ferrari, Jacob & Co.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/commission">
              <Button
                variant="primary"
                size="lg"
                data-cursor="Commission"
                rightIcon={
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                }
              >
                Commission Your Piece
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" size="lg" data-cursor="Explore">
                Explore the Collection
              </Button>
            </Link>
          </motion.div>

          {/* Price anchoring */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="mt-6 text-sm text-white/30"
          >
            SoundBYTE Originals from{' '}
            <span className="text-gold-500/60 font-medium">$3,500</span>
          </motion.p>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
