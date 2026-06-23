import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import FeederModel from './FeederModel';
import Particles from './Particles';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

/**
 * Reusable R3F scene. `interactive` enables drag-orbit (used in the
 * flagship solution section); the hero uses gentle auto motion only.
 */
export default function FeederScene({ interactive = false, scale = 0.62 }) {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 1.2, 8], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[6, 9, 6]}
          angle={0.4}
          penumbra={1}
          intensity={2.2}
          color="#bfe9f5"
        />
        <pointLight position={[-6, -3, -4]} intensity={1.4} color="#0EA5E9" />
        <pointLight position={[4, -4, 4]} intensity={1} color="#2DD4BF" />

        <Float
          speed={reduced ? 0 : 1.4}
          rotationIntensity={reduced ? 0 : 0.4}
          floatIntensity={reduced ? 0 : 0.6}
        >
          <FeederModel scale={scale} />
        </Float>

        <Particles count={reduced ? 120 : 300} />
        <Environment preset="city" />

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!reduced}
            autoRotateSpeed={0.6}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.7}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
