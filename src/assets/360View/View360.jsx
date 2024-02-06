import React, { useRef, useState } from 'react'
import  i from './../../assets/nature.jpg'
import  i2 from './../../assets/carage.jpg'
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { OrbitControls, TransformControls } from '@react-three/drei'
import { PerspectiveCamera } from '@react-three/drei'
import { BackSide } from "three";

function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
      castShadow
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => {
          props.onPress()
          setActive(!active)
        }}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }



export default function View360() {
    const colorMap = useLoader(TextureLoader, i)
    const colorMap2 = useLoader(TextureLoader, i2)
    const [bool , setBool] = useState(true)
  return (
    <Canvas>
    <OrbitControls target={bool  ? [0,0,0] : [2,0,0]} enableDamping/>
    <PerspectiveCamera makeDefault position={bool ? [0.1 ,0 , 0] : [2.1 ,0 , 0]}  />
    <Box position={[1 ,0,0]} onPress={() => {
        setBool(prev => !prev)
    }}/>
    <ambientLight intensity={1} />
    <mesh position={[0,0,0]} receiveShadow>
    <sphereGeometry args={[1, 100]} />
    <meshStandardMaterial map={colorMap}  side={BackSide} />
    </mesh>
    <mesh position={[2,0,0]} receiveShadow>
    <sphereGeometry  args={[1, 100]} />
    <meshStandardMaterial map={colorMap2}  side={BackSide} />
    </mesh>
  </Canvas>
  )
}
