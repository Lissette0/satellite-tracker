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
import Satellite from "./Satellite"

export default function Earth() {
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

    function convertLongLatToXYZ(lat, long, radius) {
        let latInRad = (90 - lat) * (Math.PI / 180)
        let longInRad = (long + 180) * (Math.PI / 180)

        let x = -((radius) * Math.sin(latInRad) * Math.cos(longInRad))
        let y = ((radius) * Math.cos(latInRad))
        let z = ((radius) * Math.sin(latInRad) * Math.sin(longInRad))


        return [x, y, z]
    }

    let cities = {
        "LA": [34.052235, -118.243683],
        "NY": [40.730610, -73.935242],
        "PM": [51.4780, 0],
        "Toronto": [43.6532, -79.3832],
        "Paris": [48.8566, 2.3522]
    }
    let coords = convertLongLatToXYZ(cities.NY[0], cities.NY[1], 2)
    let ellipseArgs = [0, 0, 2.5, 2.5, 0, 2 * Math.PI, false, Math.PI / 2]

    return (
        <Canvas>
            <color attach="background" args={["black"]} />
            <ambientLight intensity={0.5} />
            <directionalLight color="#f6f3ea" intensity={2} position={[-3, 3, 3]} />
            <Sphere position={[0, 0, 0]} texture={EarthTexture} radius={2} />
            <Point position={coords} />
            {/* <EllipticalOrbit position={[0, 0, 0]} radius={0.01} ellipseArgs={ellipseArgs} /> */}
            <Satellite scale={[0.15, 0.15, 0.15]} rate={60} ellipseArgs={ellipseArgs} />
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