import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = ' http://9ee6f34926a2.ngrok.io./flights.json';

class SearchBar extends Component  {
  constructor(props){
    super(props);
    this.state = {
      cities: [{

      }]
    };
    this.saveSearch = this.saveSearch.bind(this);

    const fetchSearch = () => {
      axios.get(SERVER_URL).then((results) =>{
        console.log(results)
        this.setState({cities: results.data});
        setTimeout(fetchSearch, 6000);
      });
}
fetchSearch();
}

saveSearch(content){
          console.log(content);
        axios.post( SERVER_URL, {origin: content.origin,destination:content.destination }).then((result) =>{
        this.setState({cities: [...this.state.cities, result.data]});
      });
    }
render(){
  return(
    <div>
    <h1> Flight search </h1>
    <FlightsSearch onSubmit = {this.saveSearch}/>
    <SearchList cities = {this.state.cities}/>
</div>
);
}
}

class FlightsSearch extends Component {
  constructor(){
    super();
    this.state={
      origin: '',
      destination: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

  }

  _handleChange(event){
    let value = event.target.value;
    this.setState({[event.target.name]:event.target.value});
  }

  _handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit( this.state )
  }

    render(){
      return(
        <form onSubmit = {this._handleSubmit}>
          <label> Origin:
            <input type="search" name="origin" value={this.state.origin} placeholder="Origin" onChange={this._handleChange} />
          </label><br />

          <label> Destination:
          <input type="search" name="destination" value={this.state.destination} placeholder="Destination" onChange={this._handleChange}/>
          </label><br />

          <input type="submit" value="Search" />
        </form>
    )
  };

  }

const SearchList = (props)=> {
  return(
    <div>
    { (props.cities).map( (city) => (
          <div>
            <p> origin: {city.origin} </p>
            <p> destination: {city.destination} </p>
          </div>
        ))}

    </div>
  );

}

export default SearchBar;
