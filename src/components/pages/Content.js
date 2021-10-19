import React, { Suspense } from "react";
//import '../../Content.css';
import Sidebar from "../sidebar/Sidebar.js";
// import Earth from '../three_components/Earth.js'
import Canvas from "../three_components/Canvas.js";
import Loading from "../Loading";
import "./Content.css";

function Content() {
  return (
    <>
      <div id="main">
        <Sidebar className="float" id="sidebar" />
        <div className="float" id="earth">
          <Suspense fallback={<Loading />}>
            <Canvas />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Content;
