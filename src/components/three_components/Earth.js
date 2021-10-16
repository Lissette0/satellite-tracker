// 3d earth model component
import React, { useRef } from "react";
import * as THREE from "three";
import Satellite from "./Satellite";
import EllipticalOrbit from "./EllipticalOrbit";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CubeTextureLoader, TextureLoader } from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import CloudsTexture from "../assets/textures/earth/8k_clouds.jpg";
import EarthTexture from "../assets/textures/earth/8k_earth_daymap.jpg";
import EarthNormalTexture from "../assets/textures/earth/8k_earth_normal_map.jpg";
import EarthSpecularTexture from "../assets/textures/earth/8k_earth_specular_map.jpg";
import { SkyBox } from "./SkyBox";
import { convertLongLatToXYZ } from "./Helpers";
import { GridHelper } from "three";

import { earthRadius } from "satellite.js/lib/constants";

// import { earthRadius } from "satellite.js/lib/constants";

// import TestIss from "./TestIss";

import ISS from "./Iss";

export default function Earth({ scale }) {
  function Sphere({ position, texture, radius, rotation }) {
    const sphereRef = useRef();
    const cloudRef = useRef();
    // const groupRef = useRef();

    // useFrame((state) => {
    //     state.camera.lookAt(0, 0, 0);
    // });
    // console.log("rot", rotation);
    // console.log("pos", position);
    const [Earth, NormalEarth, SpecularEarth, Clouds] = useLoader(
      TextureLoader,
      [texture, EarthNormalTexture, EarthSpecularTexture, CloudsTexture]
    );
    return (
      <>
        {/* Earth texture */}
        <mesh ref={sphereRef} position={position} rotation={rotation}>
          <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
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
      </>
    );
  }

  SkyBox();

  function Point({ position }) {
    return (
      <mesh position={position}>
        <sphereGeometry attach="geometry" args={[0.024, 32, 32]} />
        <meshBasicMaterial attach="material" color="red" />
      </mesh>
    );
  }

  let cities = {
    LA: [34.052235, -118.243683],
    NY: [40.73061, -73.935242],
    PM: [51.478, 0],
    Toronto: [43.6532, -79.3832],
    Paris: [48.8566, 2.3522],
  };
  let coords = convertLongLatToXYZ(cities.Paris[0], cities.Paris[1], 2);
  // center_x, center_y, x_radius, y_radius, aStartAngle, aEndAngle, aClockwise, aRotation
  let ecc = 0.00172;
  let y_radius = 3;
  let x_radius = Math.sqrt(Math.pow(y_radius, 2) / (1 - Math.pow(ecc, 2)));
  let z = 0;

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
    <>
      <SkyBox />
      <Sphere
        position={[0, 0, 0]}
        texture={EarthTexture}
        radius={earthRadius / scale}
        rotation={[23.4 * (Math.PI / 180), 0, 0]}
      />
      <Point position={coords} />
      {/* <TestIss /> */}
      {/* <EllipticalOrbit
           position={[0, 0, 0]}
           radius={0.01}
           ellipseArgs={ellipseArgs}
           z={z}
           /> */}
      {/* <Satellite
           scale={[0.02, 0.02, 0.02]}
           rate={60}
           ellipseArgs={ellipseArgs}
           z={z}
           /> */}
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
    </>
  );
}

//
