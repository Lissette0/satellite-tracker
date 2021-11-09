import ISS from "./Iss";
import Earth from "./Earth";
import SkyBox from "./SkyBox";
import Lights from "./Lights";
import Camera from "./Camera";
import Satellite from "./Satellite";
import { Stats, OrbitControls } from "@react-three/drei";
import { convertLongLatToXYZ } from "./Helpers";
import React, { useEffect, useState, useRef } from "react";
import { Canvas as Canv } from "@react-three/fiber";
import { earthRadius } from "satellite.js/lib/constants";

const Canvas = ({ sat }) => {
  function Point({ position }) {
    return (
      <mesh position={position}>
        <sphereGeometry attach="geometry" args={[0.024, 32, 32]} />
        <meshBasicMaterial attach="material" color="yellow" />
      </mesh>
    );
  }

  const [satData, setSatData] = useState([]);

  useEffect(() => {
    let url =
      "https://alanyu108-satellite-backend.herokuapp.com/api/satellites/page=1/";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        setSatData([...data]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const scale = 1000; // 1 unit = 1000km
  let cities = {
    LA: [34.052235, -118.243683],
    NY: [40.73061, -73.935242],
    PM: [51.478, 0],
    Toronto: [43.6532, -79.3832],
    Paris: [48.8566, 2.3522],
  };

  let coords = convertLongLatToXYZ(cities.NY[0], cities.NY[1], earthRadius);
  coords = coords.map((e) => e / scale);

  let iss_tle = {
    tle1: "1 25544U 98067A   21289.53582973  .00006882  00000-0  13428-3 0  9999",
    tle2: "2 25544  51.6432 102.7082 0004209 118.5037 316.3696 15.48711192307400",
  };
  const generateRandomColors = () => {
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    let colorLength = color.split("").length;
    if (colorLength !== 7) {
      for (let i = 0; i < 7 - colorLength; i++) {
        color += Math.floor(Math.random() * 10).toString();
      }
    }
    return color;
  };

  const colorsRef = useRef([]);
  let colors = [];
  for (let i = 0; i < satData.length; i++) {
    colors.push(generateRandomColors());
  }
  colorsRef.current = colors;





  return (
    <Canv camera={{ position: [0, 0, 15] }}>

      {/* <gridHelper args={[50, 6, "skyblue", "white"]} />
      <Camera /> */}
      <SkyBox />
      <Lights />
      <Earth scale={scale} />
      <Point position={coords} />
      <ISS
        scale={[0.005, 0.005, 0.005]}
        tle={iss_tle}
        timeWindow={30}
        pathColor={colorsRef.current[0]}
      />
      {sat &&
        !(
          Object.keys(sat).length === 0 &&
          Object.getPrototypeOf(sat) === Object.prototype
        ) ? (
        <Satellite
          tle1={sat.tle_1}
          tle2={sat.tle_2}
          scale={[0.00025, 0.00025, 0.00025]}
          rotation={[0, -Math.PI / 2, 0]}
          timeWindow={30}
          pathColor={colorsRef.current[0]}
        />
      ) : (
        <></>
      )}

      <OrbitControls
        enableZoom={true}
        enableRotate={true}
        enablePan={true}
        rotateSpeed={0.4}
      />

      {/* {satData.map((sat, i) => (
        <Satellite
          key={sat.name}
          tle1={sat.tle_1}
          tle2={sat.tle_2}
          scale={[0.00025, 0.00025, 0.00025]}
          rotation={[0, -Math.PI / 2, 0]}
          timeWindow={30}
          pathColor={colorsRef.current[i]}
        />
      ))} */}
      <Stats />
    </Canv>
  );
};

export default React.memo(Canvas);
