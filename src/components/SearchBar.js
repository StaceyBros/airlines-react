import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/flights.json';

class SearchBar extends Component  {
  constructor(props){
    super(props);
    this.state = {
      cities: [{
        "origin":"Sydney",
        "destination":"london",
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
    // this.handleChangse1 = this.handleChange1.bind();
    // this.handleChange2 = this.handleChange2.bind();
    // this.handleSubmit = this.handleSubmit.bind()

  // handleChange1(e) {
  //   this.setState({origin: e.target.value});
  // }
  //
  // handleChange2(e) {
  //   this.setState( { destination: e.target.value } );
  // }
//
//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.onSubmit( this.state.content );
//     axios.get(SERVER_URL).then(function (results){
//     }.bind(this));
//   }


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
