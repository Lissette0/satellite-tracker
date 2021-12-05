import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Content from "./components/pages/Content";
import axios from "axios";

function App() {
  const [location, setLocation] = useState({});

  const locationHandler = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({ lat: pos.coords.latitude, long: pos.coords.longitude }),
        () => alert("location services required")
      );
    } else {
      alert("Location Services Are Required to Use this application");
    }
  };

  return (
    <>
      <div className="App">
        <Router>
          <Navbar locationHandler={locationHandler} location={location} />
          <Switch>
            <Route
              path={["/", "/home", "/satellite-tracker"]}
              exact
              component={Home}
            />
            <Route path="/content" component={Content} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
