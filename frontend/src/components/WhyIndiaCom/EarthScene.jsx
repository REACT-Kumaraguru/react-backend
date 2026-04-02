import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export function Earth({ rotationY }) {
  const ref = useRef();
  const texture = useTexture("/8k_earth_daymap.jpg");

  useFrame(() => {
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      rotationY,
      0.1
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function CameraRig({ rotationY }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.lerp(
      new THREE.Vector3(Math.sin(rotationY) * 6, 2, Math.cos(rotationY) * 6),
      0.05
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function EarthScene({ rotationY }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Earth rotationY={rotationY} />
      <CameraRig rotationY={rotationY} />
    </Canvas>
  );
}
