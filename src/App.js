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

  handleBlur = (e) => {
    this.props.submitName(e.target.value);
  }

  render() {
    return <input type="text" placeholder="Enter GitHub Username" className="spooky-input" onBlur={this.handleBlur} onKeyPress={this.handleKeyPress} />
  }
}

function SpookyResults(props) {
  if (props.numberOfPrs === '') {
    return null;
  }
  else {
    var contributionMessage = '';

    if (props.numberOfPrs === 1)
      contributionMessage = `${props.numberOfPrs} contribution`;
    else
      contributionMessage = `${props.numberOfPrs} contributions`;    

    return (
      <div className="container">
        <div className="avatar">
          <img src={props.avatarUrl} />
          <div className="overlay"></div>
        </div>
        <div className="spooky-number">{contributionMessage}</div>
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
    axios.get(`https://api.github.com/search/issues?q=author:${user.login}+created:2018-10-01..2018-11-01`)
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
      error: `${userName} COULD NOT BE FOUND`,
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
      <div className="container fadein">
        <h1 className="spooky-text">Hacktoberfest</h1>
        <UserNameInput submitName={this.handleUserSubmission}/>
        <SpookyResults avatarUrl={this.state.avatarUrl} numberOfPrs={this.state.numberOfPrs} />
        <SpookyError error={this.state.error} />
      </div>
    );
  }
}

export default App;
