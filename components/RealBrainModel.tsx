'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function RealBrainModel({ url, isProcessing = false }: { url: string, isProcessing?: boolean }) {
  const brainRef = useRef<any>(null)
  const timeRef = useRef(0)

  // Carregar o modelo 3D
  const { scene } = useGLTF(url)

  // Clonar a cena para evitar conflitos
  const clonedScene = scene.clone()

  // Aplicar materiais neon detalhados ao modelo
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      // Material principal do cérebro
      child.material = new THREE.MeshStandardMaterial({
        color: '#00D4FF',
        transparent: true,
        opacity: 0.9,
        emissive: '#00D4FF',
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.2
      })
      
      // Adicionar detalhes de superfície
      child.geometry.computeVertexNormals()
    }
  })

  useFrame((state, delta) => {
    timeRef.current += delta
    if (brainRef.current) {
      const speed = isProcessing ? 0.25 : 0.12
      const intensity = isProcessing ? 0.05 : 0.01
      brainRef.current.rotation.y = timeRef.current * speed
      brainRef.current.rotation.x = Math.sin(timeRef.current * 0.03) * intensity
      brainRef.current.position.y = Math.sin(timeRef.current * 0.05) * intensity
    }
  })

  return (
    <group>
      {/* Modelo Principal do Cérebro */}
      <primitive 
        ref={brainRef} 
        object={clonedScene} 
        scale={[3.5, 3.5, 3.5]}
        position={[0, 0, 0]}
      />
      
      {/* Sistema Neural Simplificado */}
      <SimpleNeuralSystem isProcessing={isProcessing} />
      
    </group>
  )
}

// Sistema Neural Simplificado
function SimpleNeuralSystem({ isProcessing = false }: { isProcessing?: boolean }) {
  const systemRef = useRef<any>(null)
  
  useFrame((state) => {
    if (systemRef.current) {
      const speed = isProcessing ? 0.15 : 0.08
      systemRef.current.rotation.y = state.clock.elapsedTime * speed
    }
  })

  return (
    <group ref={systemRef}>
      {/* Nós neurais com animação intensa durante processamento */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 4.5 + (isProcessing ? Math.sin(i * 0.5) * 0.5 : 0)
        const height = Math.sin(angle * 2) * 0.5
        
        return (
          <NeuralNode 
            key={`node-${i}`}
            index={i}
            angle={angle}
            radius={radius}
            height={height}
            isProcessing={isProcessing}
          />
        )
      })}
      
      {/* Conexões com pulso durante processamento */}
      {Array.from({ length: 15 }, (_, i) => {
        const angle1 = (i / 15) * Math.PI * 2
        const angle2 = ((i + 3) / 15) * Math.PI * 2
        const radius = 4.5
        
        const start = new THREE.Vector3(
          Math.cos(angle1) * radius,
          Math.sin(angle1 * 2) * 0.3,
          Math.sin(angle1) * radius * 0.7
        )
        
        const end = new THREE.Vector3(
          Math.cos(angle2) * radius,
          Math.sin(angle2 * 2) * 0.3,
          Math.sin(angle2) * radius * 0.7
        )
        
        return (
          <line key={`connection-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  start.x, start.y, start.z,
                  end.x, end.y, end.z
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color={isProcessing ? "#EC4899" : "#8B5CF6"}
              transparent 
              opacity={isProcessing ? 0.8 : 0.3}
            />
          </line>
        )
      })}
      
      {/* Partículas adicionais durante processamento */}
      {isProcessing && Array.from({ length: 30 }, (_, i) => (
        <ProcessingParticle key={`particle-${i}`} index={i} />
      ))}
    </group>
  )
}

// Componente separado para nós neurais
function NeuralNode({ index, angle, radius, height, isProcessing }: { 
  index: number, 
  angle: number, 
  radius: number, 
  height: number, 
  isProcessing: boolean 
}) {
  const nodeRef = useRef<any>(null)
  
  useFrame((state) => {
    if (nodeRef.current) {
      const time = state.clock.elapsedTime
      if (isProcessing) {
        // Animação intensa durante processamento
        const pulse = Math.sin(time * 6 + index * 0.3) * 0.4 + 0.6
        const wave = Math.sin(time * 3 + index * 0.2) * 0.3
        nodeRef.current.material.emissiveIntensity = pulse * 1.2
        nodeRef.current.scale.setScalar(1 + pulse * 0.4 + wave * 0.2)
        
        // Movimento orbital durante processamento
        const orbitAngle = angle + time * 0.5
        nodeRef.current.position.x = Math.cos(orbitAngle) * radius
        nodeRef.current.position.z = Math.sin(orbitAngle) * radius * 0.7
      } else {
        // Animação suave quando não processando
        const pulse = Math.sin(time * 2 + index * 0.5) * 0.2 + 0.8
        nodeRef.current.material.emissiveIntensity = pulse * 0.4
        nodeRef.current.scale.setScalar(1 + pulse * 0.1)
      }
    }
  })
  
  return (
    <mesh
      ref={nodeRef}
      position={[
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius * 0.7
      ]}
    >
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial
        color={isProcessing ? "#00FFFF" : "#8B5CF6"}
        transparent
        opacity={isProcessing ? 0.9 : 0.6}
        emissive={isProcessing ? "#00FFFF" : "#8B5CF6"}
        emissiveIntensity={isProcessing ? 0.8 : 0.3}
      />
    </mesh>
  )
}

// Componente separado para partículas de processamento
function ProcessingParticle({ index }: { index: number }) {
  const particleRef = useRef<any>(null)
  
  useFrame((state) => {
    if (particleRef.current) {
      const time = state.clock.elapsedTime
      const speed = 2 + (index % 3)
      const pulse = Math.sin(time * speed + index * 0.2) * 0.5 + 0.5
      
      particleRef.current.material.opacity = pulse * 0.6
      particleRef.current.scale.setScalar(pulse * 0.5 + 0.3)
      
      // Movimento circular
      const angle = time * 0.8 + index * 0.3
      const radius = 6 + Math.sin(time * 0.5 + index * 0.1) * 1
      particleRef.current.position.x = Math.cos(angle) * radius
      particleRef.current.position.y = Math.sin(time * 0.3 + index * 0.2) * 2
      particleRef.current.position.z = Math.sin(angle) * radius * 0.8
    }
  })
  
  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshStandardMaterial
        color="#00D4FF"
        transparent
        opacity={0.4}
        emissive="#00D4FF"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

export default RealBrainModel