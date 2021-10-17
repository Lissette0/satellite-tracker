// 3d earth model component
import React from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { earthRadius } from "satellite.js/lib/constants";
import CloudsTexture from "../assets/textures/earth/8k_clouds.jpg";
import EarthTexture from "../assets/textures/earth/8k_earth_daymap.jpg";
import EarthNormalTexture from "../assets/textures/earth/8k_earth_normal_map.jpg";
import EarthSpecularTexture from "../assets/textures/earth/8k_earth_specular_map.jpg";

export default function Earth({ scale }) {
  function Sphere({ position, texture, radius, rotation }) {

    // console.log("rot", rotation);
    // console.log("pos", position);
    const [Earth, NormalEarth, SpecularEarth, Clouds] = useLoader(
      TextureLoader,
      [texture, EarthNormalTexture, EarthSpecularTexture, CloudsTexture]
    );
    return (
      <>
        {/* Earth texture */}
        <mesh position={position} rotation={rotation}>
          <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
          <meshPhongMaterial specularMap={SpecularEarth} />
          <meshStandardMaterial
            map={Earth}
            normalMap={NormalEarth}
            attach="material"
          />
        </mesh>

        {/* Clouds texture */}
        <mesh position={position} rotation={rotation}>
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

  return (
    <>
      <Sphere
        position={[0, 0, 0]}
        texture={EarthTexture}
        radius={(earthRadius - 1000) / scale}
        rotation={[23.4 * (Math.PI / 180), 0, 0]}
      />
      <OrbitControls
        enableZoom={true}
        enableRotate={true}
        enablePan={true}
        rotateSpeed={0.4}
      />
      {/* <pointLight
        color="#ffffff"
        intensity={1}
        distance={0}
        position={[0, 59333894, -137112541]}
      />
      <ambientLight color="#d1d63c" /> */}

    </>
  );
}