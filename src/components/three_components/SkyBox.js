import React from 'react'
import { CubeTextureLoader } from "three";
import { useThree } from "@react-three/fiber";
import pz from "../assets/textures/sun/sun_pz.png";
import nx from "../assets/textures/sun/sun_nx.png";
import ny from "../assets/textures/sun/sun_ny.png";
import nz from "../assets/textures/sun/sun_nz.png";
import px from "../assets/textures/sun/sun_px.png";
import py from "../assets/textures/sun/sun_py.png";

const SkyBox = () => {
  //1celxdj1hva8, seed for sun skybox
  let { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([px, nx, py, ny, pz, nz]);
  scene.background = texture
  return null;
};

export default SkyBox
