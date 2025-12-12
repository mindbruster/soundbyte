/**
 * Animation Library Entry Point
 *
 * This module exports all animation utilities for the Amrita Sethi portfolio.
 * Provides a cohesive, physics-based animation system.
 */

// Easing curves and spring configurations
export {
  easings,
  springs,
  durations,
  staggers,
  toCSSEasing,
  toGSAPEasing,
  createBezierEasing,
  easingFunctions,
  type EasingArray,
  type EasingFunction
} from './easings';

// Physics utilities
export {
  // Spring physics
  springStep,
  springHasSettled,
  createSpringAnimator,

  // Interpolation
  lerp,
  smoothLerp,
  lerp2D,
  lerp3D,

  // Math utilities
  clamp,
  mapRange,
  mapRangeClamped,
  distance2D,
  distance3D,
  normalize2D,
  smoothStep,
  smootherStep,
  wrap,
  angleBetween,
  rotatePoint,
  exponentialDecay,

  // Momentum and friction
  applyFriction,
  applyFriction2D,
  momentumStep,

  // Types
  type SpringConfig,
  type SpringState,
  type Vector2D,
  type Vector3D
} from './physics';
