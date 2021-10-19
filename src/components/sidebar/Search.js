import React, { Component }  from 'react'
import './Sidebar.css';
import axios from 'axios';
import Data from './Data';


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
        const searchUrl= `https://alanyu108-satellite-backend.herokuapp.com/api/satellite/name=${query}/`

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
        this.setState({query: query, message: ''}, () =>{
            this.fetchSearchResults(query);
        } );
     };

     renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					{ results.map( result => {
						return (
							<div key={ result.name }>
								<h6 className="image-username">{result.name}</h6>
							</div>
						)
					} ) }

				</div>
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
                    {this.renderSearchResults()}   
                    <Data/>    
                </div> 

                
            </>
        )
    }
}


export default Search;