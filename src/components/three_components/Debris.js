import React, { useRef, useEffect, useState } from "react";
import * as satellite from "satellite.js";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";
import { useInterval, getPoints, getRandomColor } from "./Helpers";

export default function Satellite({
  tle1,
  tle2,
  scale,
  rotation,
  timeWindow,
}) {

  const debrisRef = useRef();
  console.log(debrisRef);
  let satelliteRecord = satellite.twoline2satrec(tle1, tle2);
  let positionAndVelocity = satellite.propagate(satelliteRecord, new Date());
  let positionEci = positionAndVelocity.position;
  console.log(positionAndVelocity)

  useFrame(({clock}) => {
    let pos = [];
    satelliteRecord = satellite.twoline2satrec(tle1, tle2);
    positionAndVelocity = satellite.propagate(satelliteRecord, new Date());
    positionEci = positionAndVelocity.position;

    let gmst = satellite.gstime(new Date());
    if (Math.ceil(Math.round(clock.getElapsedTime(),8)) % 5 === 0 && debrisRef.current !== undefined && typeof positionEci !== "undefined") {
      let positionGd = satellite.eciToGeodetic(positionEci, gmst);

      // Geodetic coords are accessed via `longitude`, `latitude`,
      let longitude = satellite.degreesLong(positionGd.longitude);
      let latitude = satellite.degreesLat(positionGd.latitude);

      pos = convertLongLatToXYZ(
        latitude,
        longitude,
        earthRadius + positionGd.height
      );
      pos = pos.map((i) => i / 1000);
      //console.log(pos);
      //console.log(debrisRef.current);
      debrisRef.current.position.x = pos[0];
      debrisRef.current.position.y = pos[1];
      debrisRef.current.position.z = pos[2];
      console.log(debrisRef.current.position)
    }
  });
  const [points, setPoints] = useState(getPoints(timeWindow, { tle1, tle2 }));
  const [color, setColor] = useState(getRandomColor());
  setInterval(() => {
    setPoints(getPoints(timeWindow, { tle1, tle2 }));
  }, 30 * 1000);
  useInterval(() => {
    setPoints(getPoints(timeWindow, { tle1, tle2 }));
  }, 30 * 1000);
  return (
        <mesh ref={debrisRef}>
            <sphereGeometry attach="geometry" args={[0.02, 32, 32]} />
            <meshBasicMaterial attach="material" color="red" />
       </mesh> 
  )
}
