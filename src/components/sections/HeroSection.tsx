/**
 * Hero Section - Premium & Immersive
 *
 * Inspired by amrita-art.lovable.app reference
 * Features:
 * - Animated sound wave background
 * - Emblem with pulse glow animation
 * - Large typography with gold gradient
 * - Authority stats with wave-inspired animations
 * - Product-focused CTAs
 * - BYTEclub link
 */

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';

// ═══════════════════════════════════════════════════════════════════════════
// STATS DATA - Authority & Credibility (matching reference)
// ═══════════════════════════════════════════════════════════════════════════

const stats = [
  { value: '$102K', label: 'Highest NFT Sale' },
  { value: '145', label: 'Pieces at Art Dubai' },
  { value: '1M+', label: 'Social Followers' },
  { value: '$60K', label: 'Largest AR Mural' }
];

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER HOOK - Counts up with wave-like easing
// ═══════════════════════════════════════════════════════════════════════════

function useAnimatedCounter(
  end: number,
  duration: number = 2000,
  delay: number = 0,
  startOnView: boolean = true
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const startAnimation = () => {
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Wave-like easing: starts slow, speeds up, slows down
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const timer = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, delay, hasStarted]);

  return { count, countRef };
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED STAT COMPONENT - Wave-inspired animations with counting
// ═══════════════════════════════════════════════════════════════════════════

interface StatProps {
  value: string;
  label: string;
  index: number;
}

function Stat({ value, label, index }: StatProps) {
  // Parse the value to extract number and prefix/suffix
  const numericMatch = value.match(/^(\$?)(\d+)(K?\+?)$/);
  const hasNumeric = numericMatch !== null;
  const prefix = numericMatch?.[1] || '';
  const numericValue = numericMatch ? parseInt(numericMatch[2]) : 0;
  const suffix = numericMatch?.[3] || '';

  const { count, countRef } = useAnimatedCounter(
    numericValue,
    2000 + index * 200, // Stagger duration slightly
    1400 + index * 150  // Stagger delay
  );

  return (
    <motion.div
      ref={countRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.4 + index * 0.12,
        ...springs.waveGentle
      }}
      className="text-center"
    >
      <div className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-gradient-gold mb-2">
        {hasNumeric ? (
          <>
            {prefix}
            <span className="tabular-nums">{count}</span>
            {suffix}
          </>
        ) : (
          value
        )}
      </div>
      <div className="text-xs md:text-sm tracking-widest uppercase text-white/50">
        {label}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ENHANCED SOUND WAVE BACKGROUND - Multi-layer parallax with glow
// ═══════════════════════════════════════════════════════════════════════════

function SoundWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const centerY = height / 2;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      // Dynamic wave parameters based on mouse position
      const mouseInfluence = (mouse.x - 0.5) * 0.3;
      const amplitudeBoost = 1 + (mouse.y - 0.5) * 0.2;

      // Multiple wave layers with parallax effect - MORE VISIBLE
      const waves = [
        // Background layer - slow, large, more visible
        { amplitude: 100 * amplitudeBoost, frequency: 0.006, speed: 0.12, opacity: 0.15, offset: 0, blur: 4, yOffset: 0.35 },
        { amplitude: 90 * amplitudeBoost, frequency: 0.008, speed: 0.15, opacity: 0.12, offset: Math.PI / 4, blur: 3, yOffset: 0.28 },
        // Middle layer - medium speed and size
        { amplitude: 70 * amplitudeBoost, frequency: 0.012, speed: 0.22, opacity: 0.25, offset: Math.PI / 3, blur: 2, yOffset: 0.15 },
        { amplitude: 55 * amplitudeBoost, frequency: 0.018, speed: 0.28, opacity: 0.2, offset: Math.PI / 2, blur: 1, yOffset: 0 },
        // Foreground layer - fast, sharp, prominent
        { amplitude: 45 * amplitudeBoost, frequency: 0.022, speed: 0.35, opacity: 0.35, offset: Math.PI * 0.7, blur: 0, yOffset: -0.12 },
        { amplitude: 35 * amplitudeBoost, frequency: 0.028, speed: 0.45, opacity: 0.3, offset: Math.PI, blur: 0, yOffset: -0.18 },
        // Accent layer - glowing effect
        { amplitude: 40 * amplitudeBoost, frequency: 0.015, speed: 0.3, opacity: 0.4, offset: Math.PI * 1.5, blur: 6, yOffset: 0.05 }
      ];

      waves.forEach((wave) => {
        ctx.save();

        // Apply blur for depth effect
        if (wave.blur > 0) {
          ctx.filter = `blur(${wave.blur}px)`;
        }

        ctx.beginPath();

        // Create gradient stroke for glow effect
        const gradient = ctx.createLinearGradient(0, centerY - wave.amplitude, 0, centerY + wave.amplitude);
        gradient.addColorStop(0, `rgba(16, 185, 129, 0)`);
        gradient.addColorStop(0.5, `rgba(16, 185, 129, ${wave.opacity})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = wave.blur > 2 ? 6 : 3;

        const waveY = centerY + (height * wave.yOffset);

        for (let x = 0; x <= width; x += 2) {
          // Complex wave with harmonics
          const y = waveY +
            Math.sin(x * wave.frequency + time * wave.speed + wave.offset + mouseInfluence) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * (wave.amplitude * 0.3) +
            Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * (wave.amplitude * 0.1);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.restore();
      });

      // Add subtle particle/frequency dots
      const particleCount = 15;
      for (let i = 0; i < particleCount; i++) {
        const px = (width / particleCount) * i + (width / particleCount / 2);
        const py = centerY + Math.sin(px * 0.02 + time * 0.3 + i) * 60;
        const size = 2 + Math.sin(time * 2 + i) * 1;
        const opacity = 0.1 + Math.sin(time + i * 0.5) * 0.05;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.fill();
      }

      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL INDICATOR - Wave-inspired pulse
// ═══════════════════════════════════════════════════════════════════════════

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <motion.div
        className="w-px h-16 bg-gradient-to-b from-transparent via-gold-500/50 to-gold-500"
        animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EDITORIAL LINE - Decorative element
// ═══════════════════════════════════════════════════════════════════════════

function EditorialLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="w-20 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent mx-auto mb-6"
    />
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
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-black"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/20 via-luxury-black/30 to-luxury-black/80 pointer-events-none z-10" />

      {/* Sound wave background */}
      <div className="absolute inset-0 z-0">
        <SoundWaveBackground />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 w-full"
      >
        <Container size="xl" className="text-center">
          {/* Emblem with pulse glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 1, ...springs.waveGentle }}
            className="mb-6"
          >
            <div className="relative inline-block">
              {/* Pulse glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-500/20 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Emblem circle */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold-500/40 flex items-center justify-center backdrop-blur-sm">
                <span className="font-display text-2xl md:text-3xl text-gold-500 font-bold">a</span>
              </div>
            </div>
          </motion.div>

          {/* Editorial line */}
          <EditorialLine />

          {/* Name - Large display */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ delay: 0.6, ...springs.waveGentle }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-wide mb-2"
          >
            amrita sethi
          </motion.h1>

          {/* Tagline - Gold gradient */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.8, ...springs.waveGentle }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gradient-gold tracking-tight mb-4"
          >
            Sound. Art. Tech.
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 1, ...springs.waveGentle }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light tracking-wide mb-2"
          >
            Inspiring change through art, sound and technology
          </motion.p>

          {/* Credential line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-base text-white/80 max-w-xl mx-auto font-light mb-8"
          >
            Inventor of SoundBYTEs® • Dubai's First NFT Artist
          </motion.p>

          {/* Stats grid - Large typography */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-10 pt-4"
          >
            {stats.map((stat, index) => (
              <Stat key={stat.label} {...stat} index={index} />
            ))}
          </motion.div>

          {/* CTAs - Product focused */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ delay: 1.8, ...springs.waveGentle }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link to="/soundbyte">
              <Button variant="primary" size="lg" className="group">
                Commission a SoundBYTE Original™
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link to="/sonic-identity">
              <Button variant="outline" size="lg">
                Generate a Sonic Identity™
              </Button>
            </Link>
          </motion.div>

          {/* BYTEclub link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            <Link
              to="/contact"
              className="text-sm text-white/50 hover:text-gold-500 transition-colors tracking-widest uppercase inline-block relative group"
            >
              Join BYTEclub
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
