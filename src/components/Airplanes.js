import AirplaneForm from './AirplaneForm';
import AirplaneScheme from './AirplaneScheme';
import axios from 'axios';
import React, {Component} from 'react';


const SERVER_URL = ' http://9ee6f34926a2.ngrok.io/airplanes.json';

class Airplanes extends Component {
  constructor(){
    super();
    this.state={
      scheme: []
    }

    const getSchemes = () => {
      axios.get(SERVER_URL).then( (result) => {
        console.log(result)
        this.setState( { scheme: result.data } );
        setTimeout( getSchemes, 6000);
      })
    }
    getSchemes();

  }
  fetchScheme = (data) => {

    axios.post( SERVER_URL, {name:data.name, rows:data.rows, columns: data.columns}).then( (result) => {
      this.setState( {scheme: [...this.state.scheme, data]})

    })
  }
  render(){
    return(
      <div>
        <h1> Airplanes </h1>
        <AirplaneForm onSubmit= { this.fetchScheme } />
        <AirplaneScheme scheme= { this.state.scheme } />
      </div>
    )
  }
}

export default Airplanes;
