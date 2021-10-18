export function convertLongLatToXYZ(lat, long, radius) {
  let radLat = (90 - lat) * (Math.PI / 180);
  let radLong = (long + 180) * (Math.PI / 180)
  let x = -((radius) * Math.sin(radLat) * Math.cos(radLong))
  let y = ((radius) * Math.cos(radLat))
  let z = ((radius) * Math.sin(radLat) * Math.sin(radLong))
  return [x, y, z];
}
