import { Canvas as Canv } from "@react-three/fiber";

import React, { useRef } from "react";
import Earth from "./Earth";
import Lights from "./Lights";
import { Stats } from "@react-three/drei";
import ISS from "./Iss";
import { convertLongLatToXYZ } from "./Helpers";
import Camera from "./Camera";

const Canvas = () => {
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
  let ellipseArgs = [0, 0, x_radius, y_radius, 0, Math.PI * 2, false, 0];
  return (
    <Canv>
      <gridHelper args={[50, 6, "skyblue", "white"]} />
      <Camera />
      <Lights />
      <Earth />
      <ISS
        position={[0, 3, 0]}
        scale={[0.002, 0.002, 0.002]}
        rate={60}
        ellipseArgs={ellipseArgs}
        z={z}
      />
      <Stats />
    </Canv>
  );
};

export default Canvas;
