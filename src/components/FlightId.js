import React, {Component} from 'react';
import axios from 'axios';
const SERVER_URL = 'http://9ee6f34926a2.ngrok.io/flights/11.json'
// const SERVER_URL = 'http://localhost:3000/flights/11.json'
class FlightId extends Component{
  constructor(){
    super();
    this.state = {
      reservation: '',
      date: '',
      origin: '',
      destination: '',
      number:'',
      plane: '',
      users:[],
      airplane_id: 0
    };
    const fetchFlightId = () => {
      axios.get(SERVER_URL).then ( (result) => {
        console.log(result)
        const {date, origin, destination,number,plane,users,airplane_id} = result.data;
        this.setState({
          date: date,
          origin: origin,
          destination: destination,
          number:number,
          plane: plane,
          airplane_id: airplane_id
        });
      })
    }
    fetchFlightId();
  }
  _handleReservation = (e) => {
    this.setState( {reservation: e.target.value})
  }
  _handleSubmitRes =(e) => {
    e.preventDefault();
    const {plane , reservation} = this.state;
    let planeSeats = plane.split(',');
    let reserve = []
    for (let i=0; i<planeSeats.length; i++){
      if (planeSeats[i] === reservation){
        continue;
      }
      reserve.push(planeSeats[i])
    }
    this.setState ( { reservation: '', plane: reserve.join(',')});
    axios.post(SERVER_URL,{
      date: this.state.date,
      origin: this.state.origin,
      destination: this.state.destination,
      number:this.state.number,
      plane: this.state.plane,
      airplane_id: this.state.airplane_id
    }).then( (result) => {
      console.log(result)
    })
  }
  render(){
    return(
      <div>
        <div>
          <p> {this.state.date} </p>
          <p> Flight: {this.state.number} </p>
          <p> {this.state.origin} > {this.state.destination} </p>
        </div>
            {this.state.plane.split(',').map( (seat) => (
              <div className='seats'>{seat}</div>
            ))}
            <form onSubmit={this._handleSubmitRes}>
              <input type='text' onInput={ this._handleReservation } value = {this.state.reservation} requierd />
              <button> Select Seat </button>
            </form>
      </div>
    )
  }
}
export default FlightId;
