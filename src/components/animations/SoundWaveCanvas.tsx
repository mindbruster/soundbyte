import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveBarProps {
  index: number;
  total: number;
  frequencyData: Uint8Array;
  isInteractive: boolean;
}

function WaveBar({ index, total, frequencyData, isInteractive }: WaveBarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(1);

  const position = useMemo(() => {
    const spread = 20;
    const x = (index / total - 0.5) * spread;
    return new THREE.Vector3(x, 0, 0);
  }, [index, total]);

  const baseColor = useMemo(() => {
    const hue = 0.12 + (index / total) * 0.08;
    return new THREE.Color().setHSL(hue, 0.8, 0.5);
  }, [index, total]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const freqIndex = Math.floor((index / total) * frequencyData.length);
    const freqValue = frequencyData[freqIndex] || 0;
    
    const baseHeight = isInteractive 
      ? (freqValue / 255) * 4 + 0.5
      : Math.sin(Date.now() * 0.002 + index * 0.3) * 1.5 + 2;

    targetScale.current = baseHeight;

    meshRef.current.scale.y = THREE.MathUtils.lerp(
      meshRef.current.scale.y,
      targetScale.current,
      delta * 8
    );

    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const intensity = isInteractive ? freqValue / 255 : (Math.sin(Date.now() * 0.002 + index * 0.3) + 1) / 2;
    material.emissiveIntensity = 0.3 + intensity * 0.7;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.15, 1, 0.15]} />
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

interface SoundWaveVisualizerProps {
  frequencyData: Uint8Array;
  isInteractive: boolean;
}

function SoundWaveVisualizer({ frequencyData, isInteractive }: SoundWaveVisualizerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const barCount = 64;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: barCount }).map((_, i) => (
        <WaveBar
          key={i}
          index={i}
          total={barCount}
          frequencyData={frequencyData}
          isInteractive={isInteractive}
        />
      ))}
    </group>
  );
}

interface ParticleFieldProps {
  frequencyData: Uint8Array;
  isInteractive: boolean;
}

function ParticleField({ frequencyData, isInteractive }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const goldColor = new THREE.Color().setHSL(0.12, 0.8, 0.5 + Math.random() * 0.3);
      col[i * 3] = goldColor.r;
      col[i * 3 + 1] = goldColor.g;
      col[i * 3 + 2] = goldColor.b;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const avgFreq = isInteractive 
      ? frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length / 255
      : (Math.sin(state.clock.elapsedTime) + 1) / 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01 * (1 + avgFreq);
      
      if (positions[i3 + 1] > 7.5) positions[i3 + 1] = -7.5;
      if (positions[i3 + 1] < -7.5) positions[i3 + 1] = 7.5;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

interface SoundWaveCanvasProps {
  frequencyData?: Uint8Array;
  isInteractive?: boolean;
  className?: string;
}

export function SoundWaveCanvas({ 
  frequencyData = new Uint8Array(128), 
  isInteractive = false,
  className = ''
}: SoundWaveCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#d4a853" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c9a227" />
        
        <SoundWaveVisualizer frequencyData={frequencyData} isInteractive={isInteractive} />
        <ParticleField frequencyData={frequencyData} isInteractive={isInteractive} />
      </Canvas>
    </div>
  );
}
