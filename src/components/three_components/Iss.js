import iss from "./iss.glb";
import React, { useRef } from "react";
import * as satellite from "satellite.js";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";

export default function ISS({ scale }) {
  let tleLine1 =
    "1 25544U 98067A   21289.53582973  .00006882  00000-0  13428-3 0  9999";
  let tleLine2 =
    "2 25544  51.6432 102.7082 0004209 118.5037 316.3696 15.48711192307400";


  const ISSref = useRef();
  const data = useGLTF(iss);

  useFrame(({ clock }) => {
    let pos = [];
    let satelliteRecord = satellite.twoline2satrec(tleLine1, tleLine2);
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
    }
    ISSref.current.position.x = pos[0];
    ISSref.current.position.y = pos[1];
    ISSref.current.position.z = pos[2];

  });
  return data ? (
    <>
      <mesh ref={ISSref} scale={scale} >
        <primitive object={data.scene} />
      </mesh>
    </>
  ) : (
    <></>
  );
}
