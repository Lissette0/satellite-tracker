import React, { Suspense, useState } from "react";
//import '../../Content.css';
import Sidebar from "../sidebar/Sidebar.js";
// import Earth from '../three_components/Earth.js'
import Canvas from "../three_components/Canvas.js";
import Loading from "../Loading";
import "./Content.css";

function Content() {
  const [currentSat, setCurrentSat] = useState({
    name: "CALSPHERE 2",
    tle_1: "1 00902U 64063E 21260.43098247 .00000045 00000-0 53848-4 0 9999",
    tle_2:
      "2 00902 90.1793 38.9145 0017201 215.2284 208.5622 13.52699608621864",
    description: "",
    norad: "00902",
    classification: "U",
    international_designation: "64063E",
    epoch_year: 2021,
    epoch_day: "260.43098247",
    first_derivative_mean_motion: "0.000000450",
    second_derivative_mean_motion: "0.000000000",
    bstar: "0.0000538480",
    set_number: 999,
    inclination: "90.1793",
    raan: "38.9145",
    eccentricity: "0.0017201000",
    argp: "215.2284",
    mean_anomaly: "208.5622",
    mean_motion: "13.52699608",
    rev_num: 62186,
  });

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
