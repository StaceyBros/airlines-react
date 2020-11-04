import React, {Component} from 'react';

class AirplaneForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      rows: 0,
      columns: 0
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit( this.state )
    this.setState( { name: '', rows:0, columns: 0 } )
  }

  _handleNameInput = (e) => {
    this.setState( { name: e.target.value } )
  }
  _handleRowsInput = (e) => {
    this.setState( { rows: e.target.value } )
  }
  _handleColsInput = (e) => {
    this.setState( { columns: e.target.value } )
  }

  render(){
    return(
      <form onSubmit={ this._handleSubmit }>
        <label>Name:</label>
        <input type='text' onInput={ this._handleNameInput } value = {this.state.name} required/>

        <label>Rows:</label>
        <input type='number' onInput={ this._handleRowsInput } value = {this.state.rows} required />

        <label>Cols:</label>
        <input type='number' onInput={ this._handleColsInput } value = {this.state.columns} required />

        <button> Create Plane </button>
      </form>

    )
  }
}

export default AirplaneForm;
