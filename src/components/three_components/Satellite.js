import React, { useRef } from "react";
import * as satellite from "satellite.js";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";

export default function Satellite({ sat }) {
  console.log(sat);
  const satRef = useRef();
  const satRecord = satellite.twoline2satrec(sat.tle_1, sat.tle_2);
  useFrame(({ clock }) => {
    //let frame = clock.elapsedTime % rate;
    //let point = ellipseCurvePoints.getPointAt(frame / rate);
    let pos = [];
    let positionAndVelocity = satellite.propagate(satRecord, new Date());
    let positionEci = positionAndVelocity.position;
    //console.log("pos eci", positionEci);
    let gmst = satellite.gstime(new Date());

    if (positionEci) {
      let positionGd = satellite.eciToGeodetic(positionEci, gmst);

      // Geodetic coords are accessed via `longitude`, `latitude`,
      let longitude = satellite.degreesLong(positionGd.longitude);
      let latitude = satellite.degreesLat(positionGd.latitude);
      //console.log("long", longitude, "    ", "latitude", latitude);
      //to add altitude, increase the radius
      pos = convertLongLatToXYZ(latitude, longitude, earthRadius + 1000);
      pos = pos.map((i) => i / 1000);
    }
    //console.log(earthRadius);
    satRef.current.position.x = pos[0];
    satRef.current.position.y = pos[1];
    satRef.current.position.z = pos[2];
  });

  return (
    <mesh
      ref={satRef}
      onClick={(e) => console.log("click")}
      onPointerOver={(e) => console.log("over")}
    >
      <torusGeometry args={[0.0001, 0.2, 12, 36]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
}
