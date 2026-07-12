"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Float, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

function FloatingOrb({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number]
  scale: number
  speed: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(Math.random() * 100)
  const prevTimeRef = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const delta = t - prevTimeRef.current
    prevTimeRef.current = t

    timeRef.current += delta * speed

    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(timeRef.current) * 0.3
    meshRef.current.rotation.x = timeRef.current * 0.3
    meshRef.current.rotation.y = timeRef.current * 0.5

    // Mouse parallax
    const { pointer } = state
    meshRef.current.position.x = position[0] + pointer.x * 0.3
    meshRef.current.position.z = position[2] + pointer.y * 0.1
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.1}
        roughness={0.4}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function GlassSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.y = t * 0.25
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.4
    meshRef.current.position.x = position[0] + state.pointer.x * 0.5
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={1.8}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.5}
          roughness={0.05}
          transmissionSampler
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 300
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7c3aed"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(true) // Start true to prevent mobile WebGL initialize

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) return null

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 3]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color="#6d28d9" />
        <pointLight position={[3, 4, -2]} intensity={0.8} color="#3b82f6" />
        <spotLight
          position={[0, 8, 0]}
          intensity={2}
          angle={0.4}
          penumbra={0.5}
          color="#7c3aed"
        />

        <Environment preset="night" />

        <GlassSphere position={[0, 0, 0]} />

        <FloatingOrb position={[-4, 1, -3]} scale={0.6} speed={0.8} color="#4c1d95" />
        <FloatingOrb position={[4.5, -1, -2]} scale={0.5} speed={1.2} color="#1e40af" />
        <FloatingOrb position={[-3, -2, -1]} scale={0.35} speed={1.5} color="#6d28d9" />
        <FloatingOrb position={[3, 2.5, -4]} scale={0.45} speed={0.9} color="#1d4ed8" />

        <ParticleField />
      </Canvas>
    </div>
  )
}
