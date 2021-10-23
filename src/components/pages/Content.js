import React, { Suspense, useState } from "react";
//import '../../Content.css';
import Sidebar from "../sidebar/Sidebar.js";
// import Earth from '../three_components/Earth.js'
import Canvas from "../three_components/Canvas.js";
import Loading from "../Loading";
import "./Content.css";

function Content() {
  const [currentSat, setCurrentSat] = useState({});

  const handleSatChange = (sat) => {
    //console.log(sat);
    setCurrentSat(sat);
  };

  return (
    <>
      <div id="main">
        <Sidebar
          className="float"
          id="sidebar"
          handleSatChange={handleSatChange}
        />
        <div className="float" id="earth">
          <Suspense fallback={<Loading />}>
            <Canvas sat={currentSat} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Content;
