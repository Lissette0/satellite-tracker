useFrame(({ clock }) => {
  if (firstRun) {
    if (satRef.current) {
      // console.log("rendering sat first render");
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
        // console.log(points);
        satRef.current.position.x = pos[0];
        satRef.current.position.y = pos[1];
        satRef.current.position.z = pos[2];
      }
      setFirstRun(false);
    }
  } else {
    // console.log(clock.elapsedTime % 3);
    if (Math.ceil(clock.elapsedTime) % 5 === 0) {
      // console.log("five seconds");
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
          if (Math.ceil(clock.elapsedTime) % 5 === 0) {
            setPoints(points.concat(new THREE.Vector3(pos[0], pos[1], pos[2])));
            console.log(points);
          }
        }
      }
    }
  }
});
