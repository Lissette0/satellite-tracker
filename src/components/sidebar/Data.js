import React from "react";
import "./Sidebar.css";
import { FaSatellite } from "react-icons/fa";

//displays all of the satellites
class Data extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    fetch("https://alanyu108-satellite-backend.herokuapp.com/api/satellites/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }
  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> loading... </h1>{" "}
        </div>
      );

    return (
      <div className="content">
        <div className="labels " id="all">
          {" "}
          <FaSatellite id="filterIcon" /> All Satellites
        </div>
        <hr />{" "}
        {items.map((item) => (
          <ol key={item.name}>
            <div className="inner-content">
              <p>
                {" "}
                <b className="name">{item.name}</b>{" "}
              </p>
              <p> Classification: {item.classification}</p>
              <p>
                International designation: {item.international_designation}{" "}
              </p>
              <p>Description: {item.description} </p>
              <button
                onClick={() => this.props.handleSatChange(item)}
                className="pl-2 pr-2 mr-2 border-2 border-white-600 "
              >
                Display Satellite
              </button>
              <button className="pl-2 pr-2 mr-2 border-2 border-white-600">
                Show Path
              </button>
            </div>
            <hr />
          </ol>
        ))}
      </div>
    );
  }
}

export default Data;
