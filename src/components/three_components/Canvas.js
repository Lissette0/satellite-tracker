import ISS from "./Iss";
import React, { useEffect, useState } from "react";
import Earth from "./Earth";
import SkyBox from './SkyBox'
import Lights from "./Lights";
import Camera from "./Camera";
import Satellite from "./Satellite";
import { Stats } from "@react-three/drei";
import { convertLongLatToXYZ } from "./Helpers";
import { Canvas as Canv } from "@react-three/fiber";
import { earthRadius } from "satellite.js/lib/constants";

const Canvas = () => {

  function Point({ position }) {
    return (
      <mesh position={position}>
        <sphereGeometry attach="geometry" args={[0.024, 32, 32]} />
        <meshBasicMaterial attach="material" color="yellow" />
      </mesh>
    );
  }

  const [satData, setSatData] = useState([])


  useEffect(() => {
    let url = "https://alanyu108-satellite-backend.herokuapp.com/api/satellites/pag/"
    fetch(url)
      .then((res) => {
        if (res.status === 200)
          return res.json()
      })
      .then((data) => {
        setSatData([...data]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [])


  const scale = 1000; // 1 unit = 1000km
  let cities = {
    LA: [34.052235, -118.243683],
    NY: [40.73061, -73.935242],
    PM: [51.478, 0],
    Toronto: [43.6532, -79.3832],
    Paris: [48.8566, 2.3522],
  };

  let coords = convertLongLatToXYZ(cities.NY[0], cities.NY[1], earthRadius);
  coords = coords.map((e) => (e / scale))

  return (
    <Canv camera={{ position: [0, 0, 15] }}>
      <gridHelper args={[50, 6, "skyblue", "white"]} />
      <Camera />
      <SkyBox />
      <Lights />
      <Earth scale={scale} />
      <Point position={coords} />
      <ISS
        scale={[0.005, 0.005, 0.005]}
      />

      {satData.map((sat) => (
        <Satellite
          key={sat.name}
          tle1={sat.tle_1}
          tle2={sat.tle_2}
          scale={[0.00025, 0.00025, 0.00025]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}



      <Stats />
    </Canv>
  );
};

export default Canvas;
