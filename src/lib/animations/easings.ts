/**
 * Premium Easing Library
 *
 * Physics-based cubic-bezier curves inspired by Framer Motion's signature animations.
 * These curves create the luxurious, high-end feel required for premium brand positioning.
 *
 * Mathematical basis: Cubic Bezier curves P(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃
 * where P₁ and P₂ are control points that define the curve characteristics.
 */

// Type definitions for easing arrays
export type EasingArray = [number, number, number, number];
export type EasingFunction = (t: number) => number;

/**
 * Premium easing curves for GSAP and CSS transitions
 * Format: [x1, y1, x2, y2] for cubic-bezier(x1, y1, x2, y2)
 */
export const easings = {
  // ═══════════════════════════════════════════════════════════════════════════
  // LUXURY SIGNATURE CURVES
  // These are the primary curves for hero animations and major transitions
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Primary luxury easing - smooth deceleration with elegance
   * Use for: Hero text reveals, section transitions, modal appearances
   */
  luxury: [0.16, 1, 0.3, 1] as EasingArray,

  /**
   * Dramatic entrance - builds anticipation then releases
   * Use for: Hero entrance, first-time reveals, award displays
   */
  dramaticReveal: [0.22, 1, 0.36, 1] as EasingArray,

  /**
   * Smooth power curve - consistent deceleration
   * Use for: Gallery transitions, scrollytelling, continuous animations
   */
  smoothPower: [0.45, 0, 0.55, 1] as EasingArray,

  // ═══════════════════════════════════════════════════════════════════════════
  // DIRECTIONAL CURVES (Ease In / Ease Out / Ease In-Out)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Premium ease-in - gradual acceleration
   * Use for: Exit animations, fade outs, element departures
   */
  luxuryIn: [0.6, 0.01, 0.4, 1] as EasingArray,

  /**
   * Premium ease-out - smooth landing
   * Use for: Entrance animations, reveals, settling motions
   */
  luxuryOut: [0.16, 1, 0.3, 1] as EasingArray,

  /**
   * Premium ease-in-out - symmetrical elegance
   * Use for: Hover states, toggle animations, bidirectional motion
   */
  luxuryInOut: [0.87, 0, 0.13, 1] as EasingArray,

  // ═══════════════════════════════════════════════════════════════════════════
  // ELASTIC / SPRING CURVES (Overshoot and settle)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Elastic out - overshoots then settles
   * Use for: Button clicks, magnetic elements, playful interactions
   */
  elasticOut: [0.68, -0.55, 0.265, 1.55] as EasingArray,

  /**
   * Bounce out - subtle bounce at end
   * Use for: Card appearances, badge reveals, success states
   */
  bounceOut: [0.34, 1.56, 0.64, 1] as EasingArray,

  /**
   * Soft spring - gentle overshoot
   * Use for: Form validations, tooltip appearances, subtle feedback
   */
  softSpring: [0.175, 0.885, 0.32, 1.275] as EasingArray,

  // ═══════════════════════════════════════════════════════════════════════════
  // SCROLL-OPTIMIZED CURVES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Scroll smooth - natural scroll feel
   * Use for: Smooth scrolling, scroll-triggered animations
   */
  scrollSmooth: [0.25, 0.1, 0.25, 1] as EasingArray,

  /**
   * Parallax easing - depth-appropriate motion
   * Use for: Parallax layers, background movements
   */
  parallaxEase: [0.33, 1, 0.68, 1] as EasingArray,

  /**
   * Scroll reveal - optimized for scroll-triggered reveals
   * Use for: ScrollTrigger animations, on-scroll appearances
   */
  scrollReveal: [0.4, 0, 0.2, 1] as EasingArray,

  // ═══════════════════════════════════════════════════════════════════════════
  // MICRO-INTERACTION CURVES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Snappy - quick and responsive
   * Use for: Hover states, quick feedback, menu items
   */
  snappy: [0.4, 0, 0.2, 1] as EasingArray,

  /**
   * Magnetic - cursor-following elements
   * Use for: Magnetic buttons, floating elements
   */
  magnetic: [0.2, 0.8, 0.2, 1] as EasingArray,

  /**
   * Smooth hover - subtle hover transitions
   * Use for: Link hovers, card hovers, icon states
   */
  smoothHover: [0.4, 0, 0.2, 1] as EasingArray,
} as const;

/**
 * Spring physics configurations for Framer Motion
 * Based on the spring equation: F = -kx - cv
 * where k = stiffness, c = damping, and mass affects inertia
 */
export const springs = {
  /**
   * Gentle spring - slow, elegant motion
   * Use for: Large elements, hero animations, backdrop transitions
   */
  gentle: {
    stiffness: 120,
    damping: 14,
    mass: 1
  },

  /**
   * Smooth spring - balanced, professional
   * Use for: Default transitions, most UI elements
   */
  smooth: {
    stiffness: 100,
    damping: 20,
    mass: 1
  },

  /**
   * Snappy spring - quick and responsive
   * Use for: Buttons, toggles, quick feedback
   */
  snappy: {
    stiffness: 400,
    damping: 30,
    mass: 1
  },

  /**
   * Bouncy spring - playful overshoot
   * Use for: Success states, celebrations, badges
   */
  bouncy: {
    stiffness: 200,
    damping: 10,
    mass: 1
  },

  /**
   * Slow spring - dramatic, cinematic
   * Use for: Full-page transitions, morphing shapes
   */
  slow: {
    stiffness: 50,
    damping: 20,
    mass: 2
  },

  /**
   * Magnetic spring - cursor-following
   * Use for: Magnetic buttons, floating elements
   */
  magnetic: {
    stiffness: 150,
    damping: 15,
    mass: 0.5
  },

  /**
   * Elastic spring - strong overshoot
   * Use for: Dramatic reveals, emphasis animations
   */
  elastic: {
    stiffness: 300,
    damping: 8,
    mass: 0.8
  },
} as const;

/**
 * Duration presets in seconds
 * Calibrated for perceived smoothness at different animation scales
 */
export const durations = {
  /** Instant feedback - 150ms */
  instant: 0.15,
  /** Fast micro-interactions - 250ms */
  fast: 0.25,
  /** Standard transitions - 400ms */
  normal: 0.4,
  /** Smooth reveals - 600ms */
  smooth: 0.6,
  /** Dramatic reveals - 800ms */
  dramatic: 0.8,
  /** Slow, luxurious - 1200ms */
  luxury: 1.2,
  /** Epic, cinematic - 1800ms */
  epic: 1.8,
} as const;

/**
 * Stagger configurations for sequential animations
 */
export const staggers = {
  /** Fast stagger for lists - 50ms */
  fast: 0.05,
  /** Normal stagger - 80ms */
  normal: 0.08,
  /** Smooth stagger for reveals - 120ms */
  smooth: 0.12,
  /** Dramatic stagger for hero text - 150ms */
  dramatic: 0.15,
  /** Luxury stagger for showcases - 200ms */
  luxury: 0.2,
} as const;

/**
 * Convert easing array to CSS cubic-bezier string
 */
export function toCSSEasing(easing: EasingArray): string {
  return `cubic-bezier(${easing.join(', ')})`;
}

/**
 * Convert easing array to GSAP format
 * GSAP accepts cubic-bezier as a string
 */
export function toGSAPEasing(easing: EasingArray): string {
  return `cubic-bezier(${easing.join(',')})`;
}

/**
 * Create a custom cubic-bezier easing function
 * Uses De Casteljau's algorithm for precise calculation
 *
 * @param x1 - First control point X
 * @param y1 - First control point Y
 * @param x2 - Second control point X
 * @param y2 - Second control point Y
 * @returns Easing function that takes t (0-1) and returns eased value
 */
export function createBezierEasing(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): EasingFunction {
  // Newton-Raphson iteration for finding t given x
  const NEWTON_ITERATIONS = 4;
  const NEWTON_MIN_SLOPE = 0.001;
  const SUBDIVISION_PRECISION = 0.0000001;
  const SUBDIVISION_MAX_ITERATIONS = 10;

  const kSplineTableSize = 11;
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  // Precompute samples for fast lookup
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, x1, x2);
  }

  function A(aA1: number, aA2: number): number {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }

  function B(aA1: number, aA2: number): number {
    return 3.0 * aA2 - 6.0 * aA1;
  }

  function C(aA1: number): number {
    return 3.0 * aA1;
  }

  function calcBezier(aT: number, aA1: number, aA2: number): number {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  function getSlope(aT: number, aA1: number, aA2: number): number {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX: number, aA: number, aB: number): number {
    let currentX: number;
    let currentT: number;
    let i = 0;

    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, x1, x2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (
      Math.abs(currentX) > SUBDIVISION_PRECISION &&
      ++i < SUBDIVISION_MAX_ITERATIONS
    );

    return currentT;
  }

  function newtonRaphsonIterate(aX: number, aGuessT: number): number {
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
      const currentSlope = getSlope(aGuessT, x1, x2);
      if (currentSlope === 0.0) {
        return aGuessT;
      }
      const currentX = calcBezier(aGuessT, x1, x2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function getTForX(aX: number): number {
    let intervalStart = 0.0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    const dist = (aX - sampleValues[currentSample]) /
      (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;

    const initialSlope = getSlope(guessForT, x1, x2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
    }
  }

  return function bezierEasing(t: number): number {
    if (t === 0 || t === 1) return t;
    return calcBezier(getTForX(t), y1, y2);
  };
}

/**
 * Pre-built easing functions for JavaScript animations
 */
export const easingFunctions = {
  luxury: createBezierEasing(...easings.luxury),
  dramaticReveal: createBezierEasing(...easings.dramaticReveal),
  smoothPower: createBezierEasing(...easings.smoothPower),
  elasticOut: createBezierEasing(...easings.elasticOut),
  bounceOut: createBezierEasing(...easings.bounceOut),
  scrollSmooth: createBezierEasing(...easings.scrollSmooth),
} as const;
