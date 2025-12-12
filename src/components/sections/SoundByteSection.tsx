/**
 * SoundBYTE Originals Section - THE MAIN FOCUS
 *
 * CRITICAL: This is the hero product - make it UNFORGETTABLE.
 *
 * Features:
 * - Immersive 3D floating artwork centerpiece
 * - Interactive sound wave that responds to mouse
 * - Parallax depth layers with smooth easing
 * - Luxury positioning with premium animations
 * - 3D tilt cards with glow effects
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Heading, Text, Label } from '../ui/Typography';
import { Button } from '../ui/Button';
import { ScrollReveal, StaggerReveal } from '../animations/ScrollReveal';
import { PRICING, SOUNDBYTE_SIZES } from '../../lib/utils/constants';
import { cn } from '../../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// 3D FLOATING ARTWORK CENTERPIECE
// ═══════════════════════════════════════════════════════════════════════════

function FloatingArtworkCenterpiece() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Super smooth spring config for luxury feel
  const springConfig = { stiffness: 50, damping: 30, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);
  const z = useSpring(useTransform(mouseY, [0, 0.5, 1], [0, 50, 0]), springConfig);

  // Floating animation
  const floatY = useMotionValue(0);
  const floatYSpring = useSpring(floatY, { stiffness: 20, damping: 15 });

  useEffect(() => {
    let time = 0;
    const animate = () => {
      time += 0.02;
      floatY.set(Math.sin(time) * 20);
      requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [floatY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative h-[600px] sm:h-[700px] lg:h-[800px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1500px' }}
    >
      {/* Ambient glow rings */}
      <motion.div
        className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.15) 0%, transparent 70%)',
          y: floatYSpring,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full border border-gold-500/20"
        style={{ y: floatYSpring }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle rotating ring - opposite direction */}
      <motion.div
        className="absolute w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] rounded-full border border-gold-500/30"
        style={{ y: floatYSpring }}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main 3D artwork container */}
      <motion.div
        className="relative"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          z: isHovered ? z : 0,
          y: floatYSpring,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background shadow/glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 83, 0.4) 0%, transparent 60%)',
            filter: 'blur(60px)',
            transform: 'translateZ(-100px) scale(1.5)',
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Main artwork frame */}
        <motion.div
          className="relative w-72 h-80 sm:w-96 sm:h-[420px] lg:w-[450px] lg:h-[500px] rounded-3xl overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(212, 168, 83, 0.3)',
          }}
          animate={{
            boxShadow: isHovered
              ? '0 70px 140px -20px rgba(0,0,0,0.6), 0 40px 80px -30px rgba(212, 168, 83, 0.5)'
              : '0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(212, 168, 83, 0.3)',
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Golden frame border */}
          <div className="absolute inset-0 rounded-3xl border-4 border-gold-500/60 z-20 pointer-events-none" />
          <div className="absolute inset-1 rounded-[20px] border border-gold-500/30 z-20 pointer-events-none" />

          {/* Canvas background */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-black to-[#0d0d0d]" />

          {/* Sound wave visualization */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4a853" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#b8941e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d4a853" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Abstract sound wave paths */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8) * 15} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth={0.8 - i * 0.04}
                strokeOpacity={0.6 - i * 0.04}
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  d: [
                    `M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8) * 15} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`,
                    `M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8 + 1) * 20} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`,
                    `M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8) * 15} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`,
                  ]
                }}
                transition={{
                  pathLength: { duration: 2, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 1, delay: i * 0.1 },
                  d: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }
                }}
              />
            ))}

            {/* Central golden accent */}
            <motion.circle
              cx="50"
              cy="50"
              r="3"
              fill="#d4a853"
              filter="url(#glow)"
              animate={{
                r: [3, 5, 3],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          {/* Golden shimmer overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, rgba(212, 168, 83, 0.1) 50%, transparent 60%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Signature text */}
          <motion.div
            className="absolute bottom-6 right-6 text-gold-500/60 text-sm font-display italic"
            style={{ transform: 'translateZ(30px)' }}
          >
            SoundBYTE®
          </motion.div>
        </motion.div>

        {/* Floating elements around the artwork */}
        <motion.div
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-gold-500/30 to-transparent blur-sm"
          style={{ transform: 'translateZ(80px)' }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-transparent blur-sm"
          style={{ transform: 'translateZ(60px)' }}
          animate={{
            y: [10, -10, 10],
            x: [5, -5, 5],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>

      {/* Interactive prompt */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold-500/60 text-sm tracking-wider">
              Move cursor to interact
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3D SIZE PRICING CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface SizePricingCardProps {
  name: string;
  unframed: string;
  framed: string;
  priceRange: string;
  notes: string;
  index: number;
  popular?: boolean;
}

function SizePricingCard({ name, unframed, framed, priceRange, notes, index, popular }: SizePricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smoother spring config
  const springConfig = { stiffness: 100, damping: 25, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), springConfig);
  const z = useSpring(isHovered ? 30 : 0, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        z,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className="relative group cursor-pointer"
    >
      {/* Popular badge */}
      {popular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
          initial={{ scale: 0, y: 10 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
        >
          <span className="px-4 py-1.5 bg-gold-500 text-luxury-black text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-gold-500/30">
            Most Popular
          </span>
        </motion.div>
      )}

      <div className={cn(
        'relative p-6 rounded-2xl border transition-all duration-700 h-full',
        popular
          ? 'bg-gradient-to-b from-gold-500/15 to-gold-500/5 border-gold-500/40'
          : 'bg-white/[0.02] border-white/10 hover:border-gold-500/30'
      )}>
        {/* 3D glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ transform: 'translateZ(-10px)' }}
          animate={{
            boxShadow: isHovered
              ? '0 25px 60px -15px rgba(212, 168, 83, 0.4), 0 0 40px rgba(212, 168, 83, 0.1)'
              : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['200% 0%', '-200% 0%'] : '200% 0%',
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {/* Content with 3D depth */}
        <div className="relative" style={{ transform: 'translateZ(20px)' }}>
          <h4 className="font-display text-xl text-white font-semibold mb-2">
            {name}
          </h4>
          <motion.div
            className="mb-4"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-display text-2xl sm:text-3xl text-gradient-gold font-bold">
              {priceRange}
            </span>
          </motion.div>

          <div className="space-y-2 mb-4 text-sm">
            <p className="text-white/60">
              <span className="text-white/40">Unframed:</span> {unframed}
            </p>
            <p className="text-white/60">
              <span className="text-white/40">Framed:</span> {framed}
            </p>
          </div>

          <p className="text-gold-500/80 text-sm italic">
            {notes}
          </p>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS STEP COMPONENT - Premium 3D
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

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);

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
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {/* Connection line */}
      {index < 3 && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-px">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500/50 to-gold-500/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      )}

      <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-gold-500/30 transition-all duration-700">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? '0 30px 60px -20px rgba(212, 168, 83, 0.3), inset 0 0 30px rgba(212, 168, 83, 0.05)'
              : '0 10px 30px -15px rgba(0, 0, 0, 0.2)',
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Icon with 3D effect */}
        <motion.div
          className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/30"
          style={{ transform: 'translateZ(40px)' }}
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotateY: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-gold-500">{icon}</span>
          <motion.span
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gold-500 text-luxury-black text-sm font-bold flex items-center justify-center shadow-lg shadow-gold-500/30"
            animate={{ scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {number}
          </motion.span>
        </motion.div>

        {/* Content */}
        <motion.h4
          className="font-display text-xl text-white font-semibold mb-3"
          animate={{ color: isHovered ? '#d4a853' : '#ffffff' }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h4>
        <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE CARD WITH PREMIUM HOVER
// ═══════════════════════════════════════════════════════════════════════════

interface FeatureHighlightProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureHighlight({ title, description, icon }: FeatureHighlightProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition-all duration-500 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered
            ? 'radial-gradient(circle at 50% 0%, rgba(212, 168, 83, 0.15) 0%, transparent 60%)'
            : 'transparent',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Icon */}
      <motion.div
        className="w-12 h-12 mb-4 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500"
        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      <h4 className="font-display text-lg text-white font-semibold mb-2 group-hover:text-gold-500 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-white/60 text-sm leading-relaxed">
        {description}
      </p>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SOUNDBYTE SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SoundByteSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  // Icons for process steps
  const icons = {
    voice: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    transform: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    craft: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    deliver: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  };

  // Feature icons
  const featureIcons = {
    materials: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    unique: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    ),
    dimensions: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
    service: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    certificate: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    shipping: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <section
      ref={sectionRef}
      id="soundbyte"
      className="relative py-32 sm:py-40 lg:py-48 bg-luxury-black overflow-hidden"
    >
      {/* Parallax ambient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold-500/5 rounded-full blur-[250px]" />
      </motion.div>

      <Container size="xl">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Label variant="outline" className="mb-6">Exclusive Art Collection</Label>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Heading as="h2" size="hero" align="center" className="mb-6">
              SoundBYTE<br />
              <span className="text-gradient-gold">Originals</span>
            </Heading>
          </motion.div>
        </ScrollReveal>

        {/* Key value proposition */}
        <ScrollReveal direction="up" className="text-center mb-8 sm:mb-12">
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

        {/* 3D Floating Artwork Centerpiece */}
        <FloatingArtworkCenterpiece />

        {/* Process steps */}
        <div className="mb-24 sm:mb-32">
          <ScrollReveal direction="up" className="text-center mb-16">
            <h3 className="font-display text-3xl text-white mb-4">
              The Creation Journey
            </h3>
            <p className="text-white/60 max-w-xl mx-auto">
              From your voice to a museum-quality masterpiece
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
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
        </div>

        {/* Feature highlights */}
        <StaggerReveal direction="up" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 sm:mb-32">
          <FeatureHighlight
            title="Museum-Quality Materials"
            description="Gallery-grade canvas, 24k gold leaf, archival pigments designed to last generations."
            icon={featureIcons.materials}
          />
          <FeatureHighlight
            title="Completely Unique"
            description="No two pieces are alike — your sound's frequency creates a truly original pattern."
            icon={featureIcons.unique}
          />
          <FeatureHighlight
            title="Custom Dimensions"
            description="From intimate 20cm pieces to statement 92cm+ installations for grand spaces."
            icon={featureIcons.dimensions}
          />
          <FeatureHighlight
            title="White Glove Service"
            description="Personal consultation, progress updates, and professional installation guidance."
            icon={featureIcons.service}
          />
          <FeatureHighlight
            title="Certificate of Authenticity"
            description="Each piece comes with signed documentation and provenance details."
            icon={featureIcons.certificate}
          />
          <FeatureHighlight
            title="Global Shipping"
            description="Expertly crated and insured delivery to collectors worldwide."
            icon={featureIcons.shipping}
          />
        </StaggerReveal>

        {/* Size & Pricing Grid */}
        <ScrollReveal direction="up" className="mb-12">
          <h3 className="font-display text-3xl text-white text-center mb-4">
            Choose Your Size
          </h3>
          <p className="text-white/60 text-center mb-16 max-w-xl mx-auto">
            {PRICING.anchorText}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24 sm:mb-32" style={{ perspective: '1000px' }}>
          {SOUNDBYTE_SIZES.map((size, index) => (
            <SizePricingCard
              key={size.name}
              name={size.name}
              unframed={size.unframed}
              framed={size.framed}
              priceRange={size.priceRange}
              notes={size.notes}
              index={index}
              popular={size.name === 'Small'}
            />
          ))}
        </div>

        {/* Luxury CTA */}
        <ScrollReveal direction="up" className="text-center">
          <motion.div
            className="inline-block p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(212, 168, 83, 0.1)',
                  '0 0 60px rgba(212, 168, 83, 0.2)',
                  '0 0 30px rgba(212, 168, 83, 0.1)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <p className="text-gold-500/80 text-sm uppercase tracking-[0.2em] mb-6">
              Bespoke Commissions
            </p>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-semibold mb-6">
              Begin Your <span className="text-gradient-gold">SoundBYTE®</span> Journey
            </h3>
            <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Each commission begins with a personal consultation to understand your vision,
              the sounds that matter to you, and how to translate them into timeless art.
            </p>
            <Link to="/commission">
              <Button
                variant="primary"
                size="xl"
                rightIcon={
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                }
              >
                Request a Consultation
              </Button>
            </Link>
            <p className="mt-6 text-white/40 text-sm">
              Complimentary consultation • No obligation
            </p>
          </motion.div>
        </ScrollReveal>
      </Container>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-charcoal to-transparent" />
    </section>
  );
}
