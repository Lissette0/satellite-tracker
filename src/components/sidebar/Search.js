import React, { Component, useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Page from "./Page";
import { FaSatellite } from "react-icons/fa";
import SideBarButton from "./SideBarButton";
import { MdDescription } from "react-icons/md";
 import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      message: "",
      open: true,
    };

    this.cancel = "";
  }

  fetchSearchResults = (query) => {
    const searchUrl = `https://alanyu108-satellite-backend.herokuapp.com/api/satellite/search/`;
    // const searchUrl = `http://127.0.0.1:8000/api/satellites/search/`

    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();
    // axios.get(searchUrl, {
    //     cancelToken : this.cancel.token
    // })
    axios({
      method: "POST",
      url: searchUrl,
      data: {
        search: query.toUpperCase(),
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const resultNotFoundMsg = !res.data
          ? "There are no search results"
          : "";
        if (res.status === 200) {
          this.setState({
            results: res.data,
            message: resultNotFoundMsg,
          });
        }
        //console.warn(res.data)
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            message: "Failed to fetch the data. Please check network",
          });
        }
      });
  };

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query, results: {}, message: "" });
    } else {
      this.setState({ query: query, message: "" }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  renderSearchResults = () => {
    //const { open } = this.state;

    // const [show, setShow] = useState(true);

    const { results } = this.state;
    if (results.length !== 0 && Array.isArray(results)) {
      const test = (
        <>
          <div className="labels2 " id="all">
            {" "}
            <BsSearch id="filterIcon" /> Satellite Search Result
          </div>
          <hr />
          <div id="search-result">
            {results.map((sat) => (
              <>
                <div class="flex justify-center items-center">
                  <div class="rounded overflow-hidden shadow-lg ">
                    <div class="px-6 py-4 ">
                      <div class="font-bold text-xl mb-2">{sat.name}</div>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Country :</b>{" "}
                        <span class="text-gray-400">{sat.country}</span>
                      </p>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Status :</b>{" "}
                        <span class="text-gray-400">{sat.object_status}</span>
                      </p>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Launch Date :</b>{" "}
                        <span class="text-gray-400">{sat.launch_date}</span>
                      </p>
                      <p class="text-gray-300 text-base  mr-2">
                        <b>Launch Site :</b>{" "}
                        <span class="text-gray-400">{sat.launch_site}</span>
                      </p>
                      <p class="text-gray-400 text-base"></p>

                      {/* drop down for description  */}

                      <div>
                        <div className="labels labels1" id="clear">
                          <MdDescription id="clearIcon1" /> Description
                          <button
                            style={{ float: "right" }}
                            onClick={() =>
                              this.setState((prevState) => ({
                                open: !prevState.open,
                              }))
                            }
                          >
                            <FiChevronDown
                              style={{
                                display: this.state.open ? "block" : "none",
                              }}
                              id="dropIcon"
                            />
                            <FiChevronUp
                              style={{
                                display: this.state.open ? "none" : "block",
                              }}
                              id="dropIcon"
                            />
                          </button>
                        </div>

                        <div
                          style={{
                            display: this.state.open ? "none" : "block",
                          }}
                        >
                          <p
                            class="text-gray-400 text-base"
                            style={{ padding: "10px 0px 0px 0px" }}
                          >
                            {sat.description}
                          </p>
                        </div>
                      </div>

                      {/* end of drop down for description  */}
                    </div>
                    <div class="px-6 py-4">
                      <span class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 sidebar-button">
                        <SideBarButton
                          label="Satellite"
                          clickHandler={this.props.addSat}
                          obj={sat}
                          dispStyle={"font-semibold"}
                        />
                      </span>
                      <span class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 sidebar-button">
                        <button onClick={() => this.props.pathHandler(sat,!sat.showPath)}>
                            Toggle Path 
                        </button>
                      </span>
                      <span class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 sidebar-button">
                        <button
                          className="font-semibold"
                          onClick={() => this.props.visibilityHandler(sat)}
                        //onClick={() => visibilityHandler(sat)}
                        >
                          Show Visibility
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                <hr />
              </>
            ))}
          </div>
          <div style={{ margin: "0px 0px 30px 0px" }}></div>
        </>
      );

      return test;
    } else {
      return (
        <>
          <div className="labels2 " id="all">
            {" "}
            <BsSearch id="filterIcon" /> Satellite Search Result
          </div>
          <p style={{ color: 'white', margin: "20px" }}> Not Found </p>
        </>
      );
    }
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <label className="search-label" htmlFor="search-input">
          <input
            id="search-input"
            type="text"
            name="query"
            value={query}
            autoComplete="off"
            placeholder="Search Satellite "
            onChange={this.handleOnInputChange}
          />
        </label>

        {/* RESULTS */}
        <div id="content">
          {this.state.query.length === 0 ? null : this.renderSearchResults()}
          <div className="labels2 " id="all">
            {" "}
            <FaSatellite id="filterIcon" /> All Satellites
          </div>
          <hr />
          <Page
            addSat={this.props.addSat}
            visibilityHandler={this.props.visibilityHandler}
            pathHandler={this.props.pathHandler}
          />
          {/* <Data handleSatChange={this.props.handleSatChange} /> */}
          { }
        </div>
      </>
    );
  }
}

export default Search;
