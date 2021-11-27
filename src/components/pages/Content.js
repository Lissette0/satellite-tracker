import React, { Suspense, useState } from "react";
//import '../../Content.css';
import Sidebar from "../sidebar/Sidebar.js";
// import Earth from '../three_components/Earth.js'
import Canvas from "../three_components/Canvas.js";
import Loading from "../Loading";
import "./Content.css";

function Content() {
  const [currentSats, setCurrentSats] = useState([]);

  const satHandler = (sat) => {
    console.log(sat);
    if (sat.show) {
      if (
        currentSats.filter((activeSat) => activeSat.name === sat.sat.name)
          .length > 0
      )
        return alert("you are already display that satellite");
      else return setCurrentSats([sat.sat, ...currentSats]);
    } else {
      return setCurrentSats(
        currentSats.filter((activeSat) => activeSat.name !== sat.sat.name)
      );
    }
  };

  return (
    <>
      <div id="main">
        <Sidebar className="float" id="sidebar" addSat={satHandler} />
        <div className="float" id="earth">
          <Suspense fallback={<Loading />}>
            <Canvas currentSats={currentSats} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Content;
