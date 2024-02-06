import React from 'react'
import { BackSide, MeshBasicMaterial, SphereGeometry } from 'three'

export default function Test() {
  return (
    <mesh scale={[-500, 500, 500]}>
      <SphereGeometry />
      <MeshBasicMaterial side={BackSide}>
        asd
      </MeshBasicMaterial>
    </mesh>
  )
}
