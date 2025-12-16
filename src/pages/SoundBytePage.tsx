/**
 * SoundBYTE Product Page
 *
 * Dedicated page for SoundBYTE Originals with full product details.
 * Features:
 * - Detailed product information
 * - Size and pricing options
 * - Process breakdown
 * - Testimonials
 * - FAQ
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Heading, Text, Label } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { PRICING, SOUNDBYTE_SIZES } from '../lib/utils/constants';
import { cn } from '../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING ARTWORK PREVIEW
// ═══════════════════════════════════════════════════════════════════════════

function FloatingArtworkPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 50, damping: 30, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);

  const floatY = useMotionValue(0);
  const floatYSpring = useSpring(floatY, { stiffness: 20, damping: 15 });

  useEffect(() => {
    let time = 0;
    const animate = () => {
      time += 0.02;
      floatY.set(Math.sin(time) * 15);
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
      className="relative h-[400px] sm:h-[500px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1500px' }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          y: floatYSpring,
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full border border-gold-500/20"
        style={{ y: floatYSpring }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-gold-500/30"
        style={{ y: floatYSpring }}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main artwork frame */}
      <motion.div
        className="relative"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          y: floatYSpring,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="relative w-56 h-64 sm:w-72 sm:h-80 rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(16, 185, 129, 0.3)',
          }}
        >
          <div className="absolute inset-0 rounded-2xl border-4 border-gold-500/60 z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal via-luxury-black to-[#0d0d0d]" />

          {/* Sound wave visualization */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8) * 15} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`}
                fill="none"
                stroke="url(#waveGrad)"
                strokeWidth={0.8 - i * 0.04}
                strokeOpacity={0.6 - i * 0.04}
                animate={{
                  d: [
                    `M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8) * 15} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`,
                    `M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8 + 1) * 20} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`,
                    `M 0 ${50 + (i - 6) * 4} Q 25 ${50 + Math.sin(i * 0.8) * 15} 50 ${50 + (i - 6) * 4} T 100 ${50 + (i - 6) * 4}`,
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute bottom-4 right-4 text-gold-500/60 text-sm font-display italic"
          >
            SoundBYTE®
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIZE PRICING CARD
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {popular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
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
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? '0 25px 60px -15px rgba(16, 185, 129, 0.4)'
              : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
          }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative">
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

        <motion.div
          className="absolute bottom-0 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS STEP
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

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
    >
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
        <motion.div
          className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gold-500/10 border border-gold-500/30"
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.4 }}
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

        <motion.h4
          className="font-display text-xl text-white font-semibold mb-3"
          animate={{ color: isHovered ? '#10b981' : '#ffffff' }}
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
// FAQ ACCORDION
// ═══════════════════════════════════════════════════════════════════════════

const faqs = [
  {
    question: "How long does it take to create a SoundBYTE Original?",
    answer: "Each SoundBYTE Original takes approximately 6-8 weeks from consultation to delivery. This includes the initial voice recording session, design phase, hand-crafting process, and professional framing."
  },
  {
    question: "What sounds can be turned into a SoundBYTE?",
    answer: "Almost any sound can be transformed — voices, music, heartbeats, vows, first words, meaningful messages, and more. The clearer the recording, the more detailed the resulting artwork."
  },
  {
    question: "Do I need to visit Dubai for the process?",
    answer: "No, the entire process can be done remotely. Voice recordings can be submitted via phone or professional recording, and we offer virtual consultations. Your finished artwork ships globally with full insurance."
  },
  {
    question: "What materials are used?",
    answer: "We use museum-grade materials including gallery-quality canvas, 24k gold leaf, archival metallic pigments, and UV-resistant finishes. Each piece is designed to last for generations."
  },
  {
    question: "Is framing included?",
    answer: "Framing is optional but recommended. We offer custom museum-quality framing that complements each artwork. You can also choose to receive the piece unframed for local framing."
  },
  {
    question: "Can I commission a piece as a gift?",
    answer: "Absolutely! Many clients commission SoundBYTE Originals as gifts for weddings, anniversaries, memorials, and special occasions. We can coordinate voice recordings discretely for surprise gifts."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-white/10"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-display text-lg text-white font-medium pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gold-500 text-2xl flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-white/60 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SOUNDBYTE PAGE MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SoundBytePage() {
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

  return (
    <section className="relative py-32 sm:py-40 bg-luxury-black min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px]" />
      </div>

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

        {/* Hero */}
        <ScrollReveal direction="up" className="text-center mb-8">
          <Label variant="outline" className="mb-6">Exclusive Art Collection</Label>
          <Heading as="h1" size="hero" align="center" className="mb-6">
            SoundBYTE<br />
            <span className="text-gradient-gold">Originals</span>
          </Heading>
          <Text size="xl" color="secondary" align="center" className="max-w-3xl mx-auto leading-relaxed mb-4">
            Each SoundBYTE Original is a <span className="text-gold-500 font-semibold">one-of-a-kind masterpiece</span> —
            a physical artwork that transforms your most meaningful sounds into
            timeless visual art.
          </Text>
          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            Commissioned by royalty, Fortune 500 executives, and discerning collectors worldwide.
          </Text>
        </ScrollReveal>

        {/* Floating artwork preview */}
        <FloatingArtworkPreview />

        {/* Process steps */}
        <div className="mb-24 sm:mb-32">
          <ScrollReveal direction="up" className="text-center mb-16">
            <h2 className="font-display text-3xl text-white mb-4">
              The Creation Journey
            </h2>
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

        {/* Size & Pricing */}
        <ScrollReveal direction="up" className="mb-12">
          <h2 className="font-display text-3xl text-white text-center mb-4">
            Choose Your Size
          </h2>
          <p className="text-white/60 text-center mb-16 max-w-xl mx-auto">
            {PRICING.anchorText}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24 sm:mb-32">
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

        {/* FAQ */}
        <ScrollReveal direction="up" className="mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" className="text-center">
          <motion.div
            className="inline-block p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(16, 185, 129, 0.1)',
                  '0 0 60px rgba(16, 185, 129, 0.2)',
                  '0 0 30px rgba(16, 185, 129, 0.1)',
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
    </section>
  );
}
