import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Sheet() {
  const group = useRef()
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(4.4, 2.2, 48, 18)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(i, Math.sin(x * 1.4) * 0.08 + Math.cos(y * 2.1) * 0.035)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame(({ clock, pointer }) => {
    if (!group.current) return
    group.current.rotation.x = -0.64 + pointer.y * 0.11
    group.current.rotation.y = 0.35 + pointer.x * 0.18
    group.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.08
  })

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={group} rotation={[-0.64, 0.35, -0.12]}>
        <mesh geometry={geometry}>
          <MeshTransmissionMaterial
            color="#f4c28d"
            roughness={0.38}
            thickness={0.22}
            transmission={0.5}
            opacity={0.86}
            transparent
          />
        </mesh>
        <mesh position={[0, -0.08, -0.035]} scale={[0.94, 0.92, 1]} geometry={geometry}>
          <meshStandardMaterial color="#b85f42" roughness={0.72} metalness={0.05} />
        </mesh>
        <mesh position={[0, -0.16, -0.08]} scale={[0.88, 0.86, 1]} geometry={geometry}>
          <meshStandardMaterial color="#dcd4c4" roughness={0.5} metalness={0.35} />
        </mesh>
      </group>
    </Float>
  )
}

export function ThermalSheetScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 36 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <pointLight position={[-3, -2, 3]} intensity={0.55} color="#bd6b4c" />
      <Sheet />
      <Environment preset="city" />
    </Canvas>
  )
}
