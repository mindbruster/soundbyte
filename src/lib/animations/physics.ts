/**
 * Physics Utilities for Premium Animations
 *
 * Implements real physics equations for natural, organic motion:
 * - Spring physics (Hooke's Law with damping)
 * - Momentum and inertia
 * - Smooth interpolation (lerp, slerp)
 * - Friction and decay
 */

/**
 * Spring configuration type
 */
export interface SpringConfig {
  stiffness: number;  // k: Spring constant (higher = snappier)
  damping: number;    // c: Damping coefficient (higher = less oscillation)
  mass: number;       // m: Mass (higher = more inertia)
}

/**
 * Spring state for tracking position and velocity
 */
export interface SpringState {
  position: number;
  velocity: number;
}

/**
 * 2D Vector for cursor tracking and spatial calculations
 */
export interface Vector2D {
  x: number;
  y: number;
}

/**
 * 3D Vector for Three.js integrations
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Calculate spring physics step
 *
 * Based on the damped harmonic oscillator equation:
 * F = -kx - cv
 *
 * where:
 * k = stiffness (spring constant)
 * x = displacement from target
 * c = damping coefficient
 * v = velocity
 *
 * @param current - Current state (position, velocity)
 * @param target - Target position
 * @param config - Spring configuration
 * @param deltaTime - Time step in seconds
 * @returns New spring state
 */
export function springStep(
  current: SpringState,
  target: number,
  config: SpringConfig,
  deltaTime: number
): SpringState {
  const { stiffness, damping, mass } = config;

  // Displacement from target
  const displacement = current.position - target;

  // Spring force: F = -kx
  const springForce = -stiffness * displacement;

  // Damping force: F = -cv
  const dampingForce = -damping * current.velocity;

  // Total acceleration: a = F/m
  const acceleration = (springForce + dampingForce) / mass;

  // Update velocity: v = v + a*dt
  const newVelocity = current.velocity + acceleration * deltaTime;

  // Update position: x = x + v*dt
  const newPosition = current.position + newVelocity * deltaTime;

  return {
    position: newPosition,
    velocity: newVelocity
  };
}

/**
 * Calculate if spring has settled (reached equilibrium)
 *
 * @param current - Current spring state
 * @param target - Target position
 * @param threshold - Position and velocity threshold
 * @returns Whether spring has settled
 */
export function springHasSettled(
  current: SpringState,
  target: number,
  threshold: number = 0.001
): boolean {
  const positionDiff = Math.abs(current.position - target);
  const velocityMagnitude = Math.abs(current.velocity);

  return positionDiff < threshold && velocityMagnitude < threshold;
}

/**
 * Create a spring animator that can be used in requestAnimationFrame
 *
 * @param config - Spring configuration
 * @returns Spring animator object
 */
export function createSpringAnimator(config: SpringConfig) {
  let state: SpringState = { position: 0, velocity: 0 };
  let target = 0;
  let lastTime = performance.now();

  return {
    /**
     * Set target position
     */
    setTarget(newTarget: number) {
      target = newTarget;
    },

    /**
     * Set current position immediately (no animation)
     */
    setPosition(position: number) {
      state.position = position;
      state.velocity = 0;
    },

    /**
     * Update and return new position
     */
    update(): number {
      const currentTime = performance.now();
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // Cap at 100ms
      lastTime = currentTime;

      state = springStep(state, target, config, deltaTime);
      return state.position;
    },

    /**
     * Get current position
     */
    getPosition(): number {
      return state.position;
    },

    /**
     * Get current velocity
     */
    getVelocity(): number {
      return state.velocity;
    },

    /**
     * Check if animation has settled
     */
    hasSettled(threshold?: number): boolean {
      return springHasSettled(state, target, threshold);
    }
  };
}

/**
 * Linear interpolation
 *
 * @param start - Start value
 * @param end - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Smooth lerp with delta time compensation
 * Creates frame-rate independent smoothing
 *
 * @param current - Current value
 * @param target - Target value
 * @param smoothing - Smoothing factor (higher = slower)
 * @param deltaTime - Time since last frame in seconds
 * @returns Smoothed value
 */
export function smoothLerp(
  current: number,
  target: number,
  smoothing: number,
  deltaTime: number
): number {
  // Frame-rate independent lerp using exponential decay
  const factor = 1 - Math.exp(-smoothing * deltaTime);
  return lerp(current, target, factor);
}

/**
 * 2D vector lerp
 *
 * @param start - Start vector
 * @param end - End vector
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated vector
 */
export function lerp2D(start: Vector2D, end: Vector2D, t: number): Vector2D {
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t)
  };
}

/**
 * 3D vector lerp
 *
 * @param start - Start vector
 * @param end - End vector
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated vector
 */
export function lerp3D(start: Vector3D, end: Vector3D, t: number): Vector3D {
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t),
    z: lerp(start.z, end.z, t)
  };
}

/**
 * Clamp value between min and max
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map value from one range to another
 *
 * @param value - Input value
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped value
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Map value with clamping
 *
 * @param value - Input value
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Mapped and clamped value
 */
export function mapRangeClamped(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const mapped = mapRange(value, inMin, inMax, outMin, outMax);
  return clamp(mapped, Math.min(outMin, outMax), Math.max(outMin, outMax));
}

/**
 * Calculate distance between two 2D points
 *
 * @param a - First point
 * @param b - Second point
 * @returns Distance
 */
export function distance2D(a: Vector2D, b: Vector2D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate distance between two 3D points
 *
 * @param a - First point
 * @param b - Second point
 * @returns Distance
 */
export function distance3D(a: Vector3D, b: Vector3D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Normalize a 2D vector
 *
 * @param v - Vector to normalize
 * @returns Normalized vector
 */
export function normalize2D(v: Vector2D): Vector2D {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

/**
 * Apply friction/decay to a value
 * Simulates gradual slowdown
 *
 * @param velocity - Current velocity
 * @param friction - Friction coefficient (0-1, lower = more friction)
 * @param deltaTime - Time step in seconds
 * @returns New velocity after friction
 */
export function applyFriction(
  velocity: number,
  friction: number,
  deltaTime: number
): number {
  // Exponential decay for frame-rate independence
  return velocity * Math.pow(friction, deltaTime * 60);
}

/**
 * Apply friction to 2D velocity
 *
 * @param velocity - Current velocity vector
 * @param friction - Friction coefficient
 * @param deltaTime - Time step
 * @returns New velocity vector
 */
export function applyFriction2D(
  velocity: Vector2D,
  friction: number,
  deltaTime: number
): Vector2D {
  const factor = Math.pow(friction, deltaTime * 60);
  return {
    x: velocity.x * factor,
    y: velocity.y * factor
  };
}

/**
 * Calculate momentum-based position update
 *
 * @param position - Current position
 * @param velocity - Current velocity
 * @param acceleration - Acceleration
 * @param deltaTime - Time step
 * @returns New position and velocity
 */
export function momentumStep(
  position: number,
  velocity: number,
  acceleration: number,
  deltaTime: number
): { position: number; velocity: number } {
  const newVelocity = velocity + acceleration * deltaTime;
  const newPosition = position + newVelocity * deltaTime;
  return { position: newPosition, velocity: newVelocity };
}

/**
 * Smooth step function (Hermite interpolation)
 * Creates smooth transitions at edges
 *
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to smooth
 * @returns Smoothed value (0-1)
 */
export function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Smoother step (Ken Perlin's improved version)
 * Even smoother transitions with zero first and second derivatives at edges
 *
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to smooth
 * @returns Smoothed value (0-1)
 */
export function smootherStep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Wrap value around a range (for circular motion)
 *
 * @param value - Value to wrap
 * @param min - Range minimum
 * @param max - Range maximum
 * @returns Wrapped value
 */
export function wrap(value: number, min: number, max: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/**
 * Calculate angle between two 2D points
 *
 * @param from - Source point
 * @param to - Target point
 * @returns Angle in radians
 */
export function angleBetween(from: Vector2D, to: Vector2D): number {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

/**
 * Rotate a 2D point around origin
 *
 * @param point - Point to rotate
 * @param angle - Rotation angle in radians
 * @returns Rotated point
 */
export function rotatePoint(point: Vector2D, angle: number): Vector2D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos
  };
}

/**
 * Exponential decay function
 * Useful for smooth value approach
 *
 * @param current - Current value
 * @param target - Target value
 * @param decay - Decay rate (0-1)
 * @param deltaTime - Time step
 * @returns Decayed value
 */
export function exponentialDecay(
  current: number,
  target: number,
  decay: number,
  deltaTime: number
): number {
  return target + (current - target) * Math.exp(-decay * deltaTime);
}
