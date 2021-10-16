import { PerspectiveCamera, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { CameraHelper } from "three";

const Camera = () => {
  const cameraRef = useRef();
  useHelper(cameraRef, CameraHelper, 1, "hotpink");
  return <PerspectiveCamera ref={cameraRef} />;
};

export default Camera;
