// 3d earth model component
import * as THREE from "three";
import React, { useRef } from 'react'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import CloudsTexture from './assets/textures/8k_clouds.jpg'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import EarthTexture from './assets/textures/8k_earth_daymap.jpg'
import EarthNormalTexture from './assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularTexture from './assets/textures/8k_earth_specular_map.jpg'



function Sphere({ position, texture, radius }) {
    const EarthMesh = useRef(null)
    const CloudsMesh = useRef(null)
    useFrame(() => {
        EarthMesh.current.rotation.y += 0.001
        CloudsMesh.current.rotation.y += 0.001
    })
    const [Earth, NormalEarth, SpecularEarth, Clouds] = useLoader(TextureLoader, [texture, EarthNormalTexture, EarthSpecularTexture, CloudsTexture])
    return (
        <>
            {/* Earth texture */}
            <mesh ref={EarthMesh} position={position}>
                <ambientLight intensity={0.5} />
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
                <sphereGeometry attach="geometry" args={[radius + 0.04, 32, 32]} />
                <meshPhongMaterial
                    map={Clouds}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <OrbitControls
                enableZoom={true}
                enableRotate={true}
                enablePan={true}
                rotateSpeed={0.4}
            />
        </>

    )
}

export default function Earth() {
    return (
        <Canvas>
            <color attach="background" args={["black"]} />
            <directionalLight color="#f6f3ea" intensity={2} position={[0, 0, -3]} />
            <Sphere position={[0, 1, 0]} texture={EarthTexture} radius={2} />
        </Canvas>
    )
}
