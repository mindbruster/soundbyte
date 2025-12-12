/**
 * Sonic Identity™ Section - PRODUCT-FOCUSED
 *
 * This is NOT just a feature - it's a real, purchasable product line.
 * Positioned as the ACCESSIBLE, DEMOCRATIZED version of Amrita's art.
 *
 * Key messaging:
 * - Fun, tech-driven, instant, global
 * - Clear pricing tiers
 * - Ships worldwide
 * - Perfect for gifts & personal moments
 */

import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Container } from '../ui/Container';
import { Heading, Text, Label } from '../ui/Typography';
import { Button } from '../ui/Button';
import { ScrollReveal, StaggerReveal } from '../animations/ScrollReveal';
import { cn } from '../../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// PRICING TIER CARD - Interactive 3D Card
// ═══════════════════════════════════════════════════════════════════════════

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  index: number;
}

function PricingTierCard({ name, price, description, features, popular, index }: PricingTierProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className="relative group"
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1.5 bg-gold-500 text-luxury-black text-xs font-bold rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className={cn(
        'relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 h-full',
        popular
          ? 'bg-gradient-to-b from-gold-500/15 to-gold-500/5 border-gold-500/40'
          : 'bg-white/[0.02] border-white/10 hover:border-gold-500/30'
      )}>
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? '0 0 60px rgba(212, 168, 83, 0.2), inset 0 0 30px rgba(212, 168, 83, 0.05)'
              : '0 0 0px rgba(212, 168, 83, 0)',
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Content */}
        <div className="relative">
          <h4 className="font-display text-xl text-white font-semibold mb-2">
            {name}
          </h4>
          <div className="mb-4">
            <span className="font-display text-3xl sm:text-4xl text-gradient-gold font-bold">
              {price}
            </span>
          </div>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            {description}
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                <svg className="w-5 h-5 mt-0.5 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            variant={popular ? 'primary' : 'outline'}
            size="lg"
            fullWidth
          >
            Order Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOW IT WORKS STEP
// ═══════════════════════════════════════════════════════════════════════════

interface HowItWorksStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function HowItWorksStep({ number, title, description, icon }: HowItWorksStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Connection line (hidden on mobile) */}
      <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-gold-500/30 to-gold-500/10" />

      {/* Icon circle */}
      <div className="relative w-16 h-16 mb-4 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
        {icon}
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold-500 text-luxury-black text-xs font-bold flex items-center justify-center">
          {number}
        </span>
      </div>

      <h4 className="font-display text-lg text-white font-semibold mb-2">{title}</h4>
      <p className="text-white/60 text-sm max-w-[200px]">{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SONIC IDENTITY SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SonicIdentitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Pricing tiers based on Amrita's pricing
  const pricingTiers = [
    {
      name: 'Digital Only',
      price: '$49–$199',
      description: 'Perfect for digital display or DIY printing',
      features: [
        'High-resolution digital file',
        'Multiple format options (PNG, PDF)',
        'Instant download delivery',
        'Social media optimized versions',
        'Perfect for digital frames'
      ]
    },
    {
      name: 'Small Print',
      price: '$99–$299',
      description: 'Museum-quality print, ready to display',
      popular: true,
      features: [
        'Premium archival paper or canvas',
        'Sizes: 20×16 to 30×24 cm',
        'Unframed or framed options',
        'Ships worldwide in 7-10 days',
        'Certificate of authenticity',
        'Perfect for gifting'
      ]
    },
    {
      name: 'Medium Print',
      price: '$249–$799',
      description: 'Statement piece for living spaces',
      features: [
        'Gallery-grade paper or canvas',
        'Sizes: 44×35 to 64×51 cm',
        'Framing options available',
        'Professional packaging',
        'Certificate of authenticity',
        'Collector favourite'
      ]
    },
    {
      name: 'Large Print',
      price: '$499–$1,400',
      description: 'Impressive centerpiece artwork',
      features: [
        'Premium canvas or paper',
        'Sizes: 92×73 cm and up',
        'Custom framing available',
        'White glove delivery option',
        'Certificate of authenticity',
        'Premium size'
      ]
    },
    {
      name: 'Luxury Aluminium',
      price: 'Up to $3,500',
      description: 'Ultra-premium museum finish',
      features: [
        'Aluminium dibond mounting',
        'Floating frame included',
        'Stunning visual depth',
        'Sizes up to 120×100 cm',
        'White glove installation',
        'The ultimate statement'
      ]
    }
  ];

  // Icons
  const icons = {
    record: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    customize: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    preview: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    ship: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  };

  return (
    <section
      ref={sectionRef}
      id="sonic-identity"
      className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-luxury-charcoal via-luxury-black to-luxury-charcoal overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <Container size="xl">
        {/* Section Header - Establishes this as a PRODUCT */}
        <ScrollReveal direction="up" className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-gold-500 text-sm font-medium">Now Available Worldwide</span>
          </div>

          <Heading as="h2" size="hero" align="center" className="mb-6">
            Sonic <span className="text-gradient-gold">Identity™</span>
          </Heading>

          <Text size="xl" color="secondary" align="center" className="max-w-3xl mx-auto leading-relaxed mb-4">
            Own a piece of Amrita's signature sound art — <span className="text-white">at an accessible price point</span>.
            Transform any voice or sound into stunning visual art, printed and shipped globally.
          </Text>

          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            The perfect meaningful gift for weddings, birthdays, memorials, and life's precious moments.
          </Text>
        </ScrollReveal>

        {/* How It Works - Simple 4 steps */}
        <ScrollReveal direction="up" className="mb-20 sm:mb-24">
          <h3 className="font-display text-2xl text-white text-center mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            <HowItWorksStep
              number="1"
              title="Record"
              description="Upload or record any voice message or sound"
              icon={icons.record}
            />
            <HowItWorksStep
              number="2"
              title="Customize"
              description="Choose your style, colors, and size"
              icon={icons.customize}
            />
            <HowItWorksStep
              number="3"
              title="Preview"
              description="See your unique artwork instantly"
              icon={icons.preview}
            />
            <HowItWorksStep
              number="4"
              title="Receive"
              description="Ships worldwide in 7-14 days"
              icon={icons.ship}
            />
          </div>
        </ScrollReveal>

        {/* Pricing Tiers Grid */}
        <ScrollReveal direction="up" className="mb-8">
          <h3 className="font-display text-2xl text-white text-center mb-4">
            Choose Your Format
          </h3>
          <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
            From digital downloads to luxury aluminium prints — find the perfect option for your space and budget.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingTierCard
              key={tier.name}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              popular={tier.popular}
              index={index}
            />
          ))}
        </div>

        {/* Trust signals */}
        <StaggerReveal direction="up" className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-display font-bold text-gradient-gold mb-2">10,000+</div>
            <p className="text-white/60 text-sm">Happy Customers</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-display font-bold text-gradient-gold mb-2">50+</div>
            <p className="text-white/60 text-sm">Countries Shipped</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl font-display font-bold text-gradient-gold mb-2">4.9★</div>
            <p className="text-white/60 text-sm">Customer Rating</p>
          </div>
        </StaggerReveal>

        {/* Gift occasions */}
        <ScrollReveal direction="up" className="text-center">
          <h3 className="font-display text-xl text-white mb-6">
            Perfect For Every Moment
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Wedding Vows', 'First Words', 'Memorial', 'Anniversary', 'Graduation', 'Birthday', 'Love Message', 'Pet Sounds'].map((occasion) => (
              <span
                key={occasion}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:border-gold-500/30 hover:text-gold-500 transition-colors cursor-default"
              >
                {occasion}
              </span>
            ))}
          </div>

          <Button
            variant="primary"
            size="xl"
            rightIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
          >
            Create Your Sonic Identity™
          </Button>
          <p className="mt-4 text-white/40 text-sm">
            Free preview • Satisfaction guaranteed • Ships worldwide
          </p>
        </ScrollReveal>
      </Container>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-luxury-black to-transparent" />
    </section>
  );
}
