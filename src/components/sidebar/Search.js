import React, { Component }  from 'react'
import './Sidebar.css';
import axios from 'axios';
import Data from './Data';
import { BsSearch} from "react-icons/bs";
import { FaSatellite} from "react-icons/fa";

class Search extends Component{
    constructor( props){
        super(props);

        this.state = {
            query: '',
            results: {},
            message: ''

        }

        this.cancel = '';
    }

    fetchSearchResults = (query) =>{
        const searchUrl= `https://alanyu108-satellite-backend.herokuapp.com/api/satellite/name=${query.toUpperCase()}/`

        if(this.cancel){
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();
        axios.get(searchUrl, {
            cancelToken : this.cancel.token
        })

            .then( res => {
                const resultNotFoundMsg = ! res.data
                        ? 'There are no search results' : '';
                this.setState( {
                    results: res.data,
                    message: resultNotFoundMsg,
                    } )
               //console.warn(res.data)
               
            })
            .catch( error => {
				if ( axios.isCancel(error) || error ) {
					this.setState({
						message: 'Failed to fetch the data. Please check network'
					})
				}
			} )
    };

    handleOnInputChange = (event) => {
        const query = event.target.value;
        if(!query){
            this.setState({query, results: {}, message:''})
        }
        else{
            this.setState({query: query, message: ''}, () =>{
                this.fetchSearchResults(query);
            } );
        }
     };

     renderSearchResults = () => {
		const { results } = this.state;

        if ( Object.keys( results ).length ) {
        return (
            <>
                <div className="labels " id = "all"> <BsSearch id= 'filterIcon'/> Search Result</div>
                <hr/>
                <div key={ results.name }>
                    <div className= "inner-content">
                            <p> <b className="name">{ results.name }</b> </p>
                            <p> Classification: { results.classification }</p>
                            <p>International designation: { results.international_designation } </p>
                            <p>Description: { results.description } </p>
                    </div>
                </div>
                <hr/>
            </>
            )
		}else{
            return(
                <>
                    <div className="labels " id = "all"> <BsSearch id= 'filterIcon'/> Search Result</div>
                    <p className= "inner-content"> Not Found </p>
                </>
            )
        }
	};

    render(){
        const { query } = this.state;
        return(
            <>
                <label className = "search-label" htmlFor="search-input">
                    <input 
                        id='search-input' 
                        type="text" 
                        name="query"
                        value= {query} 
                        autoComplete="off" 
                        placeholder='Search Satellite '
                        onChange = {this.handleOnInputChange} />
                </label>

                {/* RESULTS */}
                <div id = 'content'>
                    {
                        this.state.query.length === 0 ? null  
                             : this.renderSearchResults()    
                    }
                    <div className="labels " id = "all"> <FaSatellite id= 'filterIcon'/> All Satellites</div>
                    <hr/>
                    <Data/>
  
                </div> 

                
            </>
        )
    }
}


export default Search;