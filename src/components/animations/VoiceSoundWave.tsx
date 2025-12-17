/**
 * Voice Sound Wave - The Hero Centerpiece
 *
 * A stunning, physics-based sound wave visualization that represents
 * "Your Voice Immortalized" - the core of Amrita's SoundBYTE art.
 *
 * Features:
 * - Mathematical Bezier curves with organic motion
 * - Multi-layered waveforms with depth
 * - Mouse-reactive distortions
 * - Golden gradient that shimmers
 * - Breathing/pulsing animation
 * - Never-before-seen visual effect
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════
// WAVE LAYER CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

interface WaveLayer {
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  opacity: number;
  strokeWidth: number;
  color: string;
  glow: boolean;
}

const waveLayers: WaveLayer[] = [
  // Main voice wave - high amplitude, small wavelength
  {
    amplitude: 100,
    frequency: 0.04,
    speed: 0.5,
    phase: 0,
    opacity: 0.9,
    strokeWidth: 3,
    color: '#33cc80', // Custom green primary
    glow: true
  },
  // Secondary wave - follows the main wave
  {
    amplitude: 70,
    frequency: 0.04,
    speed: 0.5,
    phase: Math.PI / 6,
    opacity: 0.5,
    strokeWidth: 2,
    color: '#5ce0a3', // Custom green lighter
    glow: false
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface VoiceSoundWaveProps {
  className?: string;
}

export function VoiceSoundWave({ className = '' }: VoiceSoundWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Mouse position for interactivity
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Pulse state for breathing effect
  const [pulse, setPulse] = useState(1);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Gentle breathing pulse - like natural speaking rhythm
  useEffect(() => {
    let pulseTime = 0;
    const pulseTick = () => {
      pulseTime += 0.02;
      // Gentle pulse like natural breathing while speaking
      const breathPulse = Math.sin(pulseTime) * 0.08;
      setPulse(1 + breathPulse);
      requestAnimationFrame(pulseTick);
    };
    const rafId = requestAnimationFrame(pulseTick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Generate wave path - symmetrical wave with equal crest and trough
  const generateWavePath = useCallback((
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    layer: WaveLayer,
    time: number,
    _mouseXVal: number,
    _mouseYVal: number,
    pulseVal: number
  ) => {
    const centerY = height / 2;
    const points: { x: number; y: number }[] = [];

    // Generate points along the wave
    for (let x = 0; x <= width; x += 4) {
      const normalizedX = x / width;

      // Pure sine wave - perfectly symmetrical crest and trough
      const baseWave = Math.sin(x * layer.frequency + time * layer.speed + layer.phase);

      // Envelope - fade at edges for clean look
      const envelope = Math.sin(normalizedX * Math.PI);

      // High amplitude, symmetrical wave
      const amplitude = layer.amplitude * envelope * pulseVal;
      const y = centerY + baseWave * amplitude;

      points.push({ x, y });
    }

    // Draw the wave using bezier curves for smoothness
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      // Smooth curve using quadratic bezier
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;

      ctx.quadraticCurveTo(current.x, current.y, midX, midY);
    }

    // Final point
    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);

    return points;
  }, []);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with fade for trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Clear fully for crisp rendering
      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.016; // ~60fps
      const time = timeRef.current;

      // Get spring values
      const mX = mouseXSpring.get();
      const mY = mouseYSpring.get();

      // Draw each layer
      waveLayers.forEach((layer) => {
        ctx.save();

        // Set up glow effect
        if (layer.glow) {
          ctx.shadowColor = layer.color;
          ctx.shadowBlur = 30;
        }

        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.strokeWidth;
        ctx.globalAlpha = layer.opacity;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Generate and draw wave
        generateWavePath(ctx, width, height, layer, time, mX, mY, pulse);
        ctx.stroke();

        ctx.restore();
      });

      // Draw highlight particles along the main wave
      drawParticles(ctx, width, height, time, mX, mY, pulse);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [generateWavePath, mouseXSpring, mouseYSpring, pulse]);

  // Draw minimal sparkle particles
  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    _mouseXVal: number,
    _mouseYVal: number,
    pulseVal: number
  ) => {
    const centerY = height / 2;
    const particleCount = 8; // Reduced from 30

    for (let i = 0; i < particleCount; i++) {
      const x = (i / particleCount) * width;
      const normalizedX = x / width;

      const baseWave = Math.sin(x * 0.008 + time * 0.4);
      const envelope = Math.sin(normalizedX * Math.PI);
      const amplitude = 40 * envelope * pulseVal;
      const y = centerY + baseWave * amplitude;

      const particlePhase = i * 0.8 + time * 1.5;
      const particleSize = 2;
      const particleOpacity = 0.4 + Math.sin(particlePhase) * 0.2;

      if (Math.sin(particlePhase) > 0.6) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 231, ${particleOpacity})`;
        ctx.fill();
        ctx.restore();
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-luxury-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 via-transparent to-luxury-black/50 opacity-60" />
      </div>

    </div>
  );
}
