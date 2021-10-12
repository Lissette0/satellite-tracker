// 3d earth model component
import React, { useRef } from "react";
import * as THREE from "three";
import Satellite from "./Satellite";
import EllipticalOrbit from "./EllipticalOrbit";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import pz from "../assets/textures/sun/sun_pz.png";
import nx from "../assets/textures/sun/sun_nx.png";
import ny from "../assets/textures/sun/sun_ny.png";
import nz from "../assets/textures/sun/sun_nz.png";
import px from "../assets/textures/sun/sun_px.png";
import py from "../assets/textures/sun/sun_py.png";
import { CubeTextureLoader, TextureLoader } from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import CloudsTexture from "../assets/textures/earth/8k_clouds.jpg";
import EarthTexture from "../assets/textures/earth/8k_earth_daymap.jpg";
import EarthNormalTexture from "../assets/textures/earth/8k_earth_normal_map.jpg";
import EarthSpecularTexture from "../assets/textures/earth/8k_earth_specular_map.jpg";
import { Stats } from "@react-three/drei";
import { earthRadius } from "satellite.js/lib/constants";


import TestIss from "./TestIss";

//import Iss from "./Iss";

export default function Earth() {
    function SkyBox() {
        //1celxdj1hva8, seed for sun skybox
        let { scene } = useThree();
        const loader = new CubeTextureLoader();
        const texture = loader.load([px, nx, py, ny, pz, nz]);
        scene.background = texture;
        return null;
    }

    function Point({ position }) {
        return (
            <mesh position={position}>
                <sphereGeometry attach="geometry" args={[0.024, 32, 32]} />
                <meshBasicMaterial attach="material" color="red" />
            </mesh>
        );
    }

    function convertLongLatToXYZ(lat, long, radius) {
        let latInRad = (90 - lat) * (Math.PI / 180);
        let longInRad = (long + 180) * (Math.PI / 180);

        let x = -(radius * Math.sin(latInRad) * Math.cos(longInRad));
        let y = radius * Math.cos(latInRad);
        let z = radius * Math.sin(latInRad) * Math.sin(longInRad);

        return [x, y, z];
    }

    let cities = {
        LA: [34.052235, -118.243683],
        NY: [40.73061, -73.935242],
        PM: [51.478, 0],
        Toronto: [43.6532, -79.3832],
        Paris: [48.8566, 2.3522],
    };
    let coords = convertLongLatToXYZ(cities.NY[0], cities.NY[1], 2);
    // center_x, center_y, x_radius, y_radius, aStartAngle, aEndAngle, aClockwise, aRotation
    let ecc = 0.00172;
    let y_radius = 3;
    let x_radius = Math.sqrt(Math.pow(y_radius, 2) / (1 - Math.pow(ecc, 2)));
    let ellipseArgs = [0, 0, x_radius, y_radius, 0, Math.PI * 2, false, 0];
    let z = 0;


    function Sphere({ position, texture, radius, rotation }) {
        const sphereRef = useRef();
        const cloudRef = useRef();
        const groupRef = useRef();

        useFrame((state) => {
            state.camera.lookAt(0, 0, 0);
        });
        console.log("rot", rotation);
        console.log("pos", position);
        const [Earth, NormalEarth, SpecularEarth, Clouds] = useLoader(
            TextureLoader,
            [texture, EarthNormalTexture, EarthSpecularTexture, CloudsTexture]
        );
        return (
            <group ref={groupRef}>
                {/* Earth texture */}
                <mesh ref={sphereRef} position={position} rotation={rotation}>
                    <sphereGeometry attach="geometry" args={[radius, 50, 50]} />
                    <meshPhongMaterial specularMap={SpecularEarth} />
                    <meshStandardMaterial
                        map={Earth}
                        normalMap={NormalEarth}
                        attach="material"
                    />
                </mesh>

                {/* Clouds texture */}
                <mesh ref={cloudRef} position={position} rotation={rotation}>
                    <sphereGeometry attach="geometry" args={[radius + 0.02, 32, 32]} />
                    <meshPhongMaterial
                        map={Clouds}
                        opacity={0.4}
                        depthWrite={true}
                        transparent={true}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>
        );
    }

    // const TestSphere = () => {
    //     return (
    //         <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
    //             <sphereGeometry attach="geometry" args={[earthRadius, 50, 50]} />
    //             <meshNormalMaterial attach="material" />
    //         </mesh>
    //     );
    // };
    // const TestSphere = () => {
    //     return (
    //       <mesh>
    //         position={[0,0,0]} rotation={[0,0,0]}>
    //         <sphereGeometry attach="geometry" args={[earthRadius, 50, 50]} />
    //         <meshPhongMaterial />
    //         <meshStandardMaterial
    //           map={Earth}
    //           normalMap={NormalEarth}
    //           attach="material"
    //         />
    //       </mesh>
    //     );
    //   };

    return (
        <Canvas>
            <SkyBox />
            <Sphere
                position={[0, 0, 0]}
                texture={EarthTexture}
                radius={2}
                rotation={[23.4 * (Math.PI / 180), 0, 0]}
            />
            <directionalLight color="#f6f3ea" intensity={1.3} position={[-3, 3, 3]} />
            <Point position={coords} />
            <Satellite
                scale={[0.02, 0.02, 0.02]}
                rate={60}
                ellipseArgs={ellipseArgs}
                z={z}
            />
            <TestIss />

            <EllipticalOrbit
                position={[0, 0, 0]}
                radius={0.01}
                ellipseArgs={ellipseArgs}
                z={z}
            />
            {/*                     
            <pointLight
                color="#ffffff"
                intensity={1}
                distance={0}
                position={[0, 59333894, -137112541]}
            />
            <ambientLight color="#d1d63c" />
            <TestSphere /> */}

            <OrbitControls
                enableZoom={true}
                enableRotate={true}
                enablePan={true}
                rotateSpeed={0.4}
            />
            <Stats />
        </Canvas>
    );
}

//
