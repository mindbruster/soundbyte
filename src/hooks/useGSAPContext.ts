/**
 * useGSAPContext Hook
 *
 * Manages GSAP context and cleanup for React components.
 * Ensures proper cleanup of ScrollTrigger instances and timelines.
 */

import { useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP Context Hook
 *
 * Creates a GSAP context scoped to a container element.
 * Automatically cleans up all animations when component unmounts.
 *
 * @returns Object with containerRef and contextSafe wrapper
 */
export function useGSAPContext() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  // Create context on mount
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create GSAP context scoped to container
    contextRef.current = gsap.context(() => {}, container);

    return () => {
      // Revert all animations in context
      contextRef.current?.revert();
    };
  }, []);

  /**
   * Wrap animation functions to run within context
   * This ensures they're properly cleaned up
   */
  const contextSafe = useCallback(
    <T extends (...args: unknown[]) => unknown>(callback: T): T => {
      return ((...args: unknown[]) => {
        if (contextRef.current) {
          return contextRef.current.add(() => callback(...args));
        }
        return callback(...args);
      }) as T;
    },
    []
  );

  return { containerRef, contextSafe, context: contextRef };
}

/**
 * useScrollTrigger Hook
 *
 * Creates a ScrollTrigger instance with automatic cleanup.
 *
 * @param config - ScrollTrigger configuration
 * @param deps - Dependencies array for recreation
 */
export function useScrollTrigger(
  config: ScrollTrigger.Vars,
  deps: React.DependencyList = []
) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    // Create ScrollTrigger
    triggerRef.current = ScrollTrigger.create(config);

    return () => {
      // Kill ScrollTrigger on cleanup
      triggerRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return triggerRef;
}

/**
 * useTimeline Hook
 *
 * Creates a GSAP timeline with automatic cleanup.
 *
 * @param config - Timeline configuration
 * @param deps - Dependencies array for recreation
 */
export function useTimeline(
  config?: gsap.TimelineVars,
  deps: React.DependencyList = []
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // Create timeline
    timelineRef.current = gsap.timeline(config);

    return () => {
      // Kill timeline on cleanup
      timelineRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return timelineRef;
}

/**
 * GSAP configuration presets for consistent animations
 */
export const gsapPresets = {
  /**
   * Smooth fade in from below
   */
  fadeInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  },

  /**
   * Smooth fade in from above
   */
  fadeInDown: {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  },

  /**
   * Fade in from left
   */
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
  },

  /**
   * Fade in from right
   */
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
  },

  /**
   * Scale in with fade
   */
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
  },

  /**
   * Dramatic reveal for hero text
   */
  heroReveal: {
    from: { opacity: 0, y: 100, rotateX: -45 },
    to: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.2,
      ease: 'power4.out',
      transformOrigin: 'center bottom'
    }
  },

  /**
   * Stagger configuration for lists
   */
  staggerChildren: {
    each: 0.1,
    from: 'start',
    ease: 'power2.out'
  }
} as const;

/**
 * ScrollTrigger presets for common patterns
 */
export const scrollTriggerPresets = {
  /**
   * Fade in when entering viewport
   */
  fadeOnScroll: {
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse'
  },

  /**
   * Pin element during scroll
   */
  pinSection: {
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 1
  },

  /**
   * Parallax effect
   */
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  },

  /**
   * Progress-based animation
   */
  progressBased: {
    start: 'top center',
    end: 'bottom center',
    scrub: 0.5
  }
} as const;

// Re-export GSAP and ScrollTrigger for convenience
export { gsap, ScrollTrigger };
