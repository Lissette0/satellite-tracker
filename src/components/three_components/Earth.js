// 3d earth model component
import * as THREE from "three";
import React from 'react'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import EllipticalOrbit from "./EllipticalOrbit";
import CloudsTexture from '../assets/textures/8k_clouds.jpg'
import { Canvas, useLoader } from '@react-three/fiber'
import EarthTexture from '../assets/textures/8k_earth_daymap.jpg'
import EarthNormalTexture from '../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularTexture from '../assets/textures/8k_earth_specular_map.jpg'



function Sphere({ position, texture, radius, rotation }) {
    const [Earth, NormalEarth, SpecularEarth, Clouds] = useLoader(TextureLoader, [texture, EarthNormalTexture, EarthSpecularTexture, CloudsTexture])
    return (
        <>
            {/* Earth texture */}
            <mesh position={position} rotation={rotation} >
                <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
                <meshPhongMaterial specularMap={SpecularEarth} />
                <meshStandardMaterial
                    map={Earth}
                    normalMap={NormalEarth}
                    attach="material"
                />
            </mesh>

            {/* Clouds texture */}
            <mesh position={position} >
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
    // lat = 0 long = 0 postion = [2, 0.15, -0.12]
    //ny lat = 46.4128 long = 72.0060
    //r_earth = 6367 km


    function convertToXYZ(coords) {
        let [lat, long] = coords

        let latInRad = lat * (Math.PI / 180)
        let longInRad = -long * (Math.PI / 180)

        let x = 2 * Math.cos(latInRad) * Math.cos(longInRad)
        let y = 2 * Math.sin(longInRad) * Math.cos(latInRad)
        let z = 2 * Math.sin(latInRad)
        return [x, y, z]
    }

    let cities = {
        "LA": [34.052235, -118.243683],
        "NY": [40.730610, -73.935242],
        "PM": [0, 0],
        "Toronto": [43.6532, -79.3832],
        "Paris": [48.8566, 2.3522]
    }

    let coords = convertToXYZ(cities.Paris)
    console.log(coords)

    return (
        <Canvas>
            <color attach="background" args={["black"]} />
            <ambientLight intensity={1} />
            <directionalLight color="#f6f3ea" intensity={2} position={[-3, 3, 3]} />
            <Sphere position={[0, 0, 0]} texture={EarthTexture} radius={2} />
            <Point position={coords} />
            <Point position={[0, 2.5, 0]} />
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

// 