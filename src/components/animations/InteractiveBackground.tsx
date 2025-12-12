/**
 * Interactive Background System
 *
 * A truly immersive, physics-based background that:
 * - Responds to mouse movement with fluid dynamics
 * - Morphs and transforms based on scroll position
 * - Creates gravitational effects around the cursor
 * - Seamlessly transitions between sections
 * - Uses WebGL shaders for premium performance
 */

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { lerp, smoothLerp } from '../../lib/animations';

// Section color configurations for smooth transitions
interface SectionColorConfig {
  primary: THREE.Color;
  secondary: THREE.Color;
  accent: THREE.Color;
  particleOpacity: number;
  waveIntensity: number;
}

const SECTION_CONFIGS: Record<string, SectionColorConfig> = {
  hero: {
    primary: new THREE.Color(0x0a0a0a),
    secondary: new THREE.Color(0x1a1510),
    accent: new THREE.Color(0xd4a853),
    particleOpacity: 0.6,
    waveIntensity: 1.0
  },
  legacy: {
    primary: new THREE.Color(0x0d0d0d),
    secondary: new THREE.Color(0x1f1a14),
    accent: new THREE.Color(0xc9a227),
    particleOpacity: 0.5,
    waveIntensity: 0.8
  },
  portfolio: {
    primary: new THREE.Color(0x080808),
    secondary: new THREE.Color(0x151210),
    accent: new THREE.Color(0xe5c158),
    particleOpacity: 0.7,
    waveIntensity: 1.2
  },
  soundbyte: {
    primary: new THREE.Color(0x0c0c0c),
    secondary: new THREE.Color(0x1a1612),
    accent: new THREE.Color(0xd4a853),
    particleOpacity: 0.8,
    waveIntensity: 1.5
  },
  sonic: {
    primary: new THREE.Color(0x0a0908),
    secondary: new THREE.Color(0x181410),
    accent: new THREE.Color(0xb8941e),
    particleOpacity: 0.6,
    waveIntensity: 1.0
  },
  commission: {
    primary: new THREE.Color(0x0d0b0a),
    secondary: new THREE.Color(0x1c1814),
    accent: new THREE.Color(0xddb44a),
    particleOpacity: 0.7,
    waveIntensity: 0.9
  },
  footer: {
    primary: new THREE.Color(0x050505),
    secondary: new THREE.Color(0x0f0d0b),
    accent: new THREE.Color(0xc9a227),
    particleOpacity: 0.4,
    waveIntensity: 0.5
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// SHADER DEFINITIONS - Custom GLSL for premium effects
// ═══════════════════════════════════════════════════════════════════════════

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  uniform float uMouseInfluence;

  varying vec2 vUv;
  varying float vElevation;
  varying float vDistanceToMouse;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Calculate distance to mouse in UV space
    vec2 mouseUV = (uMouse + 1.0) * 0.5;
    float distToMouse = distance(uv, mouseUV);
    vDistanceToMouse = distToMouse;

    // Mouse influence - creates a gravitational pull effect
    float mouseEffect = smoothstep(0.5, 0.0, distToMouse) * uMouseInfluence;

    // Multi-layered noise for organic movement
    float noise1 = snoise(vec3(pos.x * 2.0, pos.y * 2.0, uTime * 0.3));
    float noise2 = snoise(vec3(pos.x * 4.0, pos.y * 4.0, uTime * 0.5 + 100.0)) * 0.5;
    float noise3 = snoise(vec3(pos.x * 8.0, pos.y * 8.0, uTime * 0.7 + 200.0)) * 0.25;

    float totalNoise = noise1 + noise2 + noise3;

    // Scroll-based transformation
    float scrollWave = sin(uScrollProgress * 3.14159 * 2.0 + pos.x * 2.0) * 0.5;

    // Combine all effects
    float elevation = totalNoise * 0.8 + mouseEffect * 2.0 + scrollWave * 0.3;

    pos.z += elevation;
    vElevation = elevation;

    // Add subtle XY displacement from mouse
    vec2 mouseDir = normalize(uv - mouseUV + 0.001);
    pos.xy += mouseDir * mouseEffect * 0.3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  varying vec2 vUv;
  varying float vElevation;
  varying float vDistanceToMouse;

  void main() {
    // Dynamic color based on elevation and scroll
    float mixStrength = (vElevation + 1.0) * 0.5;
    mixStrength = clamp(mixStrength, 0.0, 1.0);

    // Three-way color interpolation
    vec3 color;
    if (mixStrength < 0.5) {
      color = mix(uColorA, uColorB, mixStrength * 2.0);
    } else {
      color = mix(uColorB, uColorC, (mixStrength - 0.5) * 2.0);
    }

    // Add glow near mouse
    float glow = smoothstep(0.3, 0.0, vDistanceToMouse) * 0.5;
    color += vec3(0.831, 0.659, 0.325) * glow; // Gold glow

    // Subtle pulse
    float pulse = sin(uTime * 2.0 + vUv.x * 10.0) * 0.05 + 0.95;
    color *= pulse;

    // Edge fade
    float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    edgeFade *= smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);

    float alpha = 0.6 * edgeFade;

    gl_FragColor = vec4(color, alpha);
  }
`;

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE WAVE MESH
// ═══════════════════════════════════════════════════════════════════════════

interface WaveMeshProps {
  scrollProgress: number;
  currentSection: string;
  sectionProgress: number;
}

function WaveMesh({ scrollProgress, currentSection, sectionProgress }: WaveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Mouse tracking state
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const mouseInfluence = useRef(0);

  // Color interpolation state
  const currentColors = useRef({
    primary: new THREE.Color(0x0a0a0a),
    secondary: new THREE.Color(0x1a1510),
    accent: new THREE.Color(0xd4a853)
  });

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseInfluence.current = 1;
    };

    const handleMouseLeave = () => {
      mouseInfluence.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation frame
  useFrame((state, delta) => {
    if (!materialRef.current) return;

    // Smooth mouse following
    mouse.current.x = smoothLerp(mouse.current.x, mouse.current.targetX, 8, delta);
    mouse.current.y = smoothLerp(mouse.current.y, mouse.current.targetY, 8, delta);

    // Update uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    materialRef.current.uniforms.uMouseInfluence.value = smoothLerp(
      materialRef.current.uniforms.uMouseInfluence.value,
      mouseInfluence.current,
      5,
      delta
    );

    // Get section-aware colors with smooth interpolation
    const config = SECTION_CONFIGS[currentSection] || SECTION_CONFIGS.hero;
    const sectionIds = Object.keys(SECTION_CONFIGS);
    const currentIndex = sectionIds.indexOf(currentSection);
    const nextSection = sectionIds[currentIndex + 1] || currentSection;
    const nextConfig = SECTION_CONFIGS[nextSection] || config;

    // Smooth color transitions
    const lerpSpeed = 3;
    currentColors.current.primary.lerp(config.primary, delta * lerpSpeed);
    currentColors.current.secondary.lerp(
      config.secondary.clone().lerp(nextConfig.secondary, sectionProgress),
      delta * lerpSpeed
    );
    currentColors.current.accent.lerp(config.accent, delta * lerpSpeed);

    // Apply section colors
    materialRef.current.uniforms.uColorA.value.copy(currentColors.current.primary);
    materialRef.current.uniforms.uColorB.value.copy(currentColors.current.secondary);
    materialRef.current.uniforms.uColorC.value.copy(currentColors.current.accent);
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScrollProgress: { value: 0 },
    uMouseInfluence: { value: 0 },
    uColorA: { value: new THREE.Color(0x1a1510) },
    uColorB: { value: new THREE.Color(0x3d2f1f) },
    uColorC: { value: new THREE.Color(0x0a0a0a) }
  }), []);

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.3, 0, 0]}
      position={[0, -2, 0]}
    >
      <planeGeometry args={[viewport.width * 2, viewport.height * 2, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING PARTICLES WITH MOUSE ATTRACTION
// ═══════════════════════════════════════════════════════════════════════════

interface ParticleSystemProps {
  scrollProgress: number;
  currentSection: string;
  count?: number;
}

function ParticleSystem({ scrollProgress, currentSection, count = 300 }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { viewport } = useThree();

  // Mouse state
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Color state for smooth transitions
  const currentColor = useRef(new THREE.Color(0xd4a853));
  const currentOpacity = useRef(0.6);

  // Particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 3;
      const y = (Math.random() - 0.5) * viewport.height * 3;
      const z = (Math.random() - 0.5) * 10 - 5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      sizes[i] = Math.random() * 3 + 1;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, originalPositions, sizes, phases };
  }, [count, viewport]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * viewport.width * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * viewport.height * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const { velocities, originalPositions, phases } = particleData;

    // Smooth mouse
    mouse.current.x = lerp(mouse.current.x, mouse.current.targetX, 0.1);
    mouse.current.y = lerp(mouse.current.y, mouse.current.targetY, 0.1);

    // Section-aware color and opacity
    const config = SECTION_CONFIGS[currentSection] || SECTION_CONFIGS.hero;
    currentColor.current.lerp(config.accent, delta * 3);
    currentOpacity.current = lerp(currentOpacity.current, config.particleOpacity, 0.05);

    materialRef.current.color.copy(currentColor.current);
    materialRef.current.opacity = currentOpacity.current;

    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Current position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Distance to mouse
      const dx = mouse.current.x - x;
      const dy = mouse.current.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Gravitational attraction to mouse
      const attractionRadius = 8;
      const attractionStrength = 0.5;

      if (dist < attractionRadius && dist > 0.1) {
        const force = (1 - dist / attractionRadius) * attractionStrength;
        velocities[i3] += (dx / dist) * force * delta * 60;
        velocities[i3 + 1] += (dy / dist) * force * delta * 60;
      }

      // Return force to original position
      const returnStrength = 0.02;
      velocities[i3] += (originalPositions[i3] - x) * returnStrength;
      velocities[i3 + 1] += (originalPositions[i3 + 1] - y) * returnStrength;

      // Apply velocity with damping
      const damping = 0.95;
      velocities[i3] *= damping;
      velocities[i3 + 1] *= damping;
      velocities[i3 + 2] *= damping;

      // Organic floating motion
      const floatX = Math.sin(time * 0.5 + phases[i]) * 0.02;
      const floatY = Math.cos(time * 0.3 + phases[i] * 1.5) * 0.02;
      const floatZ = Math.sin(time * 0.4 + phases[i] * 0.7) * 0.01;

      // Update positions
      positions[i3] = x + velocities[i3] + floatX;
      positions[i3 + 1] = y + velocities[i3 + 1] + floatY;
      positions[i3 + 2] = z + velocities[i3 + 2] + floatZ + scrollProgress * 2;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particleData.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.05}
        color="#d4a853"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MORPHING SOUND WAVE BARS
// ═══════════════════════════════════════════════════════════════════════════

interface SoundWaveBarsProps {
  scrollProgress: number;
  currentSection: string;
  count?: number;
}

function SoundWaveBars({ scrollProgress, currentSection, count = 64 }: SoundWaveBarsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const { viewport } = useThree();

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Color state for smooth transitions
  const currentColor = useRef(new THREE.Color(0xd4a853));
  const currentIntensity = useRef(1.0);

  // Create instance matrices and data
  const { dummy, phases, targetHeights } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const phases = new Float32Array(count);
    const targetHeights = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2;
      targetHeights[i] = 1;
    }

    return { dummy, phases, targetHeights };
  }, [count]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!barsRef.current || !groupRef.current || !materialRef.current) return;

    mouse.current.x = lerp(mouse.current.x, mouse.current.targetX, 0.08);
    mouse.current.y = lerp(mouse.current.y, mouse.current.targetY, 0.08);

    // Section-aware color and intensity
    const config = SECTION_CONFIGS[currentSection] || SECTION_CONFIGS.hero;
    currentColor.current.lerp(config.accent, delta * 3);
    currentIntensity.current = lerp(currentIntensity.current, config.waveIntensity, 0.05);

    materialRef.current.color.copy(currentColor.current);
    materialRef.current.emissive.copy(currentColor.current);
    materialRef.current.emissiveIntensity = 0.3 * currentIntensity.current;

    const time = state.clock.elapsedTime;
    const spread = viewport.width * 0.8;

    for (let i = 0; i < count; i++) {
      const normalizedIndex = i / count;
      const x = (normalizedIndex - 0.5) * spread;

      // Distance from mouse (in normalized coords)
      const barNormalizedX = normalizedIndex * 2 - 1;
      const distToMouse = Math.abs(barNormalizedX - mouse.current.x);

      // Mouse influence on height
      const mouseInfluence = Math.max(0, 1 - distToMouse * 2);

      // Multi-frequency wave with section intensity
      const wave1 = Math.sin(time * 2 + i * 0.15) * 0.5 * currentIntensity.current;
      const wave2 = Math.sin(time * 3 + i * 0.1 + phases[i]) * 0.3 * currentIntensity.current;
      const wave3 = Math.sin(time * 1.5 + i * 0.2) * 0.2 * currentIntensity.current;

      // Scroll influence
      const scrollWave = Math.sin(scrollProgress * Math.PI * 4 + i * 0.1) * 0.5;

      // Combine all influences
      const baseHeight = 0.5;
      const waveHeight = wave1 + wave2 + wave3;
      const mouseHeight = mouseInfluence * 2;
      const totalHeight = baseHeight + waveHeight + mouseHeight + scrollWave * 0.5;

      // Smooth height transition
      targetHeights[i] = lerp(targetHeights[i], Math.max(0.1, totalHeight), 0.15);

      dummy.position.set(x, 0, 0);
      dummy.scale.set(0.08, targetHeights[i], 0.08);
      dummy.updateMatrix();

      barsRef.current.setMatrixAt(i, dummy.matrix);
    }

    barsRef.current.instanceMatrix.needsUpdate = true;

    // Rotate group based on scroll and mouse
    groupRef.current.rotation.y = mouse.current.x * 0.1 + scrollProgress * Math.PI * 0.5;
    groupRef.current.position.y = -3 + scrollProgress * 2;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={barsRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#d4a853"
          emissive="#d4a853"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCENE CONTENT - Separated for section state access
// ═══════════════════════════════════════════════════════════════════════════

interface SceneContentProps {
  scrollProgress: number;
  currentSection: string;
  sectionProgress: number;
}

function SceneContent({ scrollProgress, currentSection, sectionProgress }: SceneContentProps) {
  // Reduce background intensity in hero section to let the sound wave shine
  const isHero = currentSection === 'hero';
  const particleCount = isHero ? 100 : 200;
  const waveBarCount = isHero ? 0 : 48; // Hide bars in hero

  return (
    <>
      {/* Ambient lighting - dimmer in hero */}
      <ambientLight intensity={isHero ? 0.1 : 0.2} />
      <pointLight position={[10, 10, 10]} intensity={isHero ? 0.3 : 0.8} color="#d4a853" />
      <pointLight position={[-10, -10, 5]} intensity={isHero ? 0.2 : 0.4} color="#c9a227" />

      {/* Interactive wave mesh - subtle in hero */}
      <WaveMesh
        scrollProgress={scrollProgress}
        currentSection={currentSection}
        sectionProgress={sectionProgress}
      />

      {/* Floating particles - fewer in hero */}
      <ParticleSystem
        scrollProgress={scrollProgress}
        currentSection={currentSection}
        count={particleCount}
      />

      {/* Sound wave bars - hidden in hero to not compete with main sound wave */}
      {waveBarCount > 0 && (
        <SoundWaveBars
          scrollProgress={scrollProgress}
          currentSection={currentSection}
          count={waveBarCount}
        />
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN INTERACTIVE BACKGROUND COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface InteractiveBackgroundProps {
  className?: string;
}

export function InteractiveBackground({ className = '' }: InteractiveBackgroundProps) {
  const { progress: scrollProgress } = useScrollProgress();

  // Section detection state
  const [currentSection, setCurrentSection] = useState('hero');
  const [sectionProgress, setSectionProgress] = useState(0);

  // Detect current section based on scroll position
  useEffect(() => {
    const sectionIds = ['hero', 'legacy', 'portfolio', 'soundbyte', 'sonic', 'commission', 'footer'];

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let maxVisibility = 0;
      let activeSection = 'hero';
      let activeSectionProgress = 0;

      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();

        // Calculate visibility (how much section overlaps viewport center)
        const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        const visibility = Math.max(0, 1 - distanceFromCenter / (window.innerHeight * 0.6));

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          activeSection = id;

          // Calculate progress through section
          activeSectionProgress = Math.max(0, Math.min(1,
            (viewportCenter - rect.top) / rect.height
          ));
        }
      });

      setCurrentSection(activeSection);
      setSectionProgress(activeSectionProgress);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <SceneContent
          scrollProgress={scrollProgress}
          currentSection={currentSection}
          sectionProgress={sectionProgress}
        />
      </Canvas>
    </div>
  );
}
