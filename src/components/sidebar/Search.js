import React, { Component } from "react";
import "./Sidebar.css";
import axios from "axios";
//import Data from "./Data";
import { BsSearch } from "react-icons/bs";
import Page from "./Page";
import { FaSatellite } from "react-icons/fa";
import SideBarButton from "./SideBarButton";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      message: "",
    };

    this.cancel = "";
  }

  fetchSearchResults = (query) => {
    const searchUrl = `https://alanyu108-satellite-backend.herokuapp.com/api/satellites/search/`;
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
    const { results } = this.state;
    if (results.length !== 0 && Array.isArray(results)) {
      const test = (
        <>
          <div className="labels " id="all">
            {" "}
            <BsSearch id="filterIcon" /> Search Result
          </div>
          <hr />
          <div id="search-result">
            {results.map((sat) => (
              <>

                  <div class="flex justify-center items-center" >
                    <div class="max-w-sm rounded overflow-hidden shadow-lg ">
                        <div class="px-6 py-4 ">
                        <div class="font-bold text-xl mb-2">{sat.name}</div>
                        <p class="text-gray-300 text-base  mr-2">
                            <b>Country :</b> <span class="text-gray-400">{sat.country}</span>
                        </p>
                        <p class="text-gray-300 text-base  mr-2">
                        <b>Status :</b> <span class="text-gray-400">{sat.object_status}</span>
                        </p>
                        <p class="text-gray-300 text-base  mr-2">
                        <b>Launch Date :</b> <span class="text-gray-400">{sat.launch_date}</span>
                        </p>
                        <p class="text-gray-300 text-base  mr-2">
                        <b>Launch Site :</b>  <span class="text-gray-400">{sat.launch_site}</span>
                        </p>
                        <p class="text-gray-400 text-base"></p>
                        <p class="text-gray-400 text-base" style={{padding: "10px 0px 0px 0px"}}>
                            {sat.description}
                        </p>
                        </div>
                        <div class="px-6 py-4">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        <button
                                onClick={() => this.props.addSat(sat)}
                                className="pl-2 pr-2 mr-2 border-2 border-white-600 "
                                class="font-semibold"
                            >
                                Display Satellite
                            </button>
                        </span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">                 
                            <SideBarButton
                                            label="Satellite"
                                            clickHandler={console.log}
                                            obj={sat}
                                            dispStyle={"font-semibold"}
                                />
                        </span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            <SideBarButton
                                label="Path"
                                clickHandler={console.log}
                                obj={null}
                                dispStyle={"font-semibold"}
                            />
                        </span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            <SideBarButton
                                    label="Visibility"
                                    clickHandler={console.log}
                                    obj={null}
                                    dispStyle={"font-semibold"}
                            />
                        </span>
                        </div>
                    </div>
                </div>

                <hr />
              </>
            ))}
          </div>
          <div style={{margin: "0px 0px 30px 0px"}}></div>
        </>
      );

      return test;
    } else {
      return (
        <>
          <div className="labels " id="all">
            {" "}
            <BsSearch id="filterIcon" /> Search Result
          </div>
          <p className="inner-content"> Not Found </p>
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
          <div className="labels " id="all">
            {" "}
            <FaSatellite id="filterIcon" /> All Satellites
          </div>
          <hr />
          <Page addSat={this.props.addSat} />
          {/* <Data handleSatChange={this.props.handleSatChange} /> */}
          {}
        </div>
      </>
    );
  }
}

export default Search;
