// 3d earth model component
import React from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { earthRadius } from "satellite.js/lib/constants";
import CloudsTexture from "../assets/textures/earth/8k_clouds.jpg";
import EarthTexture from "../assets/textures/earth/8k_earth_daymap.jpg";
import EarthNormalTexture from "../assets/textures/earth/8k_earth_normal_map.jpg";
import EarthSpecularTexture from "../assets/textures/earth/8k_earth_specular_map.jpg";

export default function Earth({ scale }) {
  function Sphere({ position, texture, radius }) {

    // console.log("rot", rotation);
    // console.log("pos", position);

    const [Earth, NormalEarth, SpecularEarth, Clouds] = useLoader(
      TextureLoader,
      [texture, EarthNormalTexture, EarthSpecularTexture, CloudsTexture]
    );

    return (
      <>
        {/* Earth texture */}
        <mesh position={position}  >
          <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
          <meshPhongMaterial
            map={Earth}
            normalMap={NormalEarth}
            specularMap={SpecularEarth}
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
    );
  }

  return (
    <>
      <Sphere
        position={[0, 0, 0]}
        texture={EarthTexture}
        radius={(earthRadius) / scale}
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