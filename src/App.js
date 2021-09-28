import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home';
import Content from './components/pages/Content';



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
        <Content />
    </>
  );
}

export default App;


