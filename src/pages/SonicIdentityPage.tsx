/**
 * Sonic Identity Page
 *
 * Dedicated page for the Sonic Identity product line.
 * Features:
 * - Product overview
 * - How it works
 * - Pricing tiers
 * - Use cases
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { ScrollReveal, StaggerReveal } from '../components/animations/ScrollReveal';

// ═══════════════════════════════════════════════════════════════════════════
// PRICING DATA
// ═══════════════════════════════════════════════════════════════════════════

const pricingTiers = [
  {
    name: 'Digital Only',
    price: '$99',
    description: 'Perfect for social sharing',
    features: [
      'High-resolution digital file',
      'Multiple format options (PNG, JPG)',
      'Social media ready sizes',
      'Instant delivery',
      'Personal use license'
    ]
  },
  {
    name: 'Print Ready',
    price: '$249',
    description: 'Ready for your own framing',
    features: [
      'Everything in Digital Only',
      'Print-ready file (300dpi)',
      'Large format options',
      'Commercial use license',
      'Color calibration guide'
    ],
    popular: true
  },
  {
    name: 'Framed Print',
    price: '$499',
    description: 'Gallery-quality finish',
    features: [
      'Everything in Print Ready',
      'Premium framed print',
      'Choice of frame styles',
      'Museum-quality materials',
      'Worldwide shipping included'
    ]
  }
];

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
      <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-gold-500/30 to-gold-500/10" />

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
// PRICING CARD
// ═══════════════════════════════════════════════════════════════════════════

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

function PricingCard({ name, price, description, features, popular }: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`
        relative p-8 rounded-3xl border transition-all duration-500
        ${popular
          ? 'bg-gradient-to-b from-gold-500/15 to-gold-500/5 border-gold-500/40'
          : 'bg-white/[0.02] border-white/10 hover:border-gold-500/30'
        }
      `}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 bg-gold-500 text-luxury-black text-xs font-bold rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="font-display text-2xl text-white font-semibold mb-2">{name}</h3>
        <div className="mb-2">
          <span className="font-display text-4xl text-gradient-gold font-bold">{price}</span>
        </div>
        <p className="text-white/60 text-sm">{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button variant={popular ? 'primary' : 'outline'} fullWidth>
        Get Started
      </Button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// USE CASE CARD
// ═══════════════════════════════════════════════════════════════════════════

interface UseCaseCardProps {
  emoji: string;
  title: string;
  description: string;
}

function UseCaseCard({ emoji, title, description }: UseCaseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold-500/30 transition-all duration-500"
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h4 className="font-display text-lg text-white font-semibold mb-2">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SONIC IDENTITY PAGE MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SonicIdentityPage() {
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

  const useCases = [
    { emoji: '💒', title: 'Wedding Vows', description: 'Capture the moment you said "I do" in visual form' },
    { emoji: '👶', title: 'First Words', description: "Immortalize your baby's precious first sounds" },
    { emoji: '🕊️', title: 'Memorials', description: "Preserve a loved one's voice forever" },
    { emoji: '💑', title: 'Anniversary', description: 'Celebrate years of love with voice portraits' },
    { emoji: '🎓', title: 'Graduation', description: 'Mark achievements with meaningful sound art' },
    { emoji: '🎂', title: 'Birthday', description: 'Unique gift that captures their essence' },
    { emoji: '💝', title: 'Love Messages', description: 'Transform sweet nothings into art' },
    { emoji: '🐾', title: 'Pet Sounds', description: 'Your furry friend immortalized in waves' }
  ];

  return (
    <section className="relative py-32 sm:py-40 bg-gradient-to-b from-luxury-black via-luxury-charcoal to-luxury-black min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px]" />
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
        <ScrollReveal direction="up" className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-gold-500 text-sm font-medium">Now Available Worldwide</span>
          </div>

          <Heading as="h1" size="hero" align="center" className="mb-6">
            Sonic <span className="text-gradient-gold">Identity™</span>
          </Heading>

          <Text size="xl" color="secondary" align="center" className="max-w-3xl mx-auto leading-relaxed mb-4">
            Own a piece of Amrita's signature sound art — <span className="text-white">accessible to everyone</span>.
            Transform any voice or sound into stunning visual art.
          </Text>

          <Text size="lg" color="muted" align="center" className="max-w-2xl mx-auto">
            The perfect meaningful gift for weddings, birthdays, memorials, and life's precious moments.
          </Text>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal direction="up" className="mb-20 sm:mb-24">
          <h2 className="font-display text-3xl text-white text-center mb-12">
            How It Works
          </h2>
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
              description="Choose your style, colors, and format"
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
              description="Download or get it shipped globally"
              icon={icons.ship}
            />
          </div>
        </ScrollReveal>

        {/* Pricing */}
        <ScrollReveal direction="up" className="mb-20">
          <h2 className="font-display text-3xl text-white text-center mb-4">
            Choose Your Format
          </h2>
          <p className="text-white/60 text-center mb-12 max-w-lg mx-auto">
            From instant digital downloads to premium framed prints shipped worldwide
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>
        </ScrollReveal>

        {/* Use Cases */}
        <ScrollReveal direction="up" className="mb-20">
          <h2 className="font-display text-3xl text-white text-center mb-4">
            Perfect For Every Moment
          </h2>
          <p className="text-white/60 text-center mb-12 max-w-lg mx-auto">
            Meaningful gifts that capture life's precious sounds
          </p>
          <StaggerReveal direction="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <UseCaseCard key={useCase.title} {...useCase} />
            ))}
          </StaggerReveal>
        </ScrollReveal>

        {/* Trust signals */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="grid sm:grid-cols-3 gap-6">
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
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" className="text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10">
            <h3 className="font-display text-2xl sm:text-3xl text-white font-semibold mb-4">
              Ready to Create Your Sonic Identity™?
            </h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Transform any sound into stunning visual art in minutes.
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
              Create Your Sonic Identity™
            </Button>
            <p className="mt-4 text-white/40 text-sm">
              Free preview • Satisfaction guaranteed • Ships worldwide
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
