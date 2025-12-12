/**
 * Hooks Entry Point
 */

// Audio hooks
export { useAudioAnalyzer } from './useAudioAnalyzer';

// Scroll hooks
export { useScrollProgress, useScrollInView } from './useScrollProgress';

// Mouse/cursor hooks
export {
  useMousePosition,
  useElementCenter,
  useMagneticEffect
} from './useMousePosition';

// GSAP hooks
export {
  useGSAPContext,
  useScrollTrigger,
  useTimeline,
  gsapPresets,
  scrollTriggerPresets,
  gsap,
  ScrollTrigger
} from './useGSAPContext';

// Media query hooks
export {
  useMediaQuery,
  useBreakpoint,
  useCurrentBreakpoint,
  useReducedMotion,
  useIsTouchDevice,
  usePrefersDarkMode
} from './useMediaQuery';

// Section observer hooks
export {
  useSectionObserver,
  SECTION_THEMES
} from './useSectionObserver';
export type { SectionInfo, SectionColors } from './useSectionObserver';
