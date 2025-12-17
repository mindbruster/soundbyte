/**
 * Commission Questionnaire - Premium Interactive Experience
 *
 * A multi-step, immersive questionnaire that makes users feel they're
 * investing in something truly special. Features:
 * - Step-by-step journey with progress visualization
 * - Animated transitions between sections
 * - Sound wave visualization that builds as they progress
 * - Personal, intimate question presentation
 * - Premium micro-interactions
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';

// ═══════════════════════════════════════════════════════════════════════════
// QUESTIONNAIRE DATA STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

interface Question {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'file' | 'select' | 'size-select' | 'material-select';
  options?: { value: string; label: string; description?: string; price?: string }[];
  required?: boolean;
}

interface QuestionSection {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

const questionnaireSections: QuestionSection[] = [
  {
    id: 'voice',
    icon: '🎤',
    title: 'Voice & Name',
    subtitle: 'The foundation of your SoundBYTE',
    questions: [
      {
        id: 'name_featured',
        label: 'What name or word would you like featured in your SoundBYTE?',
        placeholder: 'Enter the name or word...',
        type: 'text',
        required: true
      },
      {
        id: 'voice_note_reminder',
        label: 'Please record and send a voice note of you (or the person) saying this name clearly.',
        placeholder: 'Voice note to be sent via WhatsApp or email after submission',
        type: 'text'
      },
      {
        id: 'pronunciation',
        label: 'Is there a preferred pronunciation or emphasis on certain syllables?',
        placeholder: 'Describe any specific pronunciation details...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'story',
    icon: '💫',
    title: 'The Story Behind the Name',
    subtitle: 'Every name carries a universe of meaning',
    questions: [
      {
        id: 'name_meaning',
        label: 'What is the meaning or significance of this name to you (or the person)?',
        placeholder: 'Share the deeper meaning...',
        type: 'textarea',
        required: true
      },
      {
        id: 'memorable_story',
        label: 'Is there a memorable story behind it?',
        placeholder: 'Tell us the story...',
        type: 'textarea'
      },
      {
        id: 'gift_inspiration',
        label: 'If the artwork is a gift, what inspired you to choose this person or word?',
        placeholder: 'What makes this gift special...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'background',
    icon: '🌍',
    title: 'Personal Background',
    subtitle: 'The places that shaped the soul',
    questions: [
      {
        id: 'birthplace',
        label: 'Where was the person born?',
        placeholder: 'City, Country...',
        type: 'text'
      },
      {
        id: 'places_connected',
        label: 'What countries or cities have they lived in or feel connected to?',
        placeholder: 'List meaningful places...',
        type: 'textarea'
      },
      {
        id: 'memorable_places',
        label: 'Are there memorable places, holidays, or experiences that define them?',
        placeholder: 'Destinations, landscapes, cultural roots, symbolic landmarks...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'passions',
    icon: '🎨',
    title: 'Hobbies, Interests & Passions',
    subtitle: 'What sets the spirit on fire',
    questions: [
      {
        id: 'main_passions',
        label: 'What are their main hobbies or passions?',
        placeholder: 'Share their passions...',
        type: 'textarea'
      },
      {
        id: 'sports_arts',
        label: 'Do they enjoy specific sports, arts, or creative pursuits?',
        placeholder: 'Activities they love...',
        type: 'textarea'
      },
      {
        id: 'symbols_brands',
        label: 'Are there particular objects, symbols, or brands that reflect their lifestyle?',
        placeholder: 'Architecture, cars, music, travel, fine food...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'favorites',
    icon: '🍷',
    title: 'Favorite Things',
    subtitle: 'The details that define taste',
    questions: [
      {
        id: 'food_drinks',
        label: 'What are their favorite foods, drinks, or restaurants?',
        placeholder: 'Culinary favorites...',
        type: 'textarea'
      },
      {
        id: 'quotes_sayings',
        label: 'Do they have a quote, saying, or phrase they often use?',
        placeholder: 'Words they live by...',
        type: 'textarea'
      },
      {
        id: 'music',
        label: 'Are there songs, artists, or styles of music that best represent them?',
        placeholder: 'Their soundtrack...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'family',
    icon: '💞',
    title: 'Family & Personal Life',
    subtitle: 'The bonds that matter most',
    questions: [
      {
        id: 'relationship_status',
        label: 'Are they married, in a relationship, or have children?',
        placeholder: 'Family details...',
        type: 'text'
      },
      {
        id: 'include_family',
        label: 'Would you like to include family members or loved ones in the artwork?',
        placeholder: 'Who should be represented...',
        type: 'textarea'
      },
      {
        id: 'special_relationships',
        label: 'Please share any special relationships or memories.',
        placeholder: 'Grandchildren, siblings, pets, cherished bonds...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'career',
    icon: '💼',
    title: 'Career or Life Work',
    subtitle: 'The legacy being built',
    questions: [
      {
        id: 'profession',
        label: 'What do they (or you) do professionally?',
        placeholder: 'Their profession or calling...',
        type: 'text'
      },
      {
        id: 'milestones',
        label: 'Any key milestones, achievements, or companies you\'d like represented?',
        placeholder: 'Logos, symbols, tools of the trade...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'unique',
    icon: '🌟',
    title: 'Unique Details & Traits',
    subtitle: 'What makes them unforgettable',
    questions: [
      {
        id: 'quirks',
        label: 'Are there any personal quirks, habits, or characteristics that make them unforgettable?',
        placeholder: 'The little things that define them...',
        type: 'textarea'
      },
      {
        id: 'beliefs',
        label: 'Any causes, beliefs, or philosophies that define who they are?',
        placeholder: 'What they stand for...',
        type: 'textarea'
      },
      {
        id: 'personality_words',
        label: 'What words best describe their personality or spirit?',
        placeholder: 'Adventurous, warm, driven, creative...',
        type: 'text'
      }
    ]
  },
  {
    id: 'visuals',
    icon: '📸',
    title: 'Photos & Visual References',
    subtitle: 'Images that tell the story',
    questions: [
      {
        id: 'photos_note',
        label: 'Please share 3-5 photos of the person, family, or significant moments.',
        placeholder: 'Send via WhatsApp or email after submission',
        type: 'text'
      },
      {
        id: 'logos_symbols',
        label: 'Any logos, symbols, or references you\'d like incorporated?',
        placeholder: 'Describe visual elements...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'size-material',
    icon: '📐',
    title: 'Size & Materials',
    subtitle: 'Crafting the perfect piece for your space',
    questions: [
      {
        id: 'artwork_size',
        label: 'What size would you like for your SoundBYTE® Original?',
        type: 'size-select',
        required: true,
        options: [
          {
            value: 'mini',
            label: 'Mini',
            description: '20 × 16 cm (framed: 25 × 21 cm) — Small gift, entry tier',
            price: '$3,500 – $4,500'
          },
          {
            value: 'extra-small',
            label: 'Extra Small',
            description: '30 × 24 cm (framed: 35 × 29 cm) — Great for gifting',
            price: '$4,500 – $6,000'
          },
          {
            value: 'small',
            label: 'Small',
            description: '44 × 35 cm (framed: 49 × 40 cm) — Popular mid-size',
            price: '$6,000 – $8,000'
          },
          {
            value: 'medium',
            label: 'Medium',
            description: '64 × 51 cm (framed: 69 × 56 cm) — Collector favourite',
            price: '$8,000 – $12,000'
          },
          {
            value: 'large',
            label: 'Large',
            description: '92 × 73 cm (framed: 97 × 78 cm) — Premium size',
            price: '$12,000 – $15,000+'
          },
          {
            value: 'undecided',
            label: 'I\'d like guidance',
            description: 'Let\'s discuss during consultation',
            price: ''
          }
        ]
      },
      {
        id: 'material_preference',
        label: 'Do you have a preference for materials?',
        type: 'material-select',
        options: [
          {
            value: 'canvas-gold',
            label: 'Canvas with Gold Leaf',
            description: 'Hand-painted on premium canvas with 24k gold leaf accents'
          },
          {
            value: 'wood-panel',
            label: 'White Wood Panel',
            description: 'Elegant finish on museum-quality wood panel'
          },
          {
            value: 'mixed-media',
            label: 'Mixed Media',
            description: 'Combination of materials including metallic pigments'
          },
          {
            value: 'discuss',
            label: 'Open to suggestions',
            description: 'I\'d like Amrita\'s recommendation'
          }
        ]
      },
      {
        id: 'framing_preference',
        label: 'Would you like framing included?',
        type: 'select',
        options: [
          { value: 'framed', label: 'Yes, include framing', description: 'Museum-quality custom framing' },
          { value: 'unframed', label: 'No, deliver unframed', description: 'For custom framing locally' },
          { value: 'discuss', label: 'Let\'s discuss options', description: '' }
        ]
      },
      {
        id: 'display_location',
        label: 'Where do you plan to display the artwork?',
        placeholder: 'Living room, office, entrance hall, yacht, private collection...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'final',
    icon: '🪄',
    title: 'Final Notes',
    subtitle: 'Anything else from the heart',
    questions: [
      {
        id: 'additional',
        label: 'Is there anything else you\'d like to include or emphasize in your SoundBYTE?',
        placeholder: 'Quotes, dedications, color preferences, background story...',
        type: 'textarea'
      },
      {
        id: 'timeline',
        label: 'Do you have a specific deadline or occasion in mind?',
        placeholder: 'Anniversary, birthday, special event...',
        type: 'text'
      },
      {
        id: 'budget_range',
        label: 'What is your approximate budget range?',
        type: 'select',
        options: [
          { value: '3500-4500', label: '$3,500 – $4,500', description: 'Mini format' },
          { value: '4500-6000', label: '$4,500 – $6,000', description: 'Extra Small format' },
          { value: '6000-8000', label: '$6,000 – $8,000', description: 'Small format' },
          { value: '8000-12000', label: '$8,000 – $12,000', description: 'Medium format' },
          { value: '12000-plus', label: '$12,000 – $15,000+', description: 'Large / Premium format' },
          { value: 'discuss', label: 'I\'d prefer to discuss', description: '' }
        ]
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS SOUND WAVE VISUALIZATION
// ═══════════════════════════════════════════════════════════════════════════

interface ProgressWaveProps {
  progress: number; // 0-1
  currentSection: number;
  totalSections: number;
}

function ProgressWave({ progress, currentSection, totalSections }: ProgressWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const centerY = height / 2;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw wave based on progress
    const activeWidth = width * progress;

    // Background wave (inactive)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(51, 204, 128, 0.15)';
    ctx.lineWidth = 2;

    for (let x = 0; x <= width; x += 2) {
      const y = centerY + Math.sin(x * 0.03) * 15;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Active wave (filled progress)
    if (progress > 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#33cc80';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#33cc80';
      ctx.shadowBlur = 10;

      for (let x = 0; x <= activeWidth; x += 2) {
        const amplitude = 15 + Math.sin(x * 0.01) * 5;
        const y = centerY + Math.sin(x * 0.03 + Date.now() * 0.002) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Section markers
    for (let i = 0; i <= totalSections; i++) {
      const x = (i / totalSections) * width;
      const isCompleted = i < currentSection;
      const isCurrent = i === currentSection;

      ctx.beginPath();
      ctx.arc(x, centerY, isCurrent ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isCompleted ? '#33cc80' : isCurrent ? '#5ce0a3' : 'rgba(51, 204, 128, 0.3)';
      ctx.fill();

      if (isCurrent) {
        ctx.beginPath();
        ctx.arc(x, centerY, 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(51, 204, 128, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }, [progress, currentSection, totalSections]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-16"
      style={{ display: 'block' }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIZE SELECTION CARD
// ═══════════════════════════════════════════════════════════════════════════

interface SizeCardProps {
  option: { value: string; label: string; description?: string; price?: string };
  isSelected: boolean;
  onSelect: () => void;
}

function SizeCard({ option, isSelected, onSelect }: SizeCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={`
        relative p-5 rounded-xl border text-left transition-all duration-300 w-full
        ${isSelected
          ? 'bg-gold-500/15 border-gold-500/50 shadow-lg shadow-gold-500/10'
          : 'bg-white/[0.02] border-white/10 hover:border-gold-500/30'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selection indicator */}
      <div className={`
        absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center
        ${isSelected ? 'border-gold-500 bg-gold-500' : 'border-white/30'}
      `}>
        {isSelected && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 text-luxury-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </div>

      <h4 className={`font-display text-lg font-semibold mb-1 ${isSelected ? 'text-gold-500' : 'text-white'}`}>
        {option.label}
      </h4>
      {option.description && (
        <p className="text-white/60 text-sm mb-2">{option.description}</p>
      )}
      {option.price && (
        <p className="text-gold-500/80 text-sm font-medium">{option.price}</p>
      )}
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED INPUT FIELD
// ═══════════════════════════════════════════════════════════════════════════

interface AnimatedInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  index: number;
}

function AnimatedInput({ question, value, onChange, index }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Render size selection cards
  if (question.type === 'size-select' && question.options) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <label className="block mb-4">
          <span className="text-white/90 text-base font-medium leading-relaxed">
            {question.label}
            {question.required && <span className="text-gold-500 ml-1">*</span>}
          </span>
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          {question.options.map((option) => (
            <SizeCard
              key={option.value}
              option={option}
              isSelected={value === option.value}
              onSelect={() => onChange(option.value)}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  // Render material selection cards
  if (question.type === 'material-select' && question.options) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <label className="block mb-4">
          <span className="text-white/90 text-base font-medium leading-relaxed">
            {question.label}
            {question.required && <span className="text-gold-500 ml-1">*</span>}
          </span>
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          {question.options.map((option) => (
            <SizeCard
              key={option.value}
              option={option}
              isSelected={value === option.value}
              onSelect={() => onChange(option.value)}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  // Render standard select dropdown
  if (question.type === 'select' && question.options) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <label className="block mb-3">
          <span className="text-white/90 text-base font-medium leading-relaxed">
            {question.label}
            {question.required && <span className="text-gold-500 ml-1">*</span>}
          </span>
        </label>
        <div className="flex flex-wrap gap-3">
          {question.options.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                px-5 py-3 rounded-xl border transition-all duration-300
                ${value === option.value
                  ? 'bg-gold-500/15 border-gold-500/50 text-gold-500'
                  : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-gold-500/30'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{option.label}</span>
              {option.description && (
                <span className="text-white/50 text-xs block mt-0.5">{option.description}</span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <label className="block mb-3">
        <span className="text-white/90 text-base font-medium leading-relaxed">
          {question.label}
          {question.required && <span className="text-gold-500 ml-1">*</span>}
        </span>
      </label>

      <motion.div
        animate={{
          borderColor: isFocused ? 'rgba(51, 204, 128, 0.6)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isFocused ? '0 0 30px rgba(51, 204, 128, 0.1)' : 'none'
        }}
        className="relative rounded-xl border bg-white/5 backdrop-blur-sm overflow-hidden"
      >
        {question.type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full px-5 py-4 bg-transparent text-white placeholder-white/30 outline-none resize-none text-base"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={question.placeholder}
            className="w-full px-5 py-4 bg-transparent text-white placeholder-white/30 outline-none text-base"
          />
        )}

        {/* Animated border glow */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400"
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════════════════════════════════

interface SectionHeaderProps {
  section: QuestionSection;
  sectionNumber: number;
  totalSections: number;
}

function SectionHeader({ section, sectionNumber, totalSections }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-12"
    >
      {/* Section number */}
      <motion.span
        className="inline-block text-gold-500/60 text-sm tracking-[0.3em] uppercase mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Step {sectionNumber} of {totalSections}
      </motion.span>

      {/* Icon */}
      <motion.div
        className="text-5xl mb-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
      >
        {section.icon}
      </motion.div>

      {/* Title */}
      <motion.h2
        className="font-display text-3xl md:text-4xl text-white font-bold mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {section.title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-white/50 text-lg italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {section.subtitle}
      </motion.p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION BUTTONS
// ═══════════════════════════════════════════════════════════════════════════

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canProceed: boolean;
}

function Navigation({ currentSection, totalSections, onPrev, onNext, onSubmit, canProceed }: NavigationProps) {
  const isLastSection = currentSection === totalSections - 1;

  return (
    <motion.div
      className="flex justify-between items-center mt-12 pt-8 border-t border-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Previous button */}
      {currentSection > 0 ? (
        <motion.button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 text-white/70 hover:text-white transition-colors"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </motion.button>
      ) : (
        <div />
      )}

      {/* Next / Submit button */}
      <motion.button
        onClick={isLastSection ? onSubmit : onNext}
        disabled={!canProceed}
        className={`
          flex items-center gap-2 px-8 py-4 rounded-full font-medium
          transition-all duration-300
          ${canProceed
            ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-luxury-black hover:shadow-lg hover:shadow-gold-500/25'
            : 'bg-white/10 text-white/30 cursor-not-allowed'
          }
        `}
        whileHover={canProceed ? { scale: 1.02 } : {}}
        whileTap={canProceed ? { scale: 0.98 } : {}}
      >
        {isLastSection ? 'Submit Your Story' : 'Continue'}
        {!isLastSection && (
          <motion.svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        )}
      </motion.button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// THANK YOU SCREEN
// ═══════════════════════════════════════════════════════════════════════════

function ThankYouScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-20"
    >
      <motion.div
        className="text-7xl mb-8"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        ✨
      </motion.div>

      <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6">
        Thank You for Sharing<br />
        <span className="text-gradient-gold">Your Story</span>
      </h2>

      <p className="text-white/60 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
        Your SoundBYTE will be created from the heart and transformed into a
        one-of-one artwork that brings your voice to life.
      </p>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/10">
        <h3 className="text-gold-500 font-medium mb-4">What happens next?</h3>
        <ul className="text-white/70 text-left space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-gold-500 mt-1">1.</span>
            <span>Amrita will review your story personally</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-gold-500 mt-1">2.</span>
            <span>You'll receive a confirmation within 48 hours</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-gold-500 mt-1">3.</span>
            <span>Commission details will be finalized together</span>
          </li>
        </ul>
      </div>

      <motion.p
        className="mt-8 text-white/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Please send your voice note and photos via WhatsApp or email
      </motion.p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN QUESTIONNAIRE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function CommissionQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const progress = (currentSection + 1) / questionnaireSections.length;
  const section = questionnaireSections[currentSection];

  // Check if current section has required fields filled
  const canProceed = section.questions
    .filter(q => q.required)
    .every(q => formData[q.id]?.trim());

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentSection < questionnaireSections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    // In production, this would send data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="questionnaire" className="relative py-20 md:py-32 min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-charcoal/50 to-luxury-black pointer-events-none" />

      <Container size="md" className="relative z-10">
        {!isSubmitted ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <span className="text-gold-500/60 text-sm tracking-[0.3em] uppercase">
                Custom SoundBYTE Commission
              </span>
              <h1 className="font-display text-2xl md:text-3xl text-white/80 mt-4 italic">
                "Your voice becomes visible. Your story becomes timeless."
              </h1>
            </motion.div>

            {/* Progress Wave */}
            <div className="mb-12">
              <ProgressWave
                progress={progress}
                currentSection={currentSection}
                totalSections={questionnaireSections.length}
              />
            </div>

            {/* Current Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionHeader
                  section={section}
                  sectionNumber={currentSection + 1}
                  totalSections={questionnaireSections.length}
                />

                {/* Questions */}
                <div className="space-y-6">
                  {section.questions.map((question, index) => (
                    <AnimatedInput
                      key={question.id}
                      question={question}
                      value={formData[question.id] || ''}
                      onChange={(value) => handleInputChange(question.id, value)}
                      index={index}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <Navigation
                  currentSection={currentSection}
                  totalSections={questionnaireSections.length}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSubmit={handleSubmit}
                  canProceed={canProceed || !section.questions.some(q => q.required)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Section Pills (quick navigation) */}
            <div className="flex justify-center gap-2 mt-12 flex-wrap">
              {questionnaireSections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => setCurrentSection(i)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs transition-all
                    ${i === currentSection
                      ? 'bg-gold-500 text-luxury-black'
                      : i < currentSection
                        ? 'bg-gold-500/20 text-gold-500'
                        : 'bg-white/5 text-white/30'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s.icon}
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <ThankYouScreen />
        )}
      </Container>
    </section>
  );
}
