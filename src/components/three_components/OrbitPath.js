import React from "react";
import { Tube } from "@react-three/drei";
import * as THREE from "three";

function OrbitPath({ position, radius, color = "#f3f3f3", points }) {
  if (points) {
    let curve = new THREE.CatmullRomCurve3(points);
    return (
      //path, tubular_segments, radius, radial_segments, closed
      <Tube args={[curve, 256, radius, 8, false]} position={position}>
        <meshPhongMaterial attach="material" color={color} wireframe />
      </Tube>
    );
  }
  return <></>;
}

export default OrbitPath;
