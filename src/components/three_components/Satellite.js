import sat from "./satellite.glb";
import React, { useRef, useEffect, useState } from "react";
import * as satellite from "satellite.js";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import OrbitPath from "./OrbitPath";
import Tag from "./Tag";
import { useInterval, getPoints, getRandomColor } from "./Helpers";

export default function Satellite({
  tle1,
  tle2,
  scale,
  rotation,
  timeWindow,
  pathColor,
  name,
  country,
  status,
}) {
  const satRef = useRef();
  console.log(satRef);

  const [model, setModel] = useState(null);
  //const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    new GLTFLoader().load(sat, setModel);
  }, []);

  useFrame(() => {
    let pos = [];
    let satelliteRecord = satellite.twoline2satrec(tle1, tle2);
    let positionAndVelocity = satellite.propagate(satelliteRecord, new Date());
    let positionEci = positionAndVelocity.position;

    let gmst = satellite.gstime(new Date());
    if (satRef.current !== undefined && typeof positionEci !== "undefined") {
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
      //console.log(satRef.current);
      satRef.current.position.x = pos[0];
      satRef.current.position.y = pos[1];
      satRef.current.position.z = pos[2];
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

  return model ? (
    <>
      <group ref={satRef}>
        <mesh scale={scale} rotation={rotation}>
          <primitive object={model.scene} />
        </mesh>
        <Tag
          text={{ name, country, status }}
          position={[0, -0.5, 0]}
          tag_scale_factor={0.075}
        />
      </group>
      <OrbitPath
        position={[0, 0, 0]}
        color={color}
        points={points}
        scale={scale}
      />
    </>
  ) : (
    <></>
  );
}
