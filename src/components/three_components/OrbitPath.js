import React from 'react'
import { Tube } from '@react-three/drei'
import * as THREE from "three"
import { getPoints } from './Helpers'


function OrbitPath({ position, radius, tle, minutes, color }) {
    let curve = new THREE.CatmullRomCurve3(getPoints(minutes, tle))
    return (
        //path, tubular_segments, radius, radial_segments, closed
        <Tube args={[curve, 256, radius, 8, false]} position={position}>
            <meshPhongMaterial attach="material" color={color} wireframe />
        </Tube>

    )

}

export default OrbitPath