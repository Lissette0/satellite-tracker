export function convertLongLatToXYZ(lat, long, radius) {
  const earthRadius = radius; // km
  let radLat = (lat * Math.PI) / 180;
  let radLong = (long * Math.PI) / 180;
  let x = -earthRadius * Math.cos(radLat) * Math.cos(radLong);
  let y = earthRadius * Math.sin(radLat);
  let z = earthRadius * Math.cos(radLat) * Math.sin(radLong);
  return [x, y, z];
}
