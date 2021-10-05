// 3d earth model component
import * as THREE from "three";
import React, { useRef, } from 'react'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import EllipticalOrbit from "./EllipticalOrbit";
import CloudsTexture from '../assets/textures/8k_clouds.jpg'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import EarthTexture from '../assets/textures/8k_earth_daymap.jpg'
import EarthNormalTexture from '../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularTexture from '../assets/textures/8k_earth_specular_map.jpg'

//lat = 0 long = 0 postion = [2, 0.15, -0.12]
// let lat = 0 * (Math.PI / 180) //north
// let long = 0 * (Math.PI / 180) // west

// let x = 2 * Math.cos(long) * Math.sin(lat)
// let y = 2 * Math.sin(long) * Math.sin(lat)
// let z = 2 * Math.cos(lat)
// let coords = [x + 2, y + 1.15, z - 2.12]

function Sphere({ position, texture, radius }) {
    const EarthMesh = useRef(null)
    const CloudsMesh = useRef(null)
    useFrame(() => {
        EarthMesh.current.rotation.y += 0.00
        CloudsMesh.current.rotation.y += 0.00
    })
    const [Earth, NormalEarth, SpecularEarth, Clouds] = useLoader(TextureLoader, [texture, EarthNormalTexture, EarthSpecularTexture, CloudsTexture])
    return (
        <>
            {/* Earth texture */}
            <mesh ref={EarthMesh} position={position}>
                <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
                <meshPhongMaterial specularMap={SpecularEarth} />
                <meshStandardMaterial
                    map={Earth}
                    normalMap={NormalEarth}
                    attach="material"
                />
            </mesh>

            {/* Clouds texture */}
            <mesh ref={CloudsMesh} position={position} >
                <sphereGeometry attach="geometry" args={[radius + 0.02, 32, 32]} />
                <meshPhongMaterial
                    map={Clouds}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>

    )
}

function Point({ position }) {
    return (
        <mesh position={position}>
            <sphereGeometry attach="geometry" args={[0.024, 32, 32]} />
            <meshBasicMaterial attach="material" color="red" />
        </mesh>
    )
}

export default function Earth() {
    return (
        <Canvas>
            <color attach="background" args={["black"]} />
            <ambientLight intensity={1} />
            <directionalLight color="#f6f3ea" intensity={2} position={[-3, 3, 3]} />
            <Sphere position={[0, 0, 0]} texture={EarthTexture} radius={2} />
            {/* <Point position={coords} /> */}
            <Point position={[0, 0, 0]} />
            <EllipticalOrbit position={[0, 0, 0]} radius={0.01} />
            <OrbitControls
                enableZoom={true}
                enableRotate={true}
                enablePan={true}
                rotateSpeed={0.4}
            />
        </Canvas>
    )
}
