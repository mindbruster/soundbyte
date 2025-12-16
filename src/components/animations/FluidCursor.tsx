/**
 * Fluid Cursor Component
 *
 * A premium custom cursor with:
 * - Smooth physics-based following
 * - Particle trail effect
 * - Magnetic attraction to interactive elements
 * - Scale/morph on hover states
 * - Blend mode effects
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { springs } from '../../lib/animations';

// ═══════════════════════════════════════════════════════════════════════════
// CURSOR TRAIL PARTICLE
// ═══════════════════════════════════════════════════════════════════════════

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

function CursorTrail({ particles }: { particles: TrailParticle[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-gold-500"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%) scale(${particle.scale})`,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN CURSOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface FluidCursorProps {
  /** Enable particle trail */
  enableTrail?: boolean;
  /** Trail length */
  trailLength?: number;
}

export function FluidCursor({ enableTrail = true, trailLength = 12 }: FluidCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [_hoverText, setHoverText] = useState<string | null>(null);

  // Motion values for smooth cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for the main cursor
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  
  // Trail particles
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Update cursor position
  const updateCursor = useCallback((clientX: number, clientY: number) => {
    cursorX.set(clientX);
    cursorY.set(clientY);

    // Add trail particle if moved enough
    if (enableTrail) {
      const dx = clientX - lastPositionRef.current.x;
      const dy = clientY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        lastPositionRef.current = { x: clientX, y: clientY };

        const newParticle: TrailParticle = {
          id: particleIdRef.current++,
          x: clientX,
          y: clientY,
          opacity: 0.6,
          scale: 1
        };

        setTrailParticles(prev => {
          const updated = [...prev, newParticle].slice(-trailLength);
          // Update opacity and scale for existing particles
          return updated.map((p, i) => ({
            ...p,
            opacity: ((i + 1) / updated.length) * 0.4,
            scale: ((i + 1) / updated.length) * 0.8
          }));
        });
      }
    }
  }, [cursorX, cursorY, enableTrail, trailLength]);

  // Handle mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      updateCursor(e.clientX, e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor]') ||
        target.closest('[role="button"]');

      const cursorData = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      setIsHovering(!!isInteractive);
      setHoverText(cursorData || null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor]);

  // Fade out trail particles over time
  useEffect(() => {
    if (!enableTrail) return;

    const interval = setInterval(() => {
      setTrailParticles(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity * 0.9 }))
          .filter(p => p.opacity > 0.01)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [enableTrail]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';

    // Add cursor:none to all interactive elements
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = '';
      document.head.removeChild(style);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      {enableTrail && <CursorTrail particles={trailParticles} />}

      {/* Main cursor - simple dot */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-none fixed z-[9999]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: isClicking ? 0.8 : 1
            }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={{
                width: isHovering ? 16 : 10,
                height: isHovering ? 16 : 10,
                backgroundColor: isHovering ? 'rgb(212, 168, 83)' : 'rgb(255, 255, 255)'
              }}
              transition={{ type: 'spring', ...springs.snappy }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
