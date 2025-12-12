/**
 * useMediaQuery Hook
 *
 * Responsive breakpoint detection with SSR support.
 * Aligned with Tailwind CSS breakpoints.
 */

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../lib/utils/constants';

/**
 * Check if a media query matches
 *
 * @param query - Media query string
 * @returns Whether the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Check if viewport is at or above a breakpoint
 *
 * @param breakpoint - Breakpoint name from Tailwind
 * @returns Whether viewport is at or above the breakpoint
 */
export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS): boolean {
  const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
  return useMediaQuery(query);
}

/**
 * Get the current active breakpoint
 *
 * @returns Current breakpoint name
 */
export function useCurrentBreakpoint(): keyof typeof BREAKPOINTS | 'xs' {
  const isSm = useBreakpoint('sm');
  const isMd = useBreakpoint('md');
  const isLg = useBreakpoint('lg');
  const isXl = useBreakpoint('xl');
  const is2xl = useBreakpoint('2xl');

  if (is2xl) return '2xl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}

/**
 * Check if user prefers reduced motion
 *
 * @returns Whether reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Check if device is touch-enabled
 *
 * @returns Whether device supports touch
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  return isTouch;
}

/**
 * Check for dark mode preference
 *
 * @returns Whether dark mode is preferred
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
