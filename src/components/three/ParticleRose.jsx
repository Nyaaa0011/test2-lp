import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function Particles({ count = 60 }) {
  const meshRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return s;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posArr = geo.attributes.position.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.001;
      posArr[i * 3] += Math.cos(t * 0.2 + i * 0.5) * 0.0005;

      // Reset if out of bounds
      if (posArr[i * 3 + 1] > 4) posArr[i * 3 + 1] = -4;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#E8B4B8"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleRose() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  if (isMobile || reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
