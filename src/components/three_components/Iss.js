import iss from "./iss.glb";
import React, { useRef, useState } from "react";
import * as satellite from "satellite.js";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";
import OrbitPath from "./OrbitPath";
import { getPoints } from "./Helpers";
import Tag from './Tag'

export default function ISS({ scale, tle, timeWindow, pathColor }) {
  const ISSref = useRef();
  const data = useGLTF(iss);
  let { tle1, tle2 } = tle

  useFrame(() => {
    let pos = [];
    let satelliteRecord = satellite.twoline2satrec(tle1, tle2);
    let positionAndVelocity = satellite.propagate(satelliteRecord, new Date());
    let positionEci = positionAndVelocity.position;

    let gmst = satellite.gstime(new Date());
    if (positionEci) {
      let positionGd = satellite.eciToGeodetic(positionEci, gmst);

      // Geodetic coords are accessed via `longitude`, `latitude`,
      let longitude = satellite.degreesLong(positionGd.longitude);
      let latitude = satellite.degreesLat(positionGd.latitude);
      pos = convertLongLatToXYZ(latitude, longitude, earthRadius + positionGd.height);
      pos = pos.map((i) => i / 1000);
      ISSref.current.position.x = pos[0];
      ISSref.current.position.y = pos[1];
      ISSref.current.position.z = pos[2];

    }
  });

  let [points, setPoints] = useState(getPoints(timeWindow, tle))
  setInterval(() => {
    setPoints(getPoints(timeWindow, tle))
  }, 30 * 1000);

  const [tag, setTag] = React.useState(false)
  console.log("rerender")



  return data ? (
    <>
      <group
        ref={ISSref}
        onClick={() => {
          setTag(!tag)
        }}

      >
        <mesh scale={scale} >
          <primitive object={data.scene} />
        </mesh>

        {tag &&
          <Tag text={{ name: "ISS", country: "Multinational", status: "Operational" }} position={[0, -0.75, 0]} />
        }

      </group>

      <OrbitPath position={[0, 0, 0]} radius={0.01} points={points} color={pathColor} />
    </>
  ) : (
    <></>
  );
}
