import { Canvas as Canv } from "@react-three/fiber";

import React, { useRef } from "react";
import Earth from "./Earth";
import Lights from "./Lights";
import { Stats } from "@react-three/drei";
import ISS from "./Iss";
import { convertLongLatToXYZ } from "./Helpers";
import Camera from "./Camera";
import Satellite from "./Satellite";

const Canvas = () => {
  const scale = 1000; // 1 unit = 1000km
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
  const sampleTleArr = [
    {
      tle1: "1 43556U 18046C   21289.26262847  .00006255  00000-0  20632-3 0  9995",
      tle2: "2 43556  51.6395 286.8921 0006688 236.6442 123.3900 15.32725612181805",
    },
    {
      tle1: "1 43558U 18046E   21289.23169307  .00008239  00000-0  24644-3 0  9992",
      tle2: "2 43558  51.6398 277.1846 0005532 245.9782 114.0622 15.35416029181929",
    },
    {
      tle1: "1 44428U 98067QN  21288.52241116  .01598378  22432-2  10353-2 0  9995",
      tle2: "2 44428  51.6232  22.9012 0011257 345.7432  14.3266 16.17064659130666",
    },
    {
      tle1: "1 45263U 98067RG  21288.96671182  .00062048  00000-0  51056-3 0  9991",
      tle2: "2 45263  51.6354  72.7690 0005309 342.7317  17.3498 15.69781269 94213",
    },
    {
      tle1: "1 46924U 98067RU  21289.14421299  .00108336  00000-0  84022-3 0  9999",
      tle2: "2 46924  51.6347  81.4950 0003990 273.2112  86.8429 15.70978193 53789",
    },
    {
      tle1: "1 47927U 98067SD  21288.86017506  .00018792  00000-0  28731-3 0  9994",
      tle2: "2 47927  51.6404 101.3903 0001888 134.8128 225.3016 15.54426488 33484",
    },
    {
      tle1: "1 49276U 98067SV  21288.55291584  .00015340  00000-0  28072-3 0  9993",
      tle2: "2 49276  51.6408 107.5472 0006095 140.5213 219.6221 15.49527152   572",
    },
  ];
  return (
    <Canv>
      <gridHelper args={[50, 6, "skyblue", "white"]} />
      <Camera />
      <Lights />
      <Earth scale={scale} />
      <ISS
        position={[0, 8, 0]}
        scale={[0.001, 0.001, 0.001]}
        rate={60}
        ellipseArgs={ellipseArgs}
        z={z}
      />
      {sampleTleArr.map((tle) => (
        <Satellite key={tle.tle1} tle1={tle.tle1} tle2={tle.tle2} />
      ))}
      <Stats />
    </Canv>
  );
};

export default Canvas;
