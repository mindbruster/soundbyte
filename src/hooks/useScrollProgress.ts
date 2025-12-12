/**
 * useScrollProgress Hook
 *
 * Tracks scroll position and provides normalized progress values.
 * Optimized with RAF throttling for smooth performance.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { clamp } from '../lib/animations';

interface ScrollProgress {
  /** Scroll progress from 0 to 1 */
  progress: number;
  /** Current scroll position in pixels */
  scrollY: number;
  /** Total scrollable height */
  scrollHeight: number;
  /** Viewport height */
  viewportHeight: number;
  /** Scroll direction: 1 = down, -1 = up, 0 = static */
  direction: -1 | 0 | 1;
  /** Current scroll velocity */
  velocity: number;
}

interface UseScrollProgressOptions {
  /** Throttle scroll updates (default: true) */
  throttle?: boolean;
  /** Target element (default: window) */
  target?: React.RefObject<HTMLElement>;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}): ScrollProgress {
  const { throttle = true, target } = options;

  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    scrollHeight: 0,
    viewportHeight: 0,
    direction: 0,
    velocity: 0
  });

  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());

  const updateScroll = useCallback(() => {
    const element = target?.current;
    const scrollY = element ? element.scrollTop : window.scrollY;
    const viewportHeight = element ? element.clientHeight : window.innerHeight;
    const scrollHeight = element
      ? element.scrollHeight - element.clientHeight
      : document.documentElement.scrollHeight - window.innerHeight;

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTime.current) / 1000;
    const deltaScroll = scrollY - lastScrollY.current;
    const velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0;

    const direction = deltaScroll > 0 ? 1 : deltaScroll < 0 ? -1 : 0;
    const progress = scrollHeight > 0 ? clamp(scrollY / scrollHeight, 0, 1) : 0;

    setScrollProgress({
      progress,
      scrollY,
      scrollHeight,
      viewportHeight,
      direction: direction as -1 | 0 | 1,
      velocity
    });

    lastScrollY.current = scrollY;
    lastTime.current = currentTime;
    rafRef.current = null;
  }, [target]);

  const handleScroll = useCallback(() => {
    if (throttle) {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateScroll);
      }
    } else {
      updateScroll();
    }
  }, [throttle, updateScroll]);

  useEffect(() => {
    const element = target?.current;
    const scrollTarget = element || window;

    // Initial calculation
    updateScroll();

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, handleScroll, updateScroll]);

  return scrollProgress;
}

/**
 * useScrollInView Hook
 *
 * Tracks if an element is in the viewport and provides entry/exit progress.
 */
interface ScrollInViewOptions {
  /** Offset from top of viewport (0-1) */
  start?: number;
  /** Offset from bottom of viewport (0-1) */
  end?: number;
  /** Margin around the element */
  margin?: string;
}

interface ScrollInView {
  /** Whether element is in view */
  inView: boolean;
  /** Progress through the viewport (0 = entering, 1 = exiting) */
  progress: number;
  /** Reference to attach to element */
  ref: React.RefObject<HTMLElement>;
}

export function useScrollInView(options: ScrollInViewOptions = {}): ScrollInView {
  const { start = 0, end = 1 } = options;

  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate start and end points based on options
      const startPoint = viewportHeight * (1 - start);
      const endPoint = viewportHeight * (1 - end);

      // Element is in view when its top is below startPoint and bottom is above endPoint
      const isInView = rect.top < startPoint && rect.bottom > endPoint;
      setInView(isInView);

      if (isInView) {
        // Progress: 0 when entering, 1 when exiting
        const totalRange = startPoint - endPoint + rect.height;
        const currentPosition = startPoint - rect.top;
        const prog = clamp(currentPosition / totalRange, 0, 1);
        setProgress(prog);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [start, end]);

  return { inView, progress, ref: ref as React.RefObject<HTMLElement> };
}
