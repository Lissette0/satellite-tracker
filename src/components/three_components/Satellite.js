import sat from './satellite.glb'
import React, { useRef, useEffect, useState } from "react";
import * as satelliteFunction from "satellite.js";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import OrbitPath from './OrbitPath';

export default function Satellite({ tle1, tle2, scale, rotation, timeWindow }) {
  const satRef = useRef();

  const [model, setModel] = useState(null)
  const [future, past] = [Math.floor(timeWindow / 2), -1 * Math.ceil(timeWindow / 2)]

  useEffect(() => {
    new GLTFLoader().load(sat, setModel)
  }, [])
  useFrame(({ clock }) => {
    if (satRef.current) {
      let pos = [];
      let satRecord = satelliteFunction.twoline2satrec(tle1, tle2);
      let positionAndVelocity = satelliteFunction.propagate(satRecord, new Date());
      let positionEci = positionAndVelocity.position;

      let gmst = satelliteFunction.gstime(new Date());

      if (positionEci) {
        let positionGd = satelliteFunction.eciToGeodetic(positionEci, gmst);
        let longitude = satelliteFunction.degreesLong(positionGd.longitude);
        let latitude = satelliteFunction.degreesLat(positionGd.latitude);

        //to add altitude, increase the radius
        pos = convertLongLatToXYZ(latitude, longitude, earthRadius + positionGd.height);
        pos = pos.map((i) => i / 1000);
      }
      satRef.current.position.x = pos[0];
      satRef.current.position.y = pos[1];
      satRef.current.position.z = pos[2];
    }
  });
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let colorLength = randomColor.split("").length
  if (colorLength !== 7) {
    for (let i = 0; i < (7 - colorLength); i++) {
      randomColor += Math.floor(Math.random() * 10).toString()
    }
  }

  return (model ?
    <>
      <mesh ref={satRef} scale={scale} rotation={rotation} onClick={(e) => console.log("click")}
        onPointerOver={(e) => console.log("over")}>
        <primitive object={model.scene} />
      </mesh>
      <OrbitPath position={[0, 0, 0]} radius={0.01} minutes={future} tle={{ tle1, tle2 }} color={randomColor} />
      <OrbitPath position={[0, 0, 0]} radius={0.01} minutes={past} tle={{ tle1, tle2 }} color={randomColor} />
    </>
    : null
  )
}
