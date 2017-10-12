import React, { Component } from 'react';
import errorImage from './ghost.svg';
import './App.css';

class UserNameInput extends Component {
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.submitName(e.target.value);
    }
  }

  render() {
    return <input type="text" className="spooky-input" onKeyPress={this.handleKeyPress} />
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
      userName: '',
      error: ''
    };
  }

  handleUserSubmission(userName) {
    console.log('enter clicked ' + userName);
  }

  render() {
    return (
      <div className="container">
        <h1 className="spooky-text">Hacktoberfest</h1>
        <UserNameInput submitName={this.handleUserSubmission}/>
        <SpookyError error={this.state.error} />
      </div>
    );
  }
}

export default App;
