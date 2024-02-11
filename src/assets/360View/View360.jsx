import React, { useEffect, useRef, useState } from 'react'
import i1 from './../../assets/11.jpg'
import i2 from './../../assets/12.jpg'
import i3 from './../../assets/13.jpg'
import i4 from './../../assets/14.jpg'
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
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      castShadow
      {...props}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        props.onPress()
        setActive(!active)
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[0.07, 0.07, 0.07]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}



export default function View360() {

  const colorMap1 = useLoader(TextureLoader, i1)
  const colorMap2 = useLoader(TextureLoader, i2)
  const colorMap3 = useLoader(TextureLoader, i3)
  const colorMap4 = useLoader(TextureLoader, i4)

  const images = [
    {
      image: colorMap1,
      childrens: [
        {
          id: 1,
          type: 'front',
          child: 1
        },
      ]

    },
    {
      image: colorMap2,
      childrens: [
        {
          id: 1,
          type: 'back',
          child: 2
        },
        {
          id: 2,
          type: 'front',
          child: 0
        },
        {
          id: 3,
          type: 'top',
          child: 1
        },
      ]
    },
    {
      image: colorMap3,
      childrens: [
        {
          id: 1,
          type: 'back',
          child: 3
        },
        {
          id: 2,
          type: 'front',
          child: 1
        },
      ]
    },
    {
      id: 4,
      image: colorMap4,
      childrens: [
        {
          id: 1,
          type: 'back',
          child: 0
        },
        {
          id: 2,
          type: 'front',
          child: 2
        },
      ]
    },
  ]
  const [counter, setCounter] = useState(0)
  const [colorMap, setColorMap] = useState(null)
  const [boxes, setBoxes] = useState([])
  useEffect(() => {
    const boxes = []
    for (let i = 0; i < images[counter].childrens.length; i++) {
      switch (images[counter].childrens[i].type) {
        case 'front':
          boxes.push(
            <Box key={images[counter].childrens[i].id} position={[0.9, -0.4, 0]} onPress={() => {
              setCounter(images[counter].childrens[i].child)
            }} />
          )
          break;
        case 'back':
          boxes.push(
            <Box key={images[counter].childrens[i].id} position={[-0.9, -0.4, 0]} onPress={() => {
              console.log('images[counter].childrens[i].child : ' , images[counter].childrens[i]);
              setCounter(images[counter].childrens[i].child)
            }} />
          )
          break;
        case 'left':
          boxes.push(
            <Box key={images[counter].childrens[i].id} position={[0, -0.4, -0.9]} onPress={() => {
              setCounter(images[counter].childrens[i].child)
            }} />
          )
          break;
        case 'right':
          boxes.push(
            <Box key={images[counter].childrens[i].id} position={[0, -0.4, 0.9]} onPress={() => {
              setCounter(images[counter].childrens[i].child)
            }} />
          )
          break;
        case 'top':
          boxes.push(
            <Box key={images[counter].childrens[i].id} position={[0, 1, 0]} onPress={() => {
              setCounter(images[counter].childrens[i].child)
            }} />
          )
          break;
        case 'bottom':
          boxes.push(
            <Box key={images[counter].childrens[i].id} position={[0, -1, 0]} onPress={() => {
              setCounter(images[counter].childrens[i].child)
            }} />
          )
          break;
      }

    }
    setBoxes(boxes)
    setColorMap(images[counter].image)
  }, [counter])

  console.log(counter);

  return (
    <Canvas>
      <OrbitControls target={[0, 0, 0]} enableDamping />
      <PerspectiveCamera makeDefault position={[0.1, 0, 0]} />
      {
        boxes
      }
      <ambientLight intensity={1} />

      <mesh position={[0, 0, 0]} receiveShadow>
        <sphereGeometry args={[1, 100]} />
        <meshStandardMaterial map={images[counter].image} side={BackSide} />
      </mesh>

    </Canvas>
  )
}
