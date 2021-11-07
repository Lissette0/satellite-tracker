import iss from "./iss.glb";
import React, { useRef, useState } from "react";
import * as satellite from "satellite.js";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";
import OrbitPath from "./OrbitPath";
import { getPoints } from "./Helpers";
import Text from './Text'

export default function ISS({ scale, tle, timeWindow, pathColor }) {
  const ISSref = useRef();
  const tagRef = useRef();
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

      tagRef.current.position.x = pos[0];
      tagRef.current.position.y = pos[1];
      tagRef.current.position.z = pos[2];



    }
  });

  let [points, setPoints] = useState(getPoints(timeWindow, tle))
  setInterval(() => {
    setPoints(getPoints(timeWindow, tle))
  }, 30 * 1000);

  function Tag() {
    const [tag, setTag] = React.useState(false)
    return (
      <>
        <group
          ref={tagRef}
          onPointerOver={() => {
            setTag(true)
          }}
          onPointerLeave={() => {
            setTag(false)
          }}>
          <mesh>
            <sphereGeometry attach="geometry" args={[0.3, 32, 32]} />
            <meshBasicMaterial attach="material" visible={false} />
          </mesh>
          {tag &&
            <Text name="ISS" position={[0, -0.75, 0]} />
          }
        </group>
      </>
    );
  }



  return data ? (
    <>
      <mesh ref={ISSref} scale={scale} >
        <primitive object={data.scene} />
      </mesh>

      <Tag />
      <OrbitPath position={[0, 0, 0]} radius={0.01} points={points} color={pathColor} />
    </>
  ) : (
    <></>
  );
}
