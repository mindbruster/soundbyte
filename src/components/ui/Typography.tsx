/**
 * Typography Components
 *
 * Consistent typography system for the portfolio.
 * Uses Playfair Display for headings and Inter for body text.
 */

import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// ═══════════════════════════════════════════════════════════════════════════
// HEADING COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'display' | 'hero' | 'title' | 'subtitle' | 'section' | 'small';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  /** Visual size (independent of semantic level) */
  size?: HeadingSize;
  /** Semantic heading level */
  as?: HeadingLevel;
  /** Apply gold gradient */
  gradient?: boolean;
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

const headingSizes: Record<HeadingSize, string> = {
  display: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight',
  hero: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight',
  title: 'text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight',
  subtitle: 'text-3xl sm:text-4xl md:text-5xl leading-tight',
  section: 'text-2xl sm:text-3xl md:text-4xl leading-snug',
  small: 'text-xl sm:text-2xl md:text-3xl leading-snug'
};

const headingWeights: Record<NonNullable<HeadingProps['weight']>, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

const alignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
} as const;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      size = 'title',
      as: Component = 'h2',
      gradient = false,
      weight = 'bold',
      align = 'left',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'font-display',
          headingSizes[size],
          headingWeights[weight],
          alignments[align],
          gradient && 'text-gradient-gold',
          !gradient && 'text-white',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

// ═══════════════════════════════════════════════════════════════════════════
// TEXT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
type TextColor = 'primary' | 'secondary' | 'muted' | 'gold' | 'white';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  /** Text size */
  size?: TextSize;
  /** Text color */
  color?: TextColor;
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Line height */
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Render as span instead of paragraph */
  inline?: boolean;
}

const textSizes: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
};

const textColors: Record<TextColor, string> = {
  primary: 'text-white',
  secondary: 'text-white/90',
  muted: 'text-white/60',
  gold: 'text-gold-500',
  white: 'text-white'
};

const textWeights: Record<NonNullable<TextProps['weight']>, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

const leadingClasses: Record<NonNullable<TextProps['leading']>, string> = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose'
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      size = 'base',
      color = 'secondary',
      weight = 'normal',
      leading = 'relaxed',
      align = 'left',
      inline = false,
      className,
      ...props
    },
    ref
  ) => {
    const Component = inline ? 'span' : 'p';

    return (
      <Component
        ref={ref}
        className={cn(
          'font-body',
          textSizes[size],
          textColors[color],
          textWeights[weight],
          leadingClasses[leading],
          alignments[align],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// ═══════════════════════════════════════════════════════════════════════════
// LABEL COMPONENT (for UI labels, badges, captions)
// ═══════════════════════════════════════════════════════════════════════════

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Label variant */
  variant?: 'default' | 'gold' | 'outline';
  /** Uppercase text */
  uppercase?: boolean;
}

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      children,
      variant = 'default',
      uppercase = true,
      className,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'text-white/60',
      gold: 'text-gold-500',
      outline: 'text-gold-500 border border-gold-500/30 px-3 py-1 rounded-full'
    };

    return (
      <span
        ref={ref}
        className={cn(
          'font-body text-xs sm:text-sm font-medium tracking-widest',
          uppercase && 'uppercase',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Label.displayName = 'Label';

// ═══════════════════════════════════════════════════════════════════════════
// QUOTE COMPONENT (for testimonials)
// ═══════════════════════════════════════════════════════════════════════════

interface QuoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
  /** Attribution */
  author?: string;
  /** Author title/role */
  title?: string;
}

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ children, author, title, className, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn('relative', className)}
        {...props}
      >
        <span
          className="absolute -top-4 -left-2 text-6xl text-gold-500/20 font-display"
          aria-hidden="true"
        >
          "
        </span>
        <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/90 italic leading-relaxed pl-6">
          {children}
        </p>
        {(author || title) && (
          <footer className="mt-6 pl-6">
            {author && (
              <cite className="not-italic font-medium text-gold-500">
                {author}
              </cite>
            )}
            {title && (
              <span className="block text-sm text-white/60 mt-1">
                {title}
              </span>
            )}
          </footer>
        )}
      </blockquote>
    );
  }
);

Quote.displayName = 'Quote';
