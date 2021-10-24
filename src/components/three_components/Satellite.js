import sat from "./satellite.glb";
import React, { useRef, useEffect, useState } from "react";
import * as satelliteFunction from "satellite.js";
import { useFrame } from "@react-three/fiber";
import { convertLongLatToXYZ } from "./Helpers";
import { earthRadius } from "satellite.js/lib/constants";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import OrbitPath from "./OrbitPath";
import * as THREE from "three";

export default function Satellite({
  tle1,
  tle2,
  scale,
  rotation,
  timeWindow,
  pathColor,
}) {
  const satRef = useRef();

  const [model, setModel] = useState(null);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    new GLTFLoader().load(sat, setModel);
  }, []);

  let [points, setPoints] = useState([]);
  let pos = [];
  let satRecord = satelliteFunction.twoline2satrec(tle1, tle2);
  useFrame(({ clock }) => {
    if (firstRun) {
      if (satRef.current) {
        console.log("rendering sat first render");
        let positionAndVelocity = satelliteFunction.propagate(
          satRecord,
          new Date()
        );
        let positionEci = positionAndVelocity.position;

        let gmst = satelliteFunction.gstime(new Date());

        if (positionEci) {
          let positionGd = satelliteFunction.eciToGeodetic(positionEci, gmst);
          let longitude = satelliteFunction.degreesLong(positionGd.longitude);
          let latitude = satelliteFunction.degreesLat(positionGd.latitude);

          //to add altitude, increase the radius
          pos = convertLongLatToXYZ(
            latitude,
            longitude,
            earthRadius + positionGd.height
          );
          pos = pos.map((i) => i / 1000);
          //setPoints(points.concat(pos));
          console.log(points);
          satRef.current.position.x = pos[0];
          satRef.current.position.y = pos[1];
          satRef.current.position.z = pos[2];
        }
        setFirstRun(false);
      }
    } else {
      console.log(clock.elapsedTime % 3);
      if (Math.ceil(clock.elapsedTime) % 3 === 0) {
        console.log("five seconds");
        if (satRef.current) {
          let positionAndVelocity = satelliteFunction.propagate(
            satRecord,
            new Date()
          );
          let positionEci = positionAndVelocity.position;

          let gmst = satelliteFunction.gstime(new Date());

          if (positionEci) {
            let positionGd = satelliteFunction.eciToGeodetic(positionEci, gmst);
            let longitude = satelliteFunction.degreesLong(positionGd.longitude);
            let latitude = satelliteFunction.degreesLat(positionGd.latitude);

            //to add altitude, increase the radius
            pos = convertLongLatToXYZ(
              latitude,
              longitude,
              earthRadius + positionGd.height
            );
            pos = pos.map((i) => i / 1000);
            satRef.current.position.x = pos[0];
            satRef.current.position.y = pos[1];
            satRef.current.position.z = pos[2];
            if (Math.ceil(clock.elapsedTime) % 15 === 0) {
              setPoints(
                points.concat(new THREE.Vector3(pos[0], pos[1], pos[2]))
              );
              console.log(points);
            }
          }
        }
      }
    }
  });
  /*
 *
  useInterval(() => {
    setPoints(getPoints(timeWindow, { tle1, tle2 }));
  }, 30 * 1000);
 */

  return model ? (
    <group>
      <mesh
        ref={satRef}
        scale={scale}
        rotation={rotation}
        onClick={(e) => setPoints([])}
        onPointerOver={(e) => console.log("over")}
      >
        <primitive object={model.scene} />
      </mesh>
      {points.length > 2 ? (
        <OrbitPath
          position={[0, 0, 0]}
          radius={0.01}
          color={pathColor}
          points={points}
        />
      ) : (
        <></>
      )}
    </group>
  ) : null;
}
