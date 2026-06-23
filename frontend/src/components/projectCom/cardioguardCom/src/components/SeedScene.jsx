import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Seed({ position = [0, 0, 0], scale = 1, color = '#B87945', speed = 1 }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.38 * speed;
    ref.current.rotation.x = -0.28 + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh scale={[0.74, 1.16, 0.45]} rotation={[0.08, 0, -0.18]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial color={color} roughness={0.55} clearcoat={0.35} clearcoatRoughness={0.5} />
      </mesh>
      <mesh position={[0.08, 0.04, 0.44]} scale={[0.4, 0.85, 0.03]} rotation={[0.02, 0, -0.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#F2C58B" roughness={0.62} transparent opacity={0.55} />
      </mesh>
      {[-0.26, -0.1, 0.08, 0.25].map((x, index) => (
        <mesh key={x} position={[x, 0.26 - index * 0.18, 0.48]} rotation={[0, 0, -0.25]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#7A4C2A" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function SpectralWave() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        Array.from({ length: 26 }, (_, i) => {
          const x = -2.4 + i * 0.2;
          return new THREE.Vector3(x, Math.sin(i * 0.7) * 0.16 - 1.35, 0.42);
        })
      ),
    []
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, 96, 0.012, 8, false]} />
      <meshBasicMaterial color="#7ECDA2" transparent opacity={0.78} />
    </mesh>
  );
}

function ScanBeam() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.x = Math.sin(clock.getElapsedTime() * 1.3) * 1.25;
    ref.current.material.opacity = 0.18 + Math.abs(Math.sin(clock.getElapsedTime() * 1.3)) * 0.2;
  });

  return (
    <mesh ref={ref} position={[0, 0.03, 0.78]} rotation={[0, 0, -0.16]}>
      <boxGeometry args={[0.18, 3.2, 0.02]} />
      <meshBasicMaterial color="#B7E8C9" transparent opacity={0.24} />
    </mesh>
  );
}

function SeedHeroModel() {
  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}>
      <group>
        <Seed scale={1.1} />
        <ScanBeam />
        <SpectralWave />
        <mesh position={[0, -1.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.008, 16, 160]} />
          <meshBasicMaterial color="#7ECDA2" transparent opacity={0.28} />
        </mesh>
        <mesh position={[0, -1.55, 0]} rotation={[Math.PI / 2, 0, Math.PI / 5]}>
          <torusGeometry args={[1.9, 0.006, 16, 160]} />
          <meshBasicMaterial color="#8AA7B1" transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  );
}

export function SeedScene() {
  return (
    <Canvas camera={{ position: [0, 0.1, 5.4], fov: 44 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={2.3} />
      <directionalLight position={[-3, -2, 2]} color="#DDEFE5" intensity={1.5} />
      <pointLight position={[0, 1.5, 2]} color="#7ECDA2" intensity={2.1} />
      <SeedHeroModel />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.38} />
    </Canvas>
  );
}

function ConveyorSeeds() {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.children.forEach((child, index) => {
      child.position.x = -1.8 + ((clock.getElapsedTime() * 0.55 + index * 0.72) % 3.6);
      child.rotation.z += 0.01;
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2, 3, 4].map((item) => (
        <Seed key={item} position={[-1.8 + item * 0.72, -0.2, 0.35]} scale={0.16} speed={0.4} color={item % 2 ? '#986536' : '#B87945'} />
      ))}
    </group>
  );
}

export function SorterScene() {
  return (
    <Canvas camera={{ position: [0, 1, 5.5], fov: 46 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.35} />
      <directionalLight position={[4, 5, 4]} intensity={2.1} />
      <pointLight position={[-2, 1, 3]} color="#7ECDA2" intensity={1.8} />
      <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.2}>
        <group>
          <mesh position={[0, -0.5, 0]} scale={[2.9, 0.16, 0.75]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#EAF4EC" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.5, 0.15]} scale={[0.9, 0.6, 0.55]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#F9FCF8" roughness={0.24} metalness={0.04} />
          </mesh>
          <mesh position={[0, 0.52, 0.46]} scale={[0.58, 0.34, 0.02]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#CFEFDD" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.16, 0.52]} rotation={[0, 0, 0.03]}>
            <boxGeometry args={[0.08, 1.8, 0.02]} />
            <meshBasicMaterial color="#7ECDA2" transparent opacity={0.34} />
          </mesh>
          <ConveyorSeeds />
        </group>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.32} />
    </Canvas>
  );
}
