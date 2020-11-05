import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://9ee6f34926a2.ngrok.io/flights.json';


class Flights extends Component {
  constructor(){
    super();
    this.state = {
      flights: []
    };
    this.saveFlights = this.saveFlights.bind(this);

    const fetchFlights = () => {
      axios.get(SERVER_URL).then((results) =>{
        this.setState({flights: results.data});
        setTimeout(fetchFlights, 6000);
      });
    };
    fetchFlights();
  }

      saveFlights(content){
          console.log(content);
        axios.post( SERVER_URL, {
        flightNumber: content.flightNumber,
        date: content.date,
        origin: content.origin,
        destination: content.destination,
        plane: content.plane
      }).then((result) =>{
        this.setState({flights: [...this.state.flights, result.data]});
      });
    }

    render() {
        return (
          <div>
            <h1>Flights</h1>
            <FlightsForm onSubmit={ this.saveFlights }/>
            <FlightsList flights={this.state.flights}/>
          </div>
        );
    }
  }

  class FlightsForm extends Component {

      constructor() {
        super();
        this.state = {
        flightNumber: '',
        date: '',
        origin: '',
        destination: '',
        plane: ''
      };
      this._handleChange = this._handleChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit( this.state)
        this.setState({
        flightNumber: '',
        date: '',
        origin: '',
        destination: '',
        plane: ''
      })
    }

    _handleChange(event) {
      let value = event.target.value;
      this.setState({[event.target.name]: value
    });
    console.log({[event.target.name]: value
  });
  }

    render() {
    return (
      <form onSubmit={ this._handleSubmit }>
        <label> Flight Number
          <input type="text" name="flightNumber" placeholder="flight number" value={ this.state.flightNumber } onChange= { this._handleChange}/>
        </label><br />

        <label> Date
        <input type="date" name="date" placeholder="date" required value={ this.state.date } onChange= { this._handleChange }/>
        </label>

        <label> From
        <input type="search" name="origin" placeholder="From" required value={ this.state.origin } onChange={ this._handleChange }/>
        </label>

        <label> To
        <input type="search" name="destination" placeholder="To" required value={ this.state.destination } onChange={ this._handleChange }/>
        </label>

        <label> Plane
        <input type="text" name="plane" placeholder="plane" value={ this.state.plane } onChange={ this._handleChange } />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const FlightsList = (props) => {

    return (
      <div>
        <h1>Flight List</h1>
          { props.flights.map( (f) =>( <div key={ f.id }> <p>{ f.flightNumber }  { f.date }  { f.origin }  { f.destination }  { f.plane.split(',').length } </p></div> )) }
      </div>
    );
}

export default Flights;
