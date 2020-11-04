import React, {Component} from 'react';

class AirplaneScheme extends Component {

  render(){
    return(
      <div>
        { (this.props.scheme).map( (scheme) => (
          <div>
            <h1 key={scheme.name}>name: {scheme.name}</h1>
            <p>rows: {scheme.rows} </p>
            <p>columns: {scheme.columns} </p>
          </div>

        ))}
      </div>
    )
  }
}

export default AirplaneScheme;
