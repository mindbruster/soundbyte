/**
 * Interactive Voice-to-Art Demo Section
 *
 * Lets visitors experience what a SoundBYTE is by:
 * 1. Recording their voice (3 seconds)
 * 2. Visualizing the waveform in real-time
 * 3. Generating a preview artwork based on frequencies
 *
 * Major conversion driver - experience before buying!
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { springs } from '../../lib/animations/easings';
import { Link } from 'react-router-dom';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type DemoState = 'idle' | 'permission' | 'recording' | 'processing' | 'result';

interface FrequencyData {
  low: number;
  mid: number;
  high: number;
  peak: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// LIVE WAVEFORM VISUALIZER
// ═══════════════════════════════════════════════════════════════════════════

interface WaveformVisualizerProps {
  analyser: AnalyserNode | null;
  isRecording: boolean;
}

function WaveformVisualizer({ analyser, isRecording }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (analyser && isRecording) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Draw waveform
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.lineWidth = 3;

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        // Idle state - subtle sine wave
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 2;

        const time = Date.now() * 0.001;
        for (let x = 0; x <= width; x += 2) {
          const y = centerY + Math.sin(x * 0.02 + time) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, isRecording]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-32 rounded-lg bg-luxury-gray/30 border border-white/10"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GENERATED ARTWORK PREVIEW
// ═══════════════════════════════════════════════════════════════════════════

interface ArtworkPreviewProps {
  frequencyData: FrequencyData;
}

function ArtworkPreview({ frequencyData }: ArtworkPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, size, size);

    // Generate artwork based on frequency data
    const { low, mid, high, peak } = frequencyData;

    // Background gradient based on overall energy
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size / 2);
    bgGradient.addColorStop(0, `rgba(16, 185, 129, ${0.1 + peak * 0.1})`);
    bgGradient.addColorStop(1, 'rgba(10, 10, 10, 1)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, size, size);

    // Draw frequency-based rings
    const ringCount = 8 + Math.floor(mid * 8);
    for (let i = 0; i < ringCount; i++) {
      const progress = i / ringCount;
      const radius = 20 + progress * (size / 2 - 40);
      const amplitude = 10 + low * 30 * (1 - progress);
      const frequency = 3 + high * 10;

      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.02) {
        const wave = Math.sin(angle * frequency + i * 0.5) * amplitude;
        const r = radius + wave;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      const opacity = 0.1 + (1 - progress) * 0.3;
      ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
      ctx.lineWidth = 1 + progress * 2;
      ctx.stroke();
    }

    // Add central burst based on peak
    const burstCount = 12 + Math.floor(peak * 12);
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;
      const length = 30 + peak * 80;
      const width = 2 + mid * 4;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * length,
        centerY + Math.sin(angle) * length
      );
      ctx.strokeStyle = `rgba(16, 185, 129, ${0.3 + peak * 0.4})`;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Add golden accent dots
    const dotCount = 20 + Math.floor(high * 30);
    for (let i = 0; i < dotCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * (size / 2 - 80);
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const dotSize = 1 + Math.random() * 3;

      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${0.3 + Math.random() * 0.5})`;
      ctx.fill();
    }

    // Signature text
    ctx.font = '10px Inter';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('Your SoundBYTE Preview', centerX, size - 15);

  }, [frequencyData]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springs.waveGentle }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="w-full max-w-sm mx-auto aspect-square rounded-lg border border-gold-500/30 shadow-2xl shadow-gold-500/10"
      />
      {/* Golden frame effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-gold-500/20 pointer-events-none" />
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RECORDING PROGRESS
// ═══════════════════════════════════════════════════════════════════════════

interface RecordingProgressProps {
  duration: number;
  maxDuration: number;
}

function RecordingProgress({ duration, maxDuration }: RecordingProgressProps) {
  const progress = (duration / maxDuration) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white/60">Recording...</span>
        <span className="text-gold-500 font-mono">{duration.toFixed(1)}s / {maxDuration}s</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VOICE DEMO SECTION MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function VoiceDemoSection() {
  const [state, setState] = useState<DemoState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [frequencyData, setFrequencyData] = useState<FrequencyData | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const MAX_DURATION = 3; // seconds

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [state]);

  const startRecording = async () => {
    try {
      setError(null);
      setState('permission');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio analysis
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Set up recording
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        setState('processing');

        // Analyze frequency data
        if (analyserRef.current) {
          const bufferLength = analyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyserRef.current.getByteFrequencyData(dataArray);

          // Calculate frequency bands
          const third = Math.floor(bufferLength / 3);
          let lowSum = 0, midSum = 0, highSum = 0;

          for (let i = 0; i < third; i++) lowSum += dataArray[i];
          for (let i = third; i < third * 2; i++) midSum += dataArray[i];
          for (let i = third * 2; i < bufferLength; i++) highSum += dataArray[i];

          const maxVal = 255 * third;
          const freqData: FrequencyData = {
            low: lowSum / maxVal,
            mid: midSum / maxVal,
            high: highSum / maxVal,
            peak: Math.max(...Array.from(dataArray)) / 255
          };

          setFrequencyData(freqData);
        }

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) audioContextRef.current.close();

        setTimeout(() => setState('result'), 500);
      };

      // Start recording
      mediaRecorder.start();
      setState('recording');
      setDuration(0);

      // Track duration
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setDuration(elapsed);

        if (elapsed >= MAX_DURATION) {
          stopRecording();
        }
      }, 100);

    } catch (err) {
      console.error('Recording error:', err);
      setError('Could not access microphone. Please allow microphone access and try again.');
      setState('idle');
    }
  };

  const resetDemo = () => {
    setState('idle');
    setFrequencyData(null);
    setDuration(0);
    setError(null);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-luxury-black via-luxury-gray/10 to-luxury-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl" />
      </div>

      <Container size="lg" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springs.waveGentle }}
          className="text-center mb-12"
        >
          <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-4">
            Experience It Yourself
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">
            Try the <span className="text-gradient-gold">Voice-to-Art</span> Demo
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Record a 3-second voice clip and see how your unique voice frequency
            can be transformed into visual art.
          </p>
        </motion.div>

        {/* Demo interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ...springs.waveGentle }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {/* Idle State */}
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  <WaveformVisualizer analyser={null} isRecording={false} />

                  <p className="text-white/50 text-sm">
                    Click the button below to start recording your voice
                  </p>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={startRecording}
                    className="group"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                    Start Recording
                  </Button>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}
                </motion.div>
              )}

              {/* Permission State */}
              {state === 'permission' && (
                <motion.div
                  key="permission"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/20 flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <p className="text-white/60">Please allow microphone access...</p>
                </motion.div>
              )}

              {/* Recording State */}
              {state === 'recording' && (
                <motion.div
                  key="recording"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <WaveformVisualizer analyser={analyserRef.current} isRecording={true} />

                  <RecordingProgress duration={duration} maxDuration={MAX_DURATION} />

                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-4">
                      Speak, sing, or make any sound!
                    </p>
                    <Button variant="outline" size="sm" onClick={stopRecording}>
                      Stop Early
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Processing State */}
              {state === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <motion.div
                      className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                  <p className="text-white/60">Analyzing your voice frequencies...</p>
                </motion.div>
              )}

              {/* Result State */}
              {state === 'result' && frequencyData && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h3 className="font-display text-2xl text-white mb-2">
                      Your Voice as Art
                    </h3>
                    <p className="text-white/50 text-sm">
                      This is a simplified preview. Imagine this with 24k gold leaf!
                    </p>
                  </div>

                  <ArtworkPreview frequencyData={frequencyData} />

                  {/* Frequency breakdown */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-gold-500 font-display text-2xl">
                        {Math.round(frequencyData.low * 100)}%
                      </p>
                      <p className="text-white/40 text-xs uppercase tracking-wider">Low Freq</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-gold-500 font-display text-2xl">
                        {Math.round(frequencyData.mid * 100)}%
                      </p>
                      <p className="text-white/40 text-xs uppercase tracking-wider">Mid Freq</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-gold-500 font-display text-2xl">
                        {Math.round(frequencyData.high * 100)}%
                      </p>
                      <p className="text-white/40 text-xs uppercase tracking-wider">High Freq</p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/soundbyte">
                      <Button variant="primary" size="lg">
                        Commission Your Real SoundBYTE
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" onClick={resetDemo}>
                      Try Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          🔒 Your voice is processed locally and never stored
        </motion.p>
      </Container>
    </section>
  );
}
