/**
 * Hero Section - Clean & Minimal
 *
 * Focus: Amrita (the artist) + Her Art (for sale)
 *
 * Structure:
 * - Logo emblem with subtle pulse
 * - Name + Tagline
 * - Stats grid (authority/credibility)
 * - Dual CTA buttons
 * - Subtle sound wave background
 */

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

// ═══════════════════════════════════════════════════════════════════════════
// STATS DATA - Authority & Credibility
// ═══════════════════════════════════════════════════════════════════════════

const stats = [
  { value: '$102K', label: 'Record Sale' },
  { value: '145+', label: 'Pieces at Art Dubai' },
  { value: '1M+', label: 'Global Following' },
  { value: '15+', label: 'Countries Exhibited' }
];

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED STAT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface StatProps {
  value: string;
  label: string;
  index: number;
}

function Stat({ value, label, index }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
      className="text-center"
    >
      <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gold-500 mb-1">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIMPLE SOUND WAVE BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════

function SoundWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw multiple wave layers
      const waves = [
        { amplitude: 40, frequency: 0.02, speed: 0.3, opacity: 0.15 },
        { amplitude: 30, frequency: 0.025, speed: 0.4, opacity: 0.1 },
        { amplitude: 20, frequency: 0.03, speed: 0.5, opacity: 0.05 }
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(16, 185, 129, ${wave.opacity})`;
        ctx.lineWidth = 2;

        for (let x = 0; x <= width; x += 3) {
          const y = centerY + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      });

      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL INDICATOR
// ═══════════════════════════════════════════════════════════════════════════

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-white/30 uppercase tracking-[0.2em]">
        Scroll
      </span>
      <motion.div
        className="w-px h-8 bg-gradient-to-b from-gold-500/50 to-transparent"
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll-based parallax (subtle)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-luxury-black"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/50 via-transparent to-luxury-black pointer-events-none z-10" />

      {/* Sound wave background */}
      <div className="absolute inset-0 z-0">
        <SoundWaveBackground />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20"
      >
        <Container size="xl" className="text-center">
          {/* Logo emblem with pulse glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              {/* Pulse glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-500/20 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Emblem placeholder - can be replaced with actual logo */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gold-500/30 flex items-center justify-center">
                <span className="font-display text-3xl sm:text-4xl text-gold-500 font-bold">a</span>
              </div>
            </div>
          </motion.div>

          {/* Editorial line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-16 h-px bg-gold-500/50 mx-auto mb-8"
          />

          {/* Pre-title credential */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gold-500/80 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-4"
          >
            Inventor of SoundBYTEs® • Dubai's First NFT Artist
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4"
          >
            amrita sethi
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-display text-xl sm:text-2xl md:text-3xl mb-12"
          >
            <span className="text-white/80">Sound.</span>
            {' '}
            <span className="text-gold-500">Art.</span>
            {' '}
            <span className="text-white/80">Tech.</span>
          </motion.p>

          {/* Stats grid - Authority & Credibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <Stat key={stat.label} {...stat} index={index} />
            ))}
          </motion.div>

          {/* Dual CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/commission">
              <Button variant="primary" size="lg">
                Commission Your Piece
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" size="lg">
                Explore Collections
              </Button>
            </Link>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
