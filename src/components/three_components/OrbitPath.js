import React, { useLayoutEffect, useRef, useEffect } from "react";
import { Tube } from "@react-three/drei";
import * as THREE from "three";
import { Line } from "three";
import { useUpdate } from "react-three-fiber";

function OrbitPath({ position, color = "#f3f3f3", points, scale = 1 }) {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints(points);
  }, [points]);
  return (
    //path, tubular_segments, radius, radial_segments, closed

    //<Tube args={[curve, 256, radius, 8, false]} position={position}>
    // <meshPhongMaterial attach="material" color={color} wireframe />
    //</Tube>
    <line ref={ref} position={[0, 0, 0]}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial attach="material" color={color} />
    </line>
  );
}

export default OrbitPath;
