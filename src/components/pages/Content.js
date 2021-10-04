import React, { Suspense } from 'react';
//import '../../Content.css';
import Sidebar from '../Sidebar.js'
import Earth from '../Earthmodel.js'
import Loading from '../Loading';
import './Content.css'

function Content() {
  return (
    <>
        <div id = "main">
            <Sidebar className= 'float' id = 'sidebar'/>
            <div className= 'float' id="earth">
                <Suspense fallback={Loading} >
                    <Earth />
                </Suspense>
            </div>
        </div>
    </>
    
  );
}

export default Content;