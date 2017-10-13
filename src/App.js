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

function SpookyResults(props) {
  if (props.numberOfPrs === '') {
    console.log(props);
    return null;
  }
  else {
    var infoMessage = '';
    var colorClass = '';

    if (props.numberOfPrs === 0) {
        colorClass = 'spooky-red';
        infoMessage = 'THAT IS TERRIFYING';
    }
    else if (props.numberOfPrs === 1) {
        colorClass = 'spooky-purple';
        infoMessage = 'DON\'T STOP NOW!';
    }
    else if (props.numberOfPrs === 2) {
        colorClass = 'spooky-yellow';
        infoMessage = 'HALF WAY THERE!';
    }
    else if (props.numberOfPrs === 3) {
        colorClass = 'spooky-blue';
        infoMessage = 'ONLY ONE MORE TO GO!';
    }
    else if (props.numberOfPrs > 3) {
        colorClass = 'spooky-green';
        infoMessage = 'WELL DONE!';
    }

    return (
      <div className="container">
        {/* <img src={props.avatarUrl} /> */}
        <div className="spooky-number">{props.numberOfPrs}</div>
  			<div className="spooky-message">{infoMessage}</div>	
      </div>
    );
  }
    
}

function SpookyError(props) {
  if (!props.error)
    return null;
  else
    return (
      <div className="container">
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
      avatarUrl: '',
      numberOfPrs: '',
      error: ''
    };
  }

  getNumberOfPullRequests(issues) {
    var numberOfPullRequests = 0;
    issues.forEach(function(issue) {
        if (issue.pull_request)
            numberOfPullRequests++;
    });

    return numberOfPullRequests;
  }

  findIssues(user) {
    var self = this;
    axios.get(`https://api.github.com/search/issues?q=author:${user.login}+created:2017-10-01..2017-11-01`)
      .then(function (results) {
        var numberOfPullRequests = self.getNumberOfPullRequests(results.data.items);
        self.setState({numberOfPrs: numberOfPullRequests, error: '', avatarUrl: user.avatar_url})
      })
      .catch(function (error) {
        self.showError(error);
      });
  }

  showError(userName) {
    this.setState({
      userName: userName,
      error: `${userName} NOT FOUND`,
      numberOfPrs: ''
    });
  }

  handleUserSubmission(userName) {
    var self = this;
    axios.get('https://api.github.com/users/' + userName)
      .then(function (response) {
        self.findIssues(response.data);
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
        <SpookyResults avatarUrl={this.state.avatarUrl} numberOfPrs={this.state.numberOfPrs} />
        <SpookyError error={this.state.error} />
      </div>
    );
  }
}

export default App;
