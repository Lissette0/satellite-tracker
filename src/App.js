import React from 'react';
import Navbar from './components/Navbar';
import{BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home';
import Earth from './components/Earthmodel'

function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
        <Route path='/' exact component={Home} />
        </Switch>
      </Router>
    </div>
    <Earth/>
    </>
  );
}

export default App;


