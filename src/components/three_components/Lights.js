import React from "react";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight color="#f6f3ea" intensity={1.3} position={[-3, 3, 3]} />
    </>
  );
};
export default Lights;
