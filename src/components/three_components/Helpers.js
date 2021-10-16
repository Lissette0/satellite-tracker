export function convertLongLatToXYZ(lat, long, radius) {
  const earthRadius = radius; // km
  let x = earthRadius * Math.cos(lat) * Math.cos(long);
  let y = earthRadius * Math.cos(lat) * Math.sin(long);
  let z = earthRadius * Math.sin(lat);
  return [x, y, z];
}
