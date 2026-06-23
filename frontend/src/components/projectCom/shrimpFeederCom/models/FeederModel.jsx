import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural stylised shrimp-feeder: storage tank (hopper) on a frame, a
 * cone throat, and a rotating multi-blade splitter that flings feed pellets
 * outward in several directions.
 */
export default function FeederModel({ scale = 1 }) {
  const group = useRef();
  const splitter = useRef();

  const metal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9fb4c4',
        metalness: 0.95,
        roughness: 0.28,
      }),
    []
  );
  const accent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#22D3EE',
        emissive: '#0EA5E9',
        emissiveIntensity: 0.9,
        metalness: 0.6,
        roughness: 0.3,
      }),
    []
  );

  // Pellet streams flung outward by the splitter blades.
  const streams = useMemo(() => {
    const arr = [];
    const dirs = 5;
    for (let d = 0; d < dirs; d++) {
      const a = (d / dirs) * Math.PI * 2;
      for (let i = 0; i < 7; i++) {
        arr.push({ a, r: 0.5 + i * 0.32, drop: i * 0.16, key: `${d}-${i}` });
      }
    }
    return arr;
  }, []);
  const pelletRefs = useRef([]);

  useFrame((state, delta) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y += delta * 0.25;
      group.current.position.y = Math.sin(t * 0.8) * 0.12;
    }
    if (splitter.current) splitter.current.rotation.y += delta * 3.2;

    const t = state.clock.elapsedTime;
    streams.forEach((s, idx) => {
      const m = pelletRefs.current[idx];
      if (!m) return;
      const phase = (t * 0.9 + s.drop) % 1;
      const rad = 0.5 + phase * (s.r + 1.4);
      m.position.set(
        Math.cos(s.a) * rad,
        -0.2 - phase * 1.5,
        Math.sin(s.a) * rad
      );
      const sc = 0.06 * (1 - phase * 0.5);
      m.scale.setScalar(Math.max(sc, 0.01));
    });
  });

  return (
    <group ref={group} scale={scale} position={[0, 0, 0]}>
      {/* Support frame legs */}
      {[
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x * 0.95, -1.55, z * 0.95]} material={metal}>
          <boxGeometry args={[0.08, 1.8, 0.08]} />
        </mesh>
      ))}
      <mesh position={[0, -2.45, 0]} material={metal}>
        <boxGeometry args={[2.1, 0.08, 2.1]} />
      </mesh>

      {/* Storage tank / hopper body */}
      <mesh position={[0, 1.15, 0]} material={metal}>
        <cylinderGeometry args={[1.05, 1.05, 1.9, 48]} />
      </mesh>
      {/* Tank lid */}
      <mesh position={[0, 2.18, 0]} material={metal}>
        <cylinderGeometry args={[1.1, 1.1, 0.16, 48]} />
      </mesh>
      <mesh position={[0, 2.34, 0]} material={accent}>
        <cylinderGeometry args={[0.16, 0.16, 0.22, 24]} />
      </mesh>

      {/* Cone throat */}
      <mesh position={[0, -0.15, 0]} material={metal}>
        <cylinderGeometry args={[1.05, 0.28, 1, 48, 1, true]} />
      </mesh>
      {/* Glowing ring at the outlet */}
      <mesh position={[0, -0.62, 0]} material={accent}>
        <torusGeometry args={[0.3, 0.05, 16, 40]} />
      </mesh>

      {/* Rotating multi-direction splitter blades */}
      <group ref={splitter} position={[0, -0.85, 0]}>
        <mesh material={accent}>
          <cylinderGeometry args={[0.12, 0.12, 0.18, 20]} />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.42, 0, Math.sin(a) * 0.42]}
              rotation={[0, -a, 0.25]}
              material={metal}
            >
              <boxGeometry args={[0.62, 0.04, 0.26]} />
            </mesh>
          );
        })}
      </group>

      {/* Flung feed pellets */}
      {streams.map((s, i) => (
        <mesh
          key={s.key}
          ref={(el) => (pelletRefs.current[i] = el)}
          position={[0, -1, 0]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#d8b878"
            emissive="#22D3EE"
            emissiveIntensity={0.25}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
