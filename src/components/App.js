import { Link, Route, Switch } from 'react-router-dom';
import Airplanes from './Airplanes'
import Flights from './Flights'
import SearchBar from './SearchBar';
import FlightId from './FlightId';


function App() {
  return (
    <div className="App">
        <nav>
          <ul style={{backgroundColor: "lightblue"}}>
          <li style={{display: "inline", padding: "10px"}}><Link to="/Airplanes">Airplanes</Link></li>
          <li style={{display: "inline", padding: "10px"}}><Link to="/Flights">Flights</Link></li>
          <li style={{display: "inline", padding: "10px"}}><Link to="/Search">Search Flights</Link></li>
          <li style={{display: "inline", padding: "10px"}}><Link to="/FlightId">FlightId</Link></li>
            <Route exact path="/Airplanes"><Airplanes /></Route>
            <Route exact path="/Flights"><Flights /></Route>
            <Route exact path="/FlightId"><FlightId /></Route>
            <Route exact path="/Search"><SearchBar /></Route>
          </ul>
        </nav>
    </div>
  );
}
export default App;
