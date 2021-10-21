import * as satellite from 'satellite.js'

export function convertLongLatToXYZ(lat, long, radius) {
  let radLat = (90 - lat) * (Math.PI / 180);
  let radLong = (long + 180) * (Math.PI / 180)
  let x = -((radius) * Math.sin(radLat) * Math.cos(radLong))
  let y = ((radius) * Math.cos(radLat))
  let z = ((radius) * Math.sin(radLat) * Math.sin(radLong))
  return [x, y, z];
}

export function getPoints(minutes) {
  const tle1 = "1 25544U 98067A   21289.53582973  .00006882  00000-0  13428-3 0  9999";
  const tle2 = "2 25544  51.6432 102.7082 0004209 118.5037 316.3696 15.48711192307400";
  const satRecord = satellite.twoline2satrec(tle1, tle2);

  let points = []

  for (let i = 0; i < minutes; i++) {
    const date = new Date()
    date.setMinutes(date.getMinutes() - i)

    const positionAndVelocity = satellite.propagate(satRecord, date);
    const positionEci = positionAndVelocity.position;
    const gmst = satellite.gstime(date);
    const positionGd = satellite.eciToGeodetic(positionEci, gmst);
    const longitude = satellite.degreesLong(positionGd.longitude);
    const latitude = satellite.degreesLat(positionGd.latitude);
    let pos = convertLongLatToXYZ(latitude, longitude, 6371.071027 + positionGd.height);
    pos = pos.map((v) => (v / 1000))
    points.push(pos)
  }
  return points
}


