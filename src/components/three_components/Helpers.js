import * as satellite from "satellite.js";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export function convertLongLatToXYZ(lat, long, radius) {
  let radLat = (90 - lat) * (Math.PI / 180);
  let radLong = (long + 180) * (Math.PI / 180);
  let x = -(radius * Math.sin(radLat) * Math.cos(radLong));
  let y = radius * Math.cos(radLat);
  let z = radius * Math.sin(radLat) * Math.sin(radLong);
  return [x, y, z];
}

export function getPoints(minutes, tle) {
  let points = [];
  const { tle1, tle2 } = tle;
  const satRecord = satellite.twoline2satrec(tle1, tle2);

  for (let i = 0; i < minutes; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i);
    const positionAndVelocity = satellite.propagate(satRecord, date);
    const positionEci = positionAndVelocity.position;
    const gmst = satellite.gstime(date);
    const positionGd = satellite.eciToGeodetic(positionEci, gmst);
    const longitude = satellite.degreesLong(positionGd.longitude);
    const latitude = satellite.degreesLat(positionGd.latitude);
    let pos = convertLongLatToXYZ(
      latitude,
      longitude,
      6371.071027 + positionGd.height
    );
    pos = pos.map((v) => v / 1000);
    points.push(pos);
  }

  return points.map((point) => new THREE.Vector3(...point));
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
