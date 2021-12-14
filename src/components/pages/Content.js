import React, { Suspense, useState } from "react";
//import '../../Content.css';
import Sidebar from "../sidebar/Sidebar.js";
// import Earth from '../three_components/Earth.js'
import Canvas from "../three_components/Canvas.js";
import Loading from "../Loading";
import "./Content.css";
import VisibilityModal from "../VisibilityModal";

function Content() {
  const [currentSats, setCurrentSats] = useState([]);
  const [show, setShow] = useState(false);

  const [currItem, setCurrItem] = useState({});

  const [showPath, setShowPath] = useState(false);
  console.log(currentSats)

  const visibilityHandler = (sat) => {
    console.log(sat);
    setShow(true);
    setCurrItem(sat);
  };

  const pathHandler = (sat) => {
    const arr = currentSats.filter(currSat => currSat.name == sat.name);
    if(arr.length === 0){
      return null;
    }
    const item = arr[0];
    item.showPath = !item.showPath
    console.log(item)
    return setCurrentSats(currentSats.map(currSat => currSat.name !== item.name ? currSat : item));
  }

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
        <Sidebar
          className="float"
          id="sidebar"
          addSat={satHandler}
          visibilityHandler={visibilityHandler}
          pathHandler={pathHandler}
        />
        {show && <VisibilityModal showHandler={setShow} sat={currItem} />}
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
