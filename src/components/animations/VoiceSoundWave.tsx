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
// MATHEMATICAL WAVE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// Perlin-like noise for organic variation
function smoothNoise(x: number, seed: number = 0): number {
  const n = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

// Multi-octave noise for complex patterns
function fractalNoise(x: number, octaves: number = 4, persistence: number = 0.5): number {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += smoothNoise(x * frequency, i) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }

  return total / maxValue;
}

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
  // Background glow layer - deep bass, like a powerful voice resonating
  {
    amplitude: 120,
    frequency: 0.003,
    speed: 0.15,
    phase: 0,
    opacity: 0.2,
    strokeWidth: 60,
    color: '#d4a853',
    glow: true
  },
  // Deep rumble layer - very low frequency, slow powerful movement
  {
    amplitude: 100,
    frequency: 0.004,
    speed: 0.2,
    phase: Math.PI / 4,
    opacity: 0.35,
    strokeWidth: 5,
    color: '#c9a227',
    glow: false
  },
  // Main voice layer - dominant low pitch with power
  {
    amplitude: 85,
    frequency: 0.006,
    speed: 0.25,
    phase: Math.PI / 2,
    opacity: 0.6,
    strokeWidth: 4,
    color: '#d4a853',
    glow: false
  },
  // Primary shouting layer - aggressive, punchy
  {
    amplitude: 70,
    frequency: 0.008,
    speed: 0.35,
    phase: 0,
    opacity: 0.9,
    strokeWidth: 4,
    color: '#e5c158',
    glow: true
  },
  // Mid harmonic - adds body to the shout
  {
    amplitude: 45,
    frequency: 0.012,
    speed: 0.5,
    phase: Math.PI / 3,
    opacity: 0.7,
    strokeWidth: 2.5,
    color: '#f0d78c',
    glow: false
  },
  // High detail layer - the edge/intensity of a shout
  {
    amplitude: 25,
    frequency: 0.02,
    speed: 0.8,
    phase: Math.PI / 6,
    opacity: 0.5,
    strokeWidth: 1.5,
    color: '#fff8e7',
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

  // Breathing pulse animation - more dramatic like shouting intensity
  useEffect(() => {
    let pulseTime = 0;
    const pulseTick = () => {
      pulseTime += 0.015; // Slower for more powerful feel
      // Multiple pulse frequencies for complex breathing like shouting
      const mainPulse = Math.sin(pulseTime) * 0.15;
      const powerSurge = Math.pow(Math.sin(pulseTime * 0.5), 2) * 0.1;
      const shoutIntensity = Math.sin(pulseTime * 2) * 0.05;
      setPulse(1 + mainPulse + powerSurge + shoutIntensity);
      requestAnimationFrame(pulseTick);
    };
    const rafId = requestAnimationFrame(pulseTick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Generate wave path with physics - SHOUTING VOICE dynamics
  const generateWavePath = useCallback((
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    layer: WaveLayer,
    time: number,
    mouseXVal: number,
    mouseYVal: number,
    pulseVal: number
  ) => {
    const centerY = height / 2;
    const points: { x: number; y: number }[] = [];

    // Generate points along the wave
    for (let x = 0; x <= width; x += 2) {
      const normalizedX = x / width;

      // Base sine wave - LOW frequency for deep voice
      const baseWave = Math.sin(x * layer.frequency + time * layer.speed + layer.phase);

      // Add LOW harmonics for deep, powerful voice
      const harmonic2 = Math.sin(x * layer.frequency * 1.5 + time * layer.speed * 0.8) * 0.4;
      const harmonic3 = Math.sin(x * layer.frequency * 2 + time * layer.speed * 0.5) * 0.25;

      // Sub-bass rumble - very low frequency undertone
      const subBass = Math.sin(x * layer.frequency * 0.5 + time * layer.speed * 0.3) * 0.3;

      // Shouting bursts - periodic intensity spikes
      const shoutBurst = Math.pow(Math.sin(time * 0.8 + normalizedX * Math.PI), 4) * 0.5;

      // Aggressive attack transients - sharp peaks like vocal attacks
      const attack = Math.sin(x * layer.frequency * 4 + time * layer.speed * 2) *
                     Math.exp(-Math.pow((normalizedX - 0.5) * 3, 2)) * 0.2;

      // Fractal noise for organic variation - more intense
      const noise = fractalNoise(x * 0.008 + time * 0.08, 5, 0.65) * 0.35;

      // Envelope - fade at edges but maintain power in center
      const envelope = Math.pow(Math.sin(normalizedX * Math.PI), 0.7);

      // Mouse influence - creates a bulge/dip near cursor (more dramatic)
      const mouseDistX = Math.abs(normalizedX - mouseXVal);
      const mouseInfluence = Math.exp(-mouseDistX * mouseDistX * 15) * (mouseYVal - 0.5) * 150;

      // Combine all effects with shouting intensity
      const amplitude = layer.amplitude * envelope * pulseVal * (1 + shoutBurst);
      const y = centerY +
        (baseWave + harmonic2 + harmonic3 + subBass + attack + noise) * amplitude +
        mouseInfluence;

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

  // Draw sparkle particles
  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    mouseXVal: number,
    _mouseYVal: number,
    pulseVal: number
  ) => {
    const centerY = height / 2;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const x = (i / particleCount) * width;
      const normalizedX = x / width;

      // Match the main wave position with mouse influence
      const mouseDistX = Math.abs(normalizedX - mouseXVal);
      const mouseInfluence = Math.exp(-mouseDistX * mouseDistX * 10) * 20;
      const baseWave = Math.sin(x * 0.025 + time * 0.8);
      const envelope = Math.sin(normalizedX * Math.PI);
      const amplitude = 35 * envelope * pulseVal;
      const y = centerY + baseWave * amplitude + mouseInfluence;

      // Particle properties
      const particlePhase = i * 0.5 + time * 2;
      const particleSize = 2 + Math.sin(particlePhase) * 1.5;
      const particleOpacity = 0.3 + Math.sin(particlePhase) * 0.3;

      // Only show some particles at a time
      if (Math.sin(particlePhase) > 0.5) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 231, ${particleOpacity})`;
        ctx.shadowColor = '#f0d78c';
        ctx.shadowBlur = 10;
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
