import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home';
import Earth from './components/Earthmodel'
import Loading from "./components/Loading"


function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
          </Switch>
        </Router>
      </div>
      <Suspense fallback={Loading} >
        <Earth />
      </Suspense>
    </>
  );
}

export default App;


