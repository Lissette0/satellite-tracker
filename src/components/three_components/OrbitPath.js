import React, { useLayoutEffect, useRef, useEffect } from "react";
import { Tube } from "@react-three/drei";
import * as THREE from "three";
import { Line } from "three";
import { useUpdate } from "react-three-fiber";

function OrbitPath({ position, color, points, scale = 1 , show = true }) {
  console.log(show)
  const ref = useRef();
  useLayoutEffect(() => {
    if(show){
      ref.current.geometry.setFromPoints(points);
    }
  }, [points]);
  if(show){
    return (
    <line ref={ref} position={[0, 0, 0]}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial attach="material" color={color} />
    </line>
    )
  }else{
    return <></>
  }
  
}

export default OrbitPath;
