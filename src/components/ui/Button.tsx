/**
 * Button Component
 *
 * Premium button variants with magnetic hover effects.
 * Supports primary, secondary, and ghost variants.
 */

import {
  forwardRef,
  useRef,
  type ReactNode,
  type ButtonHTMLAttributes
} from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';
import { springs } from '../../lib/animations';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  children: ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Enable magnetic hover effect */
  magnetic?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon only button */
  icon?: boolean;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Loading state */
  loading?: boolean;
}

const variantClasses = {
  primary: `
    bg-gold-500 text-luxury-black
    hover:bg-gold-400
    active:bg-gold-600
    shadow-lg shadow-gold-500/25
  `,
  secondary: `
    bg-white/10 text-white
    hover:bg-white/20
    active:bg-white/5
    backdrop-blur-sm
  `,
  ghost: `
    bg-transparent text-white
    hover:bg-white/10
    active:bg-white/5
  `,
  outline: `
    bg-transparent text-gold-500
    border border-gold-500/50
    hover:bg-gold-500/10 hover:border-gold-500
    active:bg-gold-500/20
  `
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-3',
  xl: 'px-10 py-5 text-xl gap-3'
};

const iconSizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      magnetic = true,
      fullWidth = false,
      icon = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Magnetic effect motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = springs.magnetic;
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Glow effect based on position
    const glowX = useTransform(springX, [-20, 20], [-50, 50]);
    const glowY = useTransform(springY, [-20, 20], [-50, 50]);

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || disabled) return;

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // Magnetic pull strength
      x.set(deltaX * 0.2);
      y.set(deltaY * 0.2);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={(node) => {
          // Handle both refs
          (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={{
          x: magnetic ? springX : 0,
          y: magnetic ? springY : 0
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'font-body font-medium',
          'rounded-full',
          'transition-colors duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-black',
          // Variant styles
          variantClasses[variant],
          // Size styles
          icon ? iconSizeClasses[size] : sizeClasses[size],
          // States
          fullWidth && 'w-full',
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {/* Glow effect for primary variant */}
        {variant === 'primary' && magnetic && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl -z-10"
            style={{
              x: glowX,
              y: glowY,
              scale: 1.2
            }}
          />
        )}

        {/* Loading spinner */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}

        {/* Button content */}
        <span className={cn(
          'inline-flex items-center gap-2',
          loading && 'invisible'
        )}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// ═══════════════════════════════════════════════════════════════════════════
// LINK BUTTON (for navigation)
// ═══════════════════════════════════════════════════════════════════════════

interface LinkButtonProps {
  children: ReactNode;
  href: string;
  /** External link */
  external?: boolean;
  className?: string;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ children, href, external = false, className }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(
          'inline-flex items-center gap-2',
          'text-gold-500 font-medium',
          'transition-colors duration-300',
          'hover:text-gold-400',
          'group',
          className
        )}
      >
        {children}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
