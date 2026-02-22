import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function ProductShape() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.4, 0.35, 1.8, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.02}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#F5D6D9"
          transmission={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingProduct() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  if (isMobile || reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, 4]} intensity={0.4} color="#E8B4B8" />
        <ProductShape />
      </Canvas>
    </div>
  );
}
