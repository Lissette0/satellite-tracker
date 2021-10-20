import sat from './satellite.glb'
import React, { useRef, useEffect, useState } from "react";
import * as satelliteFunction from "satellite.js";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Satellite({ tle1, tle2, scale, rotation }) {
  const satRef = useRef();
  const satRecord = satelliteFunction.twoline2satrec(tle1, tle2);

  const [model, setModel] = useState(null)

  useEffect(() => {
    new GLTFLoader().load(sat, setModel)
  }, [])

  useFrame(({ clock }) => {
    if (satRef.current) {
      let pos = [];
      let positionAndVelocity = satelliteFunction.propagate(satRecord, new Date());
      let positionEci = positionAndVelocity.position;

      let gmst = satelliteFunction.gstime(new Date());

      if (positionEci) {
        let positionGd = satelliteFunction.eciToGeodetic(positionEci, gmst);
        let longitude = satelliteFunction.degreesLong(positionGd.longitude);
        let latitude = satelliteFunction.degreesLat(positionGd.latitude);

        //to add altitude, increase the radius
        pos = convertLongLatToXYZ(latitude, longitude, earthRadius + 1000);
        pos = pos.map((i) => i / 1000);
      }
      satRef.current.position.x = pos[0];
      satRef.current.position.y = pos[1];
      satRef.current.position.z = pos[2];
    }


  });

  return (model ?
    <mesh ref={satRef} scale={scale} rotation={rotation} >
      <primitive object={model.scene} />
    </mesh>
    : null
  )
}


