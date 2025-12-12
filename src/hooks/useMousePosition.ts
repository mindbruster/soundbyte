/**
 * useMousePosition Hook
 *
 * Tracks cursor position with optional smoothing for magnetic effects.
 * Provides both raw and smoothed positions.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { lerp } from '../lib/animations';
import type { Vector2D } from '../lib/animations';

interface MousePosition extends Vector2D {
  /** Normalized X position (0-1) */
  normalizedX: number;
  /** Normalized Y position (0-1) */
  normalizedY: number;
  /** Whether mouse is over the target */
  isHovering: boolean;
  /** Whether mouse has moved (vs initial state) */
  hasMoved: boolean;
}

interface UseMousePositionOptions {
  /** Apply smoothing (default: false) */
  smooth?: boolean;
  /** Smoothing factor 0-1 (higher = slower) */
  smoothingFactor?: number;
  /** Target element (default: window) */
  target?: React.RefObject<HTMLElement>;
}

export function useMousePosition(
  options: UseMousePositionOptions = {}
): MousePosition {
  const { smooth = false, smoothingFactor = 0.1, target } = options;

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
    isHovering: false,
    hasMoved: false
  });

  const targetPosition = useRef<Vector2D>({ x: 0, y: 0 });
  const currentPosition = useRef<Vector2D>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  const updatePosition = useCallback(() => {
    if (smooth) {
      currentPosition.current.x = lerp(
        currentPosition.current.x,
        targetPosition.current.x,
        smoothingFactor
      );
      currentPosition.current.y = lerp(
        currentPosition.current.y,
        targetPosition.current.y,
        smoothingFactor
      );
    } else {
      currentPosition.current = { ...targetPosition.current };
    }

    const element = target?.current;
    const width = element ? element.clientWidth : window.innerWidth;
    const height = element ? element.clientHeight : window.innerHeight;

    setPosition({
      x: currentPosition.current.x,
      y: currentPosition.current.y,
      normalizedX: currentPosition.current.x / width,
      normalizedY: currentPosition.current.y / height,
      isHovering: isHoveringRef.current,
      hasMoved: true
    });

    if (smooth) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [smooth, smoothingFactor, target]);

  useEffect(() => {
    const element = target?.current;
    const mouseTarget = element || window;

    const handleMouseMove = (event: MouseEvent) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        targetPosition.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      } else {
        targetPosition.current = {
          x: event.clientX,
          y: event.clientY
        };
      }

      if (!smooth) {
        updatePosition();
      }
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      setPosition(prev => ({ ...prev, isHovering: false }));
    };

    mouseTarget.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    if (smooth) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      mouseTarget.removeEventListener('mousemove', handleMouseMove as EventListener);
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, smooth, updatePosition]);

  return position;
}

/**
 * useElementCenter Hook
 *
 * Returns the center position of an element, useful for magnetic effects.
 */
export function useElementCenter(ref: React.RefObject<HTMLElement>): Vector2D {
  const [center, setCenter] = useState<Vector2D>({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setCenter({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    };

    updateCenter();
    window.addEventListener('resize', updateCenter, { passive: true });
    window.addEventListener('scroll', updateCenter, { passive: true });

    return () => {
      window.removeEventListener('resize', updateCenter);
      window.removeEventListener('scroll', updateCenter);
    };
  }, [ref]);

  return center;
}

/**
 * useMagneticEffect Hook
 *
 * Creates a magnetic effect where elements are pulled toward the cursor.
 */
interface MagneticEffect {
  /** Transform X offset */
  x: number;
  /** Transform Y offset */
  y: number;
  /** Whether cursor is in magnetic range */
  isActive: boolean;
}

interface UseMagneticEffectOptions {
  /** Magnetic strength (1 = follow cursor exactly) */
  strength?: number;
  /** Range in pixels where magnetic effect activates */
  range?: number;
  /** Smoothing factor */
  smoothing?: number;
}

export function useMagneticEffect(
  ref: React.RefObject<HTMLElement>,
  options: UseMagneticEffectOptions = {}
): MagneticEffect {
  const { strength = 0.3, range = 100, smoothing = 0.15 } = options;

  const [effect, setEffect] = useState<MagneticEffect>({
    x: 0,
    y: 0,
    isActive: false
  });

  const currentOffset = useRef<Vector2D>({ x: 0, y: 0 });
  const targetOffset = useRef<Vector2D>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animate = () => {
      currentOffset.current.x = lerp(
        currentOffset.current.x,
        targetOffset.current.x,
        smoothing
      );
      currentOffset.current.y = lerp(
        currentOffset.current.y,
        targetOffset.current.y,
        smoothing
      );

      setEffect({
        x: currentOffset.current.x,
        y: currentOffset.current.y,
        isActive: targetOffset.current.x !== 0 || targetOffset.current.y !== 0
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < range) {
        const intensity = 1 - distance / range;
        targetOffset.current = {
          x: deltaX * strength * intensity,
          y: deltaY * strength * intensity
        };
      } else {
        targetOffset.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      targetOffset.current = { x: 0, y: 0 };
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [ref, strength, range, smoothing]);

  return effect;
}
