/**
 * Commission Section
 *
 * Premium questionnaire flow for high-value conversions.
 * Multi-step form with elegant transitions and personalization.
 *
 * Features:
 * - Step-by-step questionnaire
 * - Progress indicator
 * - Smooth transitions between steps
 * - Validation and error handling
 */

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Heading, Text, Label } from '../ui/Typography';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../animations/ScrollReveal';
import { durations } from '../../lib/animations';
import { cn } from '../../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface FormData {
  productType: 'soundbyte' | 'sonic-identity' | '';
  soundType: string;
  occasion: string;
  size: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  message: string;
}

type StepId = 'product' | 'sound' | 'details' | 'contact';

interface Step {
  id: StepId;
  title: string;
  subtitle: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP DATA
// ═══════════════════════════════════════════════════════════════════════════

const steps: Step[] = [
  { id: 'product', title: 'Choose Your Art', subtitle: 'What type of piece interests you?' },
  { id: 'sound', title: 'Your Sound Story', subtitle: 'Tell us about the sound you want to capture' },
  { id: 'details', title: 'Preferences', subtitle: 'Help us understand your vision' },
  { id: 'contact', title: 'Get in Touch', subtitle: 'How can we reach you?' }
];

const soundTypes = [
  { id: 'voice', label: 'Voice Recording', description: 'Spoken words, vows, messages' },
  { id: 'song', label: 'Song or Music', description: 'A meaningful melody' },
  { id: 'heartbeat', label: 'Heartbeat', description: 'The rhythm of life' },
  { id: 'laughter', label: 'Laughter', description: 'Joy captured in sound' },
  { id: 'other', label: 'Other', description: 'Something unique' }
];

const occasions = [
  { id: 'wedding', label: 'Wedding / Anniversary' },
  { id: 'baby', label: 'New Baby / First Words' },
  { id: 'memorial', label: 'Memorial / Tribute' },
  { id: 'milestone', label: 'Birthday / Milestone' },
  { id: 'corporate', label: 'Corporate / Brand' },
  { id: 'personal', label: 'Personal / Self' }
];

const sizes = [
  { id: 'small', label: 'Small (40-60cm)', description: 'Perfect for intimate spaces' },
  { id: 'medium', label: 'Medium (80-100cm)', description: 'Ideal focal point' },
  { id: 'large', label: 'Large (120-150cm)', description: 'Statement piece' },
  { id: 'xlarge', label: 'Extra Large (180cm+)', description: 'Grand installation' }
];

const timelines = [
  { id: 'flexible', label: 'Flexible', description: 'No rush' },
  { id: '3months', label: 'Within 3 months', description: 'Standard timeline' },
  { id: '6weeks', label: 'Within 6 weeks', description: 'Priority creation' },
  { id: 'urgent', label: 'Urgent (event coming up)', description: 'Rush available' }
];

const budgets = [
  { id: 'entry', label: '$500 - $2,000', description: 'Sonic Identity range' },
  { id: 'mid', label: '$3,500 - $8,000', description: 'SoundBYTE standard' },
  { id: 'premium', label: '$8,000 - $15,000', description: 'Premium commission' },
  { id: 'custom', label: '$15,000+', description: 'Bespoke creation' }
];

// ═══════════════════════════════════════════════════════════════════════════
// OPTION CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

function OptionCard({ selected, onClick, title, description, icon }: OptionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full p-4 sm:p-5 rounded-xl text-left transition-all duration-300',
        'border',
        selected
          ? 'bg-gold-500/10 border-gold-500/50'
          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className={cn(
            'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
            selected ? 'bg-gold-500/20 text-gold-500' : 'bg-white/5 text-white/60'
          )}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4 className={cn(
            'font-display font-semibold',
            selected ? 'text-gold-500' : 'text-white'
          )}>
            {title}
          </h4>
          {description && (
            <p className="text-white/50 text-sm mt-1">{description}</p>
          )}
        </div>
        <div className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
          selected ? 'border-gold-500 bg-gold-500' : 'border-white/30'
        )}>
          {selected && (
            <svg className="w-3 h-3 text-luxury-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════════════════════

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
}

function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Step labels */}
      <div className="hidden sm:flex justify-between mb-2">
        {steps.map((step, index) => (
          <span
            key={step.id}
            className={cn(
              'text-xs font-medium',
              index <= currentStep ? 'text-gold-500' : 'text-white/30'
            )}
          >
            {step.title}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gold-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: durations.smooth, ease: 'easeOut' }}
        />
      </div>

      {/* Mobile step indicator */}
      <p className="sm:hidden text-center text-white/50 text-sm mt-2">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FORM STEPS
// ═══════════════════════════════════════════════════════════════════════════

interface StepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

function ProductStep({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-4">
      <OptionCard
        selected={formData.productType === 'soundbyte'}
        onClick={() => updateFormData({ productType: 'soundbyte' })}
        title="SoundBYTE Original"
        description="Hand-painted canvas with gold leaf • $3,500 - $15,000+"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />
      <OptionCard
        selected={formData.productType === 'sonic-identity'}
        onClick={() => updateFormData({ productType: 'sonic-identity' })}
        title="Sonic Identity"
        description="Museum-quality print • $500 - $2,000"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      />
    </div>
  );
}

function SoundStep({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white/60 text-sm mb-3">Type of Sound</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {soundTypes.map(type => (
            <OptionCard
              key={type.id}
              selected={formData.soundType === type.id}
              onClick={() => updateFormData({ soundType: type.id })}
              title={type.label}
              description={type.description}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-3">Occasion</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {occasions.map(occasion => (
            <OptionCard
              key={occasion.id}
              selected={formData.occasion === occasion.id}
              onClick={() => updateFormData({ occasion: occasion.id })}
              title={occasion.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailsStep({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white/60 text-sm mb-3">Preferred Size</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {sizes.map(size => (
            <OptionCard
              key={size.id}
              selected={formData.size === size.id}
              onClick={() => updateFormData({ size: size.id })}
              title={size.label}
              description={size.description}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-3">Timeline</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {timelines.map(timeline => (
            <OptionCard
              key={timeline.id}
              selected={formData.timeline === timeline.id}
              onClick={() => updateFormData({ timeline: timeline.id })}
              title={timeline.label}
              description={timeline.description}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-3">Budget Range</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {budgets.map(budget => (
            <OptionCard
              key={budget.id}
              selected={formData.budget === budget.id}
              onClick={() => updateFormData({ budget: budget.id })}
              title={budget.label}
              description={budget.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactStep({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white/60 text-sm mb-2">Your Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">Tell Us Your Story (Optional)</label>
        <textarea
          value={formData.message}
          onChange={(e) => updateFormData({ message: e.target.value })}
          placeholder="Share the story behind the sound you want to capture..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
        />
      </div>

      <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20">
        <p className="text-white/70 text-sm">
          <span className="text-gold-500 font-semibold">What happens next?</span><br />
          We'll review your request and reach out within 24-48 hours to schedule
          a complimentary consultation call.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SUCCESS STATE
// ═══════════════════════════════════════════════════════════════════════════

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold-500/20 flex items-center justify-center">
        <svg className="w-10 h-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <Heading as="h3" size="section" align="center" className="mb-4">
        Thank You!
      </Heading>
      <Text color="muted" align="center" className="max-w-md mx-auto">
        Your commission inquiry has been received. Amrita will personally
        review your request and reach out within 24-48 hours.
      </Text>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMMISSION SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function CommissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    productType: '',
    soundType: '',
    occasion: '',
    size: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
    message: ''
  });

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const canProceed = useCallback(() => {
    switch (steps[currentStep].id) {
      case 'product':
        return !!formData.productType;
      case 'sound':
        return !!formData.soundType && !!formData.occasion;
      case 'details':
        return !!formData.size && !!formData.timeline && !!formData.budget;
      case 'contact':
        return !!formData.name && !!formData.email;
      default:
        return false;
    }
  }, [currentStep, formData]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  }, [currentStep, formData]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const renderStep = () => {
    const stepProps = { formData, updateFormData };
    switch (steps[currentStep].id) {
      case 'product':
        return <ProductStep {...stepProps} />;
      case 'sound':
        return <SoundStep {...stepProps} />;
      case 'details':
        return <DetailsStep {...stepProps} />;
      case 'contact':
        return <ContactStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="commission"
      className="relative py-24 sm:py-32 lg:py-40 bg-luxury-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <Container size="md">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <Label variant="gold" className="mb-4">Begin Your Journey</Label>
          <Heading as="h2" size="title" align="center" className="mb-6">
            Commission <span className="text-gradient-gold">Your Piece</span>
          </Heading>
          <Text color="muted" align="center" className="max-w-xl mx-auto">
            Share your vision with us. Every masterpiece begins with a conversation.
          </Text>
        </ScrollReveal>

        {/* Form container */}
        <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10">
          {isSubmitted ? (
            <SuccessState />
          ) : (
            <>
              {/* Progress indicator */}
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={steps.length}
                steps={steps}
              />

              {/* Step header */}
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl text-white font-semibold mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-white/50">{steps[currentStep].subtitle}</p>
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: durations.fast }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={currentStep === 0 ? 'invisible' : ''}
                >
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  {currentStep === steps.length - 1 ? 'Submit Inquiry' : 'Continue →'}
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
