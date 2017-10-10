import React, { Component } from 'react';
import logo from './logo.svg';
import errorImage from './ghost.svg';
import './App.css';

class UserNameInput extends Component {
  render() {
    
    function handleKeyPress(event) {
      // event.stopPropagation();
      // event.preventDefault();
      alert('hit');
      if(event.key == 'Enter'){
        alert('enter press here! ')
      }
    }

    return (
      <input className="spooky-input" type="text" onKeyPress={this.handleKeyPress}/>
    );
  }
}

function SpookyError(props) {
  if (!props.error)
    return null;
  else
    return (
      <div>
        <img className="spooky-ghost" src={errorImage} alt="Error Logo"/>
        <div className="spooky-error">{props.error}</div>
      </div>
    );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: 'There was an error'
    };
  }

  render() {
    return (
      <div className="container">
        <h1 className="spooky-text">Hacktoberfest</h1>
        <UserNameInput />
        <SpookyError error={this.state.error} />
      </div>
    );
  }
}

export default App;
