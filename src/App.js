import React, { Component } from 'react';
import axios from 'axios';
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
      <div class="container">
        <img className="spooky-ghost" src={errorImage} alt="Error Logo"/>
        <div className="spooky-error">{props.error}</div>
      </div>
    );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUserSubmission = this.handleUserSubmission.bind(this);
    this.state = {
      userName: '',
      error: ''
    };
  }

  showError(userName) {
    console.error(userName);
    this.setState({
      userName: userName,
      error: `${userName} NOT FOUND`
    });
  }

  handleUserSubmission(userName) {
    var self = this;
    axios.get('https://api.github.com/users/' + userName)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        self.showError(userName);
      });
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
