import React, { Suspense, useState } from "react";
//import '../../Content.css';
import Sidebar from "../sidebar/Sidebar.js";
// import Earth from '../three_components/Earth.js'
import Canvas from "../three_components/Canvas.js";
import Loading from "../Loading";
import "./Content.css";

function Content() {
  const [currentSats, setCurrentSats] = useState([]);

  const addSat = (sat) => {
    console.log(currentSats);
    return setCurrentSats([sat, ...currentSats]);
  };

  return (
    <>
      <div id="main">
        <Sidebar className="float" id="sidebar" addSat={addSat} />
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
