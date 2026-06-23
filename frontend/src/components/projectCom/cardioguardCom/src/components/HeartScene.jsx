import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const cardiacRed = '#D81E45';
const cardiacDeep = '#9F1239';
const vesselBlue = '#22B8CF';
const vesselPink = '#F77F9B';

function Vessel({ points, radius = 0.08, color = cardiacRed, opacity = 1 }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point))), [points]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 72, radius, 18, false]} />
      <meshStandardMaterial color={color} roughness={0.33} metalness={0.02} transparent opacity={opacity} />
    </mesh>
  );
}

function Coronary({ points, color = '#FFE5EC' }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point))), [points]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.018, 10, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.16} roughness={0.22} />
    </mesh>
  );
}

function Chamber({ position, rotation = [0, 0, 0], scale, color = cardiacRed }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.38}
        metalness={0.02}
        clearcoat={0.38}
        clearcoatRoughness={0.45}
        sheen={0.42}
        sheenColor="#FFB4C4"
      />
    </mesh>
  );
}

function AnatomicalHeart() {
  const group = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.y = -0.28 + Math.sin(t * 0.38) * 0.18;
    group.current.rotation.x = -0.08 + Math.sin(t * 0.24) * 0.04;
    const pulse = 1 + Math.sin(t * 2.8) * 0.025;
    group.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.35}>
      <group ref={group} scale={1.05} position={[0.05, -0.1, 0]}>
        <Chamber position={[-0.43, -0.36, 0.04]} rotation={[0.16, 0.03, -0.38]} scale={[0.72, 1.25, 0.58]} />
        <Chamber position={[0.43, -0.3, 0.01]} rotation={[0.08, -0.12, 0.34]} scale={[0.78, 1.12, 0.55]} color="#E3264E" />
        <Chamber position={[-0.35, 0.58, 0.02]} rotation={[0.15, 0.08, -0.16]} scale={[0.56, 0.5, 0.44]} color="#E94563" />
        <Chamber position={[0.36, 0.58, -0.01]} rotation={[0.16, -0.08, 0.18]} scale={[0.58, 0.52, 0.43]} color="#E83B5A" />
        <Chamber position={[0.04, -1.14, 0.02]} rotation={[0, 0, 0.1]} scale={[0.55, 0.65, 0.42]} color={cardiacDeep} />

        <Vessel
          color={vesselPink}
          radius={0.12}
          points={[
            [-0.12, 0.85, 0.02],
            [-0.22, 1.28, 0.04],
            [-0.02, 1.66, 0.0],
            [0.44, 1.78, -0.04],
            [0.74, 1.48, -0.02]
          ]}
        />
        <Vessel
          color={vesselBlue}
          radius={0.105}
          points={[
            [0.25, 0.82, -0.02],
            [0.56, 1.08, -0.06],
            [0.9, 1.28, -0.1],
            [1.14, 1.08, -0.08]
          ]}
        />
        <Vessel
          color={vesselBlue}
          radius={0.075}
          points={[
            [-0.48, 0.75, -0.04],
            [-0.85, 1.0, -0.08],
            [-1.12, 0.85, -0.02]
          ]}
        />
        <Vessel
          color={cardiacRed}
          radius={0.065}
          points={[
            [0.72, 0.42, 0.05],
            [1.05, 0.66, 0.02],
            [1.18, 0.38, 0.04]
          ]}
        />

        <Coronary
          points={[
            [-0.52, 0.34, 0.58],
            [-0.12, 0.18, 0.66],
            [0.38, 0.03, 0.56],
            [0.62, -0.42, 0.48],
            [0.2, -0.92, 0.44]
          ]}
        />
        <Coronary
          color="#FFD0DA"
          points={[
            [-0.2, 0.55, 0.57],
            [-0.42, 0.1, 0.61],
            [-0.52, -0.42, 0.52],
            [-0.28, -0.92, 0.43],
            [0.02, -1.3, 0.25]
          ]}
        />
        <Coronary
          color="#C8F4FB"
          points={[
            [0.22, 0.48, 0.56],
            [0.55, 0.18, 0.48],
            [0.82, -0.18, 0.34],
            [0.64, -0.58, 0.35]
          ]}
        />
      </group>
    </Float>
  );
}

function Rings() {
  const ring = useRef();
  useFrame(({ clock }) => {
    ring.current.rotation.z = clock.getElapsedTime() * 0.18;
  });

  return (
    <group ref={ring}>
      {[1.6, 2.15, 2.7].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2.4, 0, index * 0.4]}>
          <torusGeometry args={[radius, 0.006, 16, 160]} />
          <meshBasicMaterial color={index === 1 ? '#22B8CF' : '#F44E6A'} transparent opacity={0.24} />
        </mesh>
      ))}
    </group>
  );
}

export function HeartScene() {
  return (
    <Canvas camera={{ position: [0, 0.05, 6.2], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} />
      <directionalLight position={[-4, -2, 3]} color="#D7F8FF" intensity={1.5} />
      <pointLight position={[-3, -2, 4]} color="#22B8CF" intensity={2.4} />
      <pointLight position={[2, 1.8, 3]} color="#F44E6A" intensity={1.4} />
      <AnatomicalHeart />
      <Rings />
      <Sphere args={[0.055, 24, 24]} position={[2.35, 0.4, 0.3]}>
        <meshBasicMaterial color="#22B8CF" />
      </Sphere>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
    </Canvas>
  );
}

function Wearable() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.35;
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.45, 1.9, 0.22]} />
        <meshStandardMaterial color="#F8FCFF" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.13]}>
        <boxGeometry args={[1.1, 1.42, 0.04]} />
        <meshStandardMaterial color="#E8FAFF" emissive="#22B8CF" emissiveIntensity={0.12} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.24, 0.17]}>
        <torusGeometry args={[0.32, 0.012, 16, 100]} />
        <meshBasicMaterial color="#F44E6A" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -1.6, -0.02]}>
        <boxGeometry args={[0.7, 1.15, 0.12]} />
        <meshStandardMaterial color="#C8F4FB" roughness={0.26} />
      </mesh>
      <mesh position={[0, 1.6, -0.02]}>
        <boxGeometry args={[0.7, 1.15, 0.12]} />
        <meshStandardMaterial color="#C8F4FB" roughness={0.26} />
      </mesh>
    </group>
  );
}

export function WearableScene() {
  return (
    <Canvas camera={{ position: [0, 0.2, 5.2], fov: 45 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-2, 1, 3]} color="#F44E6A" intensity={1.8} />
      <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.55}>
        <Wearable />
      </Float>
      <Rings />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
    </Canvas>
  );
}
