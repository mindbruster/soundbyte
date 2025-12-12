/**
 * SoundBYTE Originals Section
 *
 * CRITICAL: Present SoundBYTE as a HIGH-END ART PIECE, not a tool or system.
 *
 * Features:
 * - Immersive scrollytelling transformation (sound → art)
 * - 3D visualization of the creation process
 * - Price anchoring with luxury positioning
 * - Emphasis on exclusivity and craftsmanship
 */

import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Container } from '../ui/Container';
import { Heading, Text, Label } from '../ui/Typography';
import { Button } from '../ui/Button';
import { ScrollReveal, StaggerReveal } from '../animations/ScrollReveal';
import { PRICING } from '../../lib/utils/constants';

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS STEP COMPONENT - Interactive with 3D hover
// ═══════════════════════════════════════════════════════════════════════════

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

function ProcessStep({ number, title, description, icon, index }: ProcessStepProps) {
  const [isHovered, setIsHovered] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stepRef.current) return;
    const rect = stepRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={stepRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      {/* Connection line */}
      <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold-500/30 to-transparent" />

      <div className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition-all duration-500">
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? '0 0 40px rgba(212, 168, 83, 0.15), 0 0 80px rgba(212, 168, 83, 0.05)'
              : '0 0 0px rgba(212, 168, 83, 0)',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Icon */}
        <motion.div
          className="relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/20"
          animate={{
            scale: isHovered ? 1.1 : 1,
            backgroundColor: isHovered ? 'rgba(212, 168, 83, 0.2)' : 'rgba(212, 168, 83, 0.1)',
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-gold-500">{icon}</span>
          <motion.span
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-500 text-luxury-black text-xs font-bold flex items-center justify-center"
            animate={{ scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {number}
          </motion.span>
        </motion.div>

        {/* Content */}
        <h4 className="font-display text-xl text-white font-semibold mb-2 group-hover:text-gradient-gold transition-all duration-500">
          {title}
        </h4>
        <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE HIGHLIGHT COMPONENT - Interactive Card
// ═══════════════════════════════════════════════════════════════════════════

interface FeatureHighlightProps {
  title: string;
  description: string;
}

function FeatureHighlight({ title, description }: FeatureHighlightProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [glowX, glowY]);

  return (
    <motion.div
      ref={cardRef}
      className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition-colors duration-500 overflow-hidden group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect following cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(212, 168, 83, 0.15) 0%, transparent 50%)`
          ),
        }}
      />

      {/* Content */}
      <motion.h4
        className="font-display text-lg text-white font-semibold mb-2 relative"
        animate={{ color: isHovered ? '#d4a853' : '#ffffff' }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h4>
      <p className="text-white/60 text-sm leading-relaxed relative">
        {description}
      </p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SOUND WAVE TRANSFORMATION VISUAL
// ═══════════════════════════════════════════════════════════════════════════

function SoundWaveTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const waveOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.3]);
  const artOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);

  return (
    <div ref={containerRef} className="relative h-[500px] sm:h-[600px] flex items-center justify-center">
      {/* Sound wave visualization */}
      <motion.div
        style={{ opacity: waveOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg className="w-full max-w-2xl h-48" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: 50 }).map((_, i) => {
            const height = Math.sin(i * 0.3) * 35 + 40;
            return (
              <motion.rect
                key={i}
                x={i * 8 + 4}
                y={50 - height / 2}
                width="4"
                height={height}
                rx="2"
                fill="currentColor"
                className="text-gold-500/60"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.02,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                style={{ transformOrigin: 'center' }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Transformed artwork representation */}
      <motion.div
        style={{ opacity: artOpacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          {/* Circular art frame */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500/20 via-gold-600/10 to-transparent border border-gold-500/30" />

          {/* Inner artwork visualization */}
          <div className="absolute inset-8 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/30 via-amber-600/20 to-gold-700/30" />

            {/* Abstract sound pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="artGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d4a853" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#713f12" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#artGradient)" />
              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={10 + i * 5}
                  fill="none"
                  stroke="#d4a853"
                  strokeWidth="0.5"
                  strokeOpacity={0.3 - i * 0.03}
                />
              ))}
            </svg>
          </div>

          {/* Floating text */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-gold-500 text-sm font-display italic">
              Your voice, transformed into art
            </span>
          </div>
        </div>
      </motion.div>

      {/* Arrow transformation indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]) }}
        className="absolute left-1/2 -translate-x-1/2 bottom-20"
      >
        <svg className="w-8 h-8 text-gold-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SOUNDBYTE SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SoundByteSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Icons for process steps
  const icons = {
    voice: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    transform: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    craft: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    deliver: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  };

  return (
    <section
      ref={sectionRef}
      id="soundbyte"
      className="relative py-24 sm:py-32 lg:py-40 bg-luxury-black overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px]" />
      </div>

      <Container size="xl">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-8">
          <Label variant="outline" className="mb-4">Exclusive Art Collection</Label>
          <Heading as="h2" size="hero" align="center" className="mb-6">
            SoundBYTE<br />
            <span className="text-gradient-gold">Originals</span>
          </Heading>
        </ScrollReveal>

        {/* Key value proposition */}
        <ScrollReveal direction="up" className="text-center mb-16 sm:mb-20">
          <Text size="xl" color="secondary" align="center" className="max-w-3xl mx-auto leading-relaxed mb-8">
            Each SoundBYTE Original is a <span className="text-gold-500 font-semibold">one-of-a-kind masterpiece</span> —
            a physical artwork that transforms your most meaningful sounds into
            timeless visual art, hand-crafted with precious materials and
            Amrita's signature artistic vision.
          </Text>
          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            Commissioned by royalty, Fortune 500 executives, and discerning collectors worldwide.
          </Text>
        </ScrollReveal>

        {/* Sound wave to art transformation */}
        <SoundWaveTransformation />

        {/* Process steps */}
        <ScrollReveal direction="up" className="mb-20 sm:mb-24">
          <h3 className="font-display text-2xl text-white text-center mb-12">
            The Creation Journey
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            <ProcessStep
              number="1"
              title="Capture"
              description="Record the voice or sound that holds meaning — vows, first words, a loved one's message"
              icon={icons.voice}
              index={0}
            />
            <ProcessStep
              number="2"
              title="Transform"
              description="Amrita analyzes the unique frequency patterns, translating sound into visual form"
              icon={icons.transform}
              index={1}
            />
            <ProcessStep
              number="3"
              title="Create"
              description="Hand-crafted on canvas with gold leaf, metallic pigments, and premium materials"
              icon={icons.craft}
              index={2}
            />
            <ProcessStep
              number="4"
              title="Deliver"
              description="Your finished artwork arrives museum-ready with certificate of authenticity"
              icon={icons.deliver}
              index={3}
            />
          </div>
        </ScrollReveal>

        {/* Feature highlights */}
        <StaggerReveal direction="up" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <FeatureHighlight
            title="Museum-Quality Materials"
            description="Gallery-grade canvas, 24k gold leaf, archival pigments designed to last generations."
          />
          <FeatureHighlight
            title="Completely Unique"
            description="No two pieces are alike — your sound's frequency creates a truly original pattern."
          />
          <FeatureHighlight
            title="Custom Dimensions"
            description="From intimate 60cm pieces to statement 200cm+ installations for grand spaces."
          />
          <FeatureHighlight
            title="White Glove Service"
            description="Personal consultation, progress updates, and professional installation guidance."
          />
          <FeatureHighlight
            title="Certificate of Authenticity"
            description="Each piece comes with signed documentation and provenance details."
          />
          <FeatureHighlight
            title="Global Shipping"
            description="Expertly crated and insured delivery to collectors worldwide."
          />
        </StaggerReveal>

        {/* Luxury CTA - No price list (like high-end galleries) */}
        <ScrollReveal direction="up" className="text-center">
          <div className="inline-block p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10">
            <p className="text-white/40 text-sm uppercase tracking-widest mb-6">
              Bespoke Commissions
            </p>
            <h3 className="font-display text-3xl sm:text-4xl text-white font-semibold mb-6">
              Begin Your <span className="text-gradient-gold">SoundBYTE®</span> Journey
            </h3>
            <p className="text-white/60 text-base mb-4 max-w-lg mx-auto leading-relaxed">
              Each commission begins with a personal consultation to understand your vision,
              the sounds that matter to you, and how to translate them into timeless art.
            </p>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto italic">
              {PRICING.anchorText}
            </p>
            <Button
              variant="primary"
              size="xl"
              rightIcon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Request a Consultation
            </Button>
            <p className="mt-4 text-white/30 text-xs">
              Complimentary consultation • No obligation
            </p>
          </div>
        </ScrollReveal>
      </Container>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-luxury-charcoal to-transparent" />
    </section>
  );
}
