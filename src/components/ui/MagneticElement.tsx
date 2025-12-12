/**
 * Magnetic Element Component
 *
 * A wrapper component that adds magnetic/gravitational effects to any element.
 * The element smoothly moves towards the cursor when hovering nearby.
 *
 * Features:
 * - Customizable magnetic strength and radius
 * - Spring physics for smooth animations
 * - Scale effect on hover
 * - Performance optimized with RAF
 */

import { useRef, useEffect, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticElementProps {
  children: ReactNode;
  /** Strength of the magnetic effect (0-1) */
  strength?: number;
  /** Radius of magnetic influence in pixels */
  radius?: number;
  /** Scale factor when hovering (1 = no scale) */
  hoverScale?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Additional className */
  className?: string;
  /** Whether to enable the effect */
  enabled?: boolean;
}

export function MagneticElement({
  children,
  strength = 0.3,
  radius = 150,
  hoverScale = 1.05,
  stiffness = 150,
  damping = 15,
  className = '',
  enabled = true
}: MagneticElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Motion values for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Spring physics
  const springConfig = { stiffness, damping, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (!enabled) return;

    const element = elementRef.current;
    if (!element) return;

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        // Inside magnetic radius - attract to cursor
        const power = (1 - distance / radius) * strength;

        // Normalize and apply strength
        x.set(deltaX * power);
        y.set(deltaY * power);

        if (!isHovering) {
          isHovering = true;
          scale.set(hoverScale);
        }
      } else if (isHovering) {
        // Outside radius - reset
        isHovering = false;
        x.set(0);
        y.set(0);
        scale.set(1);
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      x.set(0);
      y.set(0);
      scale.set(1);
    };

    // Use parent element for wider hover detection
    const parent = element.parentElement || document;

    window.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, strength, radius, hoverScale, x, y, scale]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={elementRef}
      className={className}
      style={{
        x: xSpring,
        y: ySpring,
        scale: scaleSpring
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Magnetic Button - Pre-configured magnetic wrapper for buttons
 */
interface MagneticButtonProps extends MagneticElementProps {
  onClick?: () => void;
}

export function MagneticButton({
  children,
  onClick,
  strength = 0.4,
  radius = 100,
  hoverScale = 1.08,
  className = '',
  ...props
}: MagneticButtonProps) {
  return (
    <MagneticElement
      strength={strength}
      radius={radius}
      hoverScale={hoverScale}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      <div onClick={onClick}>
        {children}
      </div>
    </MagneticElement>
  );
}

/**
 * Magnetic Link - Pre-configured magnetic wrapper for navigation links
 */
interface MagneticLinkProps extends MagneticElementProps {
  href?: string;
}

export function MagneticLink({
  children,
  href,
  strength = 0.25,
  radius = 80,
  hoverScale = 1.05,
  className = '',
  ...props
}: MagneticLinkProps) {
  return (
    <MagneticElement
      strength={strength}
      radius={radius}
      hoverScale={hoverScale}
      className={className}
      {...props}
    >
      {href ? (
        <a href={href} className="block">
          {children}
        </a>
      ) : (
        children
      )}
    </MagneticElement>
  );
}

/**
 * Magnetic Card - Pre-configured magnetic wrapper for cards/portfolio items
 */
interface MagneticCardProps extends MagneticElementProps {
  onClick?: () => void;
}

export function MagneticCard({
  children,
  onClick,
  strength = 0.15,
  radius = 200,
  hoverScale = 1.02,
  className = '',
  ...props
}: MagneticCardProps) {
  return (
    <MagneticElement
      strength={strength}
      radius={radius}
      hoverScale={hoverScale}
      className={className}
      {...props}
    >
      <div onClick={onClick} className="w-full h-full">
        {children}
      </div>
    </MagneticElement>
  );
}
