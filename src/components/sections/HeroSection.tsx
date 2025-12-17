/**
 * HERO SECTION
 *
 * Two-column layout with dubai.avif background:
 * - Left: Who is Amrita Sethi + What she creates
 * - Right: Animated 3D frame cycling through artworks
 */

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Mic, Radio } from 'lucide-react';

// Artworks and artist photos to cycle through
const artworks = [
  { src: '/images/artworks/dubai.avif', title: 'Dubai' },
  { src: '/images/artist/amrita2.avif', title: 'amrita sethi' },
  { src: '/images/artworks/delhi.avif', title: 'Delhi' },
  { src: '/images/artist/amrita3.avif', title: 'amrita sethi' },
  { src: '/images/artworks/Eyd.avif', title: 'Eyd' },
  { src: '/images/artist/amrita4.avif', title: 'amrita sethi' },
  { src: '/images/artworks/valentine\'s day.avif', title: "Valentine's Day" },
  { src: '/images/artist/amrita5.avif', title: 'amrita sethi' },
  { src: '/images/artworks/wall.avif', title: 'Wall' },
  { src: '/images/artist/amrita6.avif', title: 'amrita sethi' },
];

// Premium easing curves
const easeSmooth = [0.45, 0, 0.15, 1];
const easeOut = [0.0, 0.0, 0.2, 1];
const easeInOut = [0.4, 0, 0.2, 1];

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE SOUNDWAVE - Responds to microphone input
// ═══════════════════════════════════════════════════════════════════════════

interface SoundwaveProps {
  analyser: AnalyserNode | null;
  dataArray: Uint8Array | null;
  micActive: boolean;
}

function SoundwaveLine({ analyser, dataArray, micActive }: SoundwaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  // Store latest values in refs (updated every render)
  const analyserRef = useRef(analyser);
  const dataArrayRef = useRef(dataArray);
  const micActiveRef = useRef(micActive);

  // Update refs on every render
  analyserRef.current = analyser;
  dataArrayRef.current = dataArray;
  micActiveRef.current = micActive;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const centerY = height * 0.5;

      // Theme color: Custom Green #33CC80
      ctx.strokeStyle = 'rgba(51, 204, 128, 0.4)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Read latest values from refs
      const currentAnalyser = analyserRef.current;
      const currentDataArray = dataArrayRef.current;
      const isMicActive = micActiveRef.current;

      if (isMicActive && currentAnalyser && currentDataArray) {
        // Get time domain data for smooth waveform
        currentAnalyser.getByteTimeDomainData(currentDataArray);

        ctx.beginPath();

        // Use only a portion of data for tighter wavelength
        const samplesToUse = Math.floor(currentDataArray.length / 4);
        const sliceWidth = width / samplesToUse;
        let x = 0;

        for (let i = 0; i < samplesToUse; i++) {
          const v = currentDataArray[i] / 128.0; // 0-2 range, 1 = center
          const y = centerY + (v - 1) * 400; // High amplitude for big crests/troughs

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.stroke();
      } else {
        // SIMPLE animated wave when mic is off
        ctx.beginPath();

        for (let x = 0; x <= width; x += 3) {
          const y = centerY + Math.sin(x * 0.02 + timeRef.current * 0.5) * 80;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
        timeRef.current += 0.02;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []); // Run once, refs handle updates

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ARTISTIC GALLERY FRAME
// Cinematic Ken Burns effect, elegant transitions, gallery-like presentation
// ═══════════════════════════════════════════════════════════════════════════

function ArtworkFrame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle with longer viewing time (like a gallery)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artworks.length);
    }, 5000); // 5 seconds to appreciate each piece

    return () => clearInterval(interval);
  }, [isHovered]);

  // Ken Burns - different movement for each image
  const kenBurnsVariants = [
    { scale: [1, 1.08], x: [0, -15], y: [0, -10] },      // Zoom in, drift left-up
    { scale: [1.05, 1], x: [10, 0], y: [0, 5] },         // Zoom out, drift right-down
    { scale: [1, 1.06], x: [0, 10], y: [-5, 0] },        // Zoom in, drift right
    { scale: [1.04, 1], x: [-8, 0], y: [5, 0] },         // Zoom out, drift left
    { scale: [1, 1.05], x: [5, -5], y: [0, -8] },        // Subtle zoom, pan
  ];

  const currentKenBurns = kenBurnsVariants[currentIndex % kenBurnsVariants.length];

  return (
    <div
      className="relative w-full"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient shadow beneath frame */}
      <div className="absolute -inset-4 top-8 bg-black/30 blur-2xl rounded-3xl" />

      {/* The Gallery Frame */}
      <motion.div
        className="relative w-full aspect-[4/3]"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: isHovered ? 0 : [0, 1, 0, -1, 0],
          rotateX: isHovered ? 0 : [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Outer frame - gallery style */}
        <div className="absolute -inset-3 rounded-sm bg-gradient-to-br from-neutral-800 via-neutral-900 to-black shadow-2xl" />

        {/* Inner gold accent line */}
        <div className="absolute -inset-1 rounded-sm border border-gold-500/20" />

        {/* Image container with mask */}
        <div className="absolute inset-0 rounded-sm overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Ken Burns animated image */}
              <motion.img
                src={artworks[currentIndex].src}
                alt={artworks[currentIndex].title}
                className="w-full h-full object-cover"
                initial={{
                  scale: currentKenBurns.scale[0],
                  x: currentKenBurns.x[0],
                  y: currentKenBurns.y[0]
                }}
                animate={{
                  scale: currentKenBurns.scale[1],
                  x: currentKenBurns.x[1],
                  y: currentKenBurns.y[1]
                }}
                transition={{
                  duration: 5,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic letterbox bars - subtle */}
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          {/* Light reflection on glass */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Title plaque - like a gallery label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${currentIndex}`}
            className="absolute -bottom-12 left-0 right-0"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}
          >
            <div className="text-center">
              <p className="font-display text-base text-white/90 mb-0.5">
                {artworks[currentIndex].title}
              </p>
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
                {artworks[currentIndex].title === 'amrita sethi' ? 'the artist' : 'SoundBYTE® Original'}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation dots - minimal */}
      <div className="flex justify-center gap-1.5 mt-16">
        {artworks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-700 ${
              index === currentIndex
                ? 'bg-gold-500 w-5 h-1.5'
                : 'bg-white/15 w-1.5 h-1.5 hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Microphone state
  const [micActive, setMicActive] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize microphone
  const initMicrophone = async () => {
    if (micActive) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      const audioContext = new AudioContext();
      await audioContext.resume();

      const source = audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();

      analyserNode.fftSize = 2048; // More detail for smooth wave
      analyserNode.smoothingTimeConstant = 0.5;

      source.connect(analyserNode);

      // Connect to destination (required for some browsers)
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0; // Mute output to prevent feedback
      analyserNode.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const bufferLength = analyserNode.fftSize; // Use fftSize for time domain
      const dataArr = new Uint8Array(bufferLength);

      setAnalyser(analyserNode);
      setDataArray(dataArr);
      setMicActive(true);

      console.log('Mic ready!', { bufferLength });
    } catch (err) {
      console.error('Mic error:', err);
      alert('Microphone access denied.');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Solid dark background */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

      {/* Animated soundwave line */}
      <div className="absolute inset-0 z-[1]">
        <SoundwaveLine analyser={analyser} dataArray={dataArray} micActive={micActive} />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/50 z-[2]" />

      {/* Main Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full px-6 sm:px-8 lg:px-16 py-32"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Two Column Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT COLUMN: Clean & Simple */}
            <div className="max-w-xl">
              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ delay: 0.3, duration: 0.8, ease: easeOut }}
                className="mb-4"
              >
                <span className="block font-display text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[0.95]">
                  Amrita
                </span>
                <span className="block font-display text-5xl sm:text-6xl md:text-7xl font-light text-gold-500 tracking-tight leading-[0.95]">
                  Sethi
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.5, duration: 0.8, ease: easeOut }}
                className="text-white/80 text-lg sm:text-xl font-light leading-relaxed mb-6"
              >
                Transforming <span className="text-gold-500">voice</span> into visual art.
              </motion.p>

              {/* Brief description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.6, duration: 0.8, ease: easeOut }}
                className="text-white/50 text-sm leading-relaxed mb-8"
              >
                Dubai's first NFT artist. Creator of SoundBYTEs® — the patented
                process of turning spoken words into collectible masterpieces.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.7, duration: 0.8, ease: easeOut }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/commission">
                  <Button variant="primary" size="lg" className="group">
                    <span>Commission Art</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Animated Artwork Frame */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 60 }}
              transition={{ delay: 0.5, duration: 1, ease: easeSmooth }}
              className="hidden lg:block"
            >
              <ArtworkFrame />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-3">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gold-500/60 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Microphone button - theme colored */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={initMicrophone}
        className={`absolute bottom-24 right-8 z-50 p-4 rounded-full border-2 transition-all duration-500 ${
          micActive
            ? 'bg-[#33cc80] text-black border-[#33cc80] shadow-[0_0_20px_rgba(51,204,128,0.5)]'
            : 'bg-black/50 text-[#33cc80] border-[#33cc80]/50 hover:bg-[#33cc80]/20 hover:border-[#33cc80]'
        }`}
        title={micActive ? 'Microphone active - speak to interact' : 'Enable microphone to interact with the soundwave'}
      >
        <Mic className="w-6 h-6" />
      </motion.button>

      {/* Mic status indicator */}
      {micActive && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-[104px] right-20 z-50 flex items-center gap-2"
        >
          <Radio className="w-3 h-3 text-[#33cc80] animate-pulse" />
          <span className="text-[#33cc80] text-xs uppercase tracking-wider font-medium">Live</span>
        </motion.div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
