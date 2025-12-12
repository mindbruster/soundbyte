/**
 * ScrollReveal Component
 *
 * GSAP-powered scroll-triggered reveal animations.
 * Provides consistent, performant scroll animations across all sections.
 */

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';
import { easings, durations, staggers } from '../../lib/animations';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════════════
// REVEAL DIRECTIONS
// ═══════════════════════════════════════════════════════════════════════════

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'rotateUp' | 'blur' | 'dramatic';

interface DirectionConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

const directionConfigs: Record<RevealDirection, DirectionConfig> = {
  up: {
    from: { opacity: 0, y: 80 },
    to: { opacity: 1, y: 0 }
  },
  down: {
    from: { opacity: 0, y: -80 },
    to: { opacity: 1, y: 0 }
  },
  left: {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0 }
  },
  right: {
    from: { opacity: 0, x: 80 },
    to: { opacity: 1, x: 0 }
  },
  scale: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 }
  },
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  rotateUp: {
    from: { opacity: 0, y: 100, rotateX: -15, transformOrigin: 'center bottom' },
    to: { opacity: 1, y: 0, rotateX: 0 }
  },
  blur: {
    from: { opacity: 0, filter: 'blur(20px)', y: 40 },
    to: { opacity: 1, filter: 'blur(0px)', y: 0 }
  },
  dramatic: {
    from: { opacity: 0, y: 120, scale: 0.9, rotateX: -30 },
    to: { opacity: 1, y: 0, scale: 1, rotateX: 0 }
  }
};

// Premium easing presets
const premiumEasings = {
  luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
  elegant: 'cubic-bezier(0.22, 1, 0.36, 1)',
  dramatic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  snappy: 'cubic-bezier(0.23, 1, 0.32, 1)'
};

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ScrollRevealProps {
  children: ReactNode;
  /** Reveal direction */
  direction?: RevealDirection;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Whether to play animation once or on every scroll */
  once?: boolean;
  /** Custom easing curve */
  ease?: string;
  /** Additional class names */
  className?: string;
  /** Disable animation (for accessibility) */
  disabled?: boolean;
}

export function ScrollReveal({
  children,
  direction = 'up',
  duration = durations.smooth,
  delay = 0,
  start = 'top 85%',
  end = 'top 20%',
  once = true,
  ease = `cubic-bezier(${easings.luxury.join(',')})`,
  className,
  disabled = false
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (disabled) return;

    const element = elementRef.current;
    if (!element) return;

    const config = directionConfigs[direction];

    // Set initial state
    gsap.set(element, config.from);

    // Create scroll-triggered animation
    animationRef.current = gsap.to(element, {
      ...config.to,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse'
      }
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [direction, duration, delay, start, end, once, ease, disabled]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={elementRef} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGGERED REVEAL COMPONENT (for lists/grids)
// ═══════════════════════════════════════════════════════════════════════════

interface StaggerRevealProps {
  children: ReactNode;
  /** Reveal direction for each child */
  direction?: RevealDirection;
  /** Stagger delay between children */
  stagger?: number;
  /** Animation duration per child */
  duration?: number;
  /** Initial delay */
  delay?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Selector for children to animate (default: direct children) */
  childSelector?: string;
  /** Additional class names */
  className?: string;
  /** Play animation once */
  once?: boolean;
}

export function StaggerReveal({
  children,
  direction = 'up',
  stagger = staggers.normal,
  duration = durations.smooth,
  delay = 0,
  start = 'top 85%',
  childSelector = ':scope > *',
  className,
  once = true
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const config = directionConfigs[direction];
    const ease = `cubic-bezier(${easings.luxury.join(',')})`;

    // Set initial state for all children
    gsap.set(children, config.from);

    // Create staggered animation
    animationRef.current = gsap.to(children, {
      ...config.to,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse'
      }
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [direction, stagger, duration, delay, start, childSelector, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TEXT REVEAL COMPONENT (character/word animation)
// ═══════════════════════════════════════════════════════════════════════════

interface TextRevealProps {
  children: string;
  /** Split by character or word */
  splitBy?: 'char' | 'word' | 'line';
  /** Animation type */
  animation?: 'fade' | 'slide' | 'dramatic';
  /** Stagger timing */
  stagger?: number;
  /** Duration per element */
  duration?: number;
  /** Delay before starting */
  delay?: number;
  /** ScrollTrigger start */
  start?: string;
  /** Tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /** Additional class names */
  className?: string;
}

export function TextReveal({
  children,
  splitBy = 'word',
  animation = 'slide',
  stagger = staggers.fast,
  duration = durations.smooth,
  delay = 0,
  start = 'top 80%',
  as: Component = 'span',
  className
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.text-reveal-item');
    if (!elements.length) return;

    const animationConfigs = {
      fade: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      slide: {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 }
      },
      dramatic: {
        from: { opacity: 0, y: 100, rotateX: -45 },
        to: { opacity: 1, y: 0, rotateX: 0 }
      }
    };

    const config = animationConfigs[animation];
    const ease = animation === 'dramatic'
      ? `cubic-bezier(${easings.dramaticReveal.join(',')})`
      : `cubic-bezier(${easings.luxury.join(',')})`;

    gsap.set(elements, config.from);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none none'
      }
    });

    tl.to(elements, {
      ...config.to,
      duration,
      delay,
      ease,
      stagger,
      transformOrigin: 'center bottom'
    });

    return () => {
      tl.kill();
    };
  }, [animation, stagger, duration, delay, start]);

  // Split text into elements
  const splitText = () => {
    if (splitBy === 'char') {
      return children.split('').map((char, i) => (
        <span
          key={i}
          className="text-reveal-item inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </span>
      ));
    }

    if (splitBy === 'word') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="text-reveal-item inline-block mr-[0.25em]">
          {word}
        </span>
      ));
    }

    // Line split
    return children.split('\n').map((line, i) => (
      <span key={i} className="text-reveal-item block">
        {line}
      </span>
    ));
  };

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={cn('overflow-hidden', className)}
      style={{ perspective: animation === 'dramatic' ? '1000px' : undefined }}
    >
      {splitText()}
    </Component>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface ParallaxProps {
  children: ReactNode;
  /** Parallax speed (negative = slower, positive = faster) */
  speed?: number;
  /** Direction of parallax movement */
  direction?: 'vertical' | 'horizontal';
  /** Additional class names */
  className?: string;
}

export function Parallax({
  children,
  speed = -0.2,
  direction = 'vertical',
  className
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const movement = speed * 100;
    const axis = direction === 'vertical' ? 'y' : 'x';

    gsap.to(element, {
      [axis]: movement,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION TRANSITION COMPONENT - Premium section enter/exit effects
// ═══════════════════════════════════════════════════════════════════════════

type TransitionPreset = 'fade' | 'slideUp' | 'scale' | 'blur' | 'dramatic' | 'elegant';

interface SectionTransitionProps {
  children: ReactNode;
  /** Transition preset */
  preset?: TransitionPreset;
  /** Custom duration */
  duration?: number;
  /** Scrub for smooth scroll-linked animation */
  scrub?: boolean | number;
  /** Pin the section during transition */
  pin?: boolean;
  /** Additional class names */
  className?: string;
  /** Section ID for tracking */
  id?: string;
}

const transitionPresets: Record<TransitionPreset, {
  enter: gsap.TweenVars;
  exit: gsap.TweenVars;
  ease: string;
}> = {
  fade: {
    enter: { opacity: 1 },
    exit: { opacity: 0 },
    ease: premiumEasings.smooth
  },
  slideUp: {
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    ease: premiumEasings.elegant
  },
  scale: {
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    ease: premiumEasings.luxury
  },
  blur: {
    enter: { opacity: 1, filter: 'blur(0px)', y: 0 },
    exit: { opacity: 0, filter: 'blur(10px)', y: 30 },
    ease: premiumEasings.elegant
  },
  dramatic: {
    enter: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    exit: { opacity: 0, y: 80, scale: 0.9, rotateX: -10 },
    ease: premiumEasings.dramatic
  },
  elegant: {
    enter: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' },
    exit: { opacity: 0, y: 40, clipPath: 'inset(10% 5% 10% 5%)' },
    ease: premiumEasings.luxury
  }
};

export function SectionTransition({
  children,
  preset = 'elegant',
  duration = 1,
  scrub = 0.5,
  pin = false,
  className,
  id
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const presetConfig = transitionPresets[preset];

    // Set initial state (exit state)
    gsap.set(content, presetConfig.exit);

    // Create enter animation
    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        scrub: scrub,
        toggleActions: scrub ? undefined : 'play none none reverse'
      }
    });

    enterTl.to(content, {
      ...presetConfig.enter,
      duration,
      ease: presetConfig.ease
    });

    // Create exit animation if pinned
    if (pin) {
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'bottom 70%',
          end: 'bottom 20%',
          scrub: scrub
        }
      });

      exitTl.to(content, {
        ...presetConfig.exit,
        duration,
        ease: presetConfig.ease
      });
    }

    return () => {
      enterTl.kill();
    };
  }, [preset, duration, scrub, pin]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn('relative', className)}
      style={{ perspective: preset === 'dramatic' ? '1000px' : undefined }}
    >
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </section>
  );
}

// Export premium easings for use elsewhere
export { premiumEasings };
