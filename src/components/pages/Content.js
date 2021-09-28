import React, { Suspense } from 'react';
//import '../../Content.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Sidebar from '../Sidebar.js'
import Earth from '../Earthmodel.js'
import Loading from '../Loading';
import './Content.css'

function Content() {
  return (
    <>
    <div id="App">
        <div id="side">
        <Router>
          <Sidebar/>
          <Switch>
            <Route path='/' />
          </Switch>
        </Router>
        </div>
 
            <Suspense fallback={Loading} >
                <Earth />
            </Suspense>

      </div>
    </>
    
  );
}

export default Content;