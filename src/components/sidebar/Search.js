import React, { Component } from 'react'
import './Sidebar.css';
import axios from 'axios';
import Data from './Data';
import { BsSearch } from "react-icons/bs";
import { FaSatellite } from "react-icons/fa";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: [],
            message: ''

        }

        this.cancel = "";
    }


    fetchSearchResults = (query) => {
        const searchUrl = `https://alanyu108-satellite-backend.herokuapp.com/api/satellites/search/`
        // const searchUrl = `http://127.0.0.1:8000/api/satellites/search/`

        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();
        // axios.get(searchUrl, {
        //     cancelToken : this.cancel.token
        // })
        axios({
            method: 'POST',
            url: searchUrl,
            data: {
                search: query.toUpperCase()
            },
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(res => {
                const resultNotFoundMsg = !res.data
                    ? 'There are no search results' : '';
                if (res.status === 200) {
                    this.setState({
                        results: res.data,
                        message: resultNotFoundMsg,
                    })
                }
                //console.warn(res.data)

            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        message: 'Failed to fetch the data. Please check network'
                    })
                }
            })
    };

    handleOnInputChange = (event) => {
        const query = event.target.value;
        if (!query) {
            this.setState({ query, results: {}, message: '' })
        }
        else {
            this.setState({ query: query, message: '' }, () => {
                this.fetchSearchResults(query);
            });
        }
    };

    renderSearchResults = () => {
        const { results } = this.state;
        if (results.length !== 0 && Array.isArray(results)) {
            const test = (
                <>
                    <div className="labels " id="all"> <BsSearch id='filterIcon' /> Search Result</div>
                    <hr />
                    <div id='search-result' >
                        {results.map((sat) => (
                            <>
                                <div key={sat.name}>
                                    <div className="inner-content">
                                        <p> <b className="name">{sat.name}</b> </p>
                                        <p> Classification: {sat.classification}</p>
                                        <p>International designation: {sat.international_designation} </p>
                                        <p>Description: {sat.description} </p>
                                        <button
                                        onClick={() => this.props.handleSatChange(sat)}
                                        className="pl-2 pr-2 mr-2 border-2 border-white-600 "
                                        >
                                            Display Satellite
                                        </button>
                                        <button className="pl-2 pr-2 mr-2 border-2 border-white-600">
                                            Show Path
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>
                </>
            )

            return test

        }
        else {
            return (
                <>
                    <div className="labels " id="all"> <BsSearch id='filterIcon' /> Search Result</div>
                    <p className="inner-content"> Not Found </p>
                </>
            )
        }
    };

    render() {
        const { query } = this.state;
        return (
            <>
                <label className="search-label" htmlFor="search-input">
                    <input
                        id='search-input'
                        type="text"
                        name="query"
                        value={query}
                        autoComplete="off"
                        placeholder='Search Satellite '
                        onChange={this.handleOnInputChange} />
                </label>

                {/* RESULTS */}
                <div id='content'>
                    {
                        this.state.query.length === 0 ? null
                            : this.renderSearchResults()
                    }
                    <div className="labels " id="all"> <FaSatellite id='filterIcon' /> All Satellites</div>
                    <hr />
                    <Data handleSatChange={this.props.handleSatChange} />

                </div>


            </>
        )
    }
}


export default Search;
