import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
// import { earthRadius } from "satellite.js/lib/constants";

// work in progress

import * as satellite from "satellite.js";

function convertLongLatToXYZ(lat, long, radius) {
  let phi = (90 - lat) * (Math.PI / 180);
  let theta = (long + 180) * (Math.PI / 180);

  let x = -(radius * Math.sin(phi) * Math.cos(theta));
  let z = radius * Math.sin(phi) * Math.sin(theta);
  let y = radius * Math.cos(phi);

  return [x, y, z];
}
const TestIss = () => {
  const torusRef = useRef();
  const ISS_TLE = `1 25544U 98067A   21122.75616700  .00027980  00000-0  51432-3 0  9994
     2 25544  51.6442 207.4449 0002769 310.1189 193.6568 15.48993527281553`;
  // Initialize the satellite record with this TLE
  const satrec = satellite.twoline2satrec(
    ISS_TLE.split("\n")[0].trim(),
    ISS_TLE.split("\n")[1].trim()
  );

  let date = new Date();
  let positionAndVelocity = satellite.propagate(satrec, date);
  const gmst = satellite.gstime(date);
  console.log(gmst);
  useFrame(() => {
    date = Date.now();
    positionAndVelocity = satellite.propagate(satrec, date);
    console.log("date", date);
    console.log("position", positionAndVelocity);

    const position = satellite.eciToGeodetic(
      positionAndVelocity.position,
      gmst
    );

    const [x, y, z] = convertLongLatToXYZ(
      position.longitude,
      position.latitude,
      3
    );
    //console.log(x, y, z);
    //torusRef.position.x += x;
    torusRef.current.position.y = y + 3;
    torusRef.current.position.x = x;
    torusRef.current.position.z = z;
  });
  return (
    <mesh ref={torusRef} position={[0, 3, 0]}>
      <torusGeometry args={[10, 0.2, 12, 36]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export default TestIss;
