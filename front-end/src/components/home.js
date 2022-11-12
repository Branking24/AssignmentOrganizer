import React from 'react';
import '../App.css';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userValue: "",
      passValue: "",
      errorMsg: ""
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
  }
  
  handleUserChange(event) {
    event.preventDefault();
    this.setState({userValue: event.target.value});
  }
  
  handlePassChange(event) {
    event.preventDefault();
    this.setState({passValue: event.target.value});
  }
  
  signInUser() {
    axios.get('/api/user', {params: {username:this.state.userValue, password:this.state.passValue}}).then(response => {
      console.log(response.data);
      this.props.appUserSet(response.data.user);
      this.props.appStateSet("viewer");
    }).catch(error => {
      if (error.response.status === 401) {
        this.setState({errorMsg: "Invalid Credentials"});
        console.log("Invalid Credentials");
      }
      else {
        console.log(error);
      }
    });
  }
  
  signUpUser() {
    axios.post('/api/new-user', {username:this.state.userValue, password:this.state.passValue}).then(response => {
      console.log(response.data);
    }).catch(error => {
      if (error.response.status === 409) {
        this.setState({errorMsg: "Username Already Taken"});
        console.log("Username Already Taken");
      }
    });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Class Assignment Organizer</h1>
        <div class="home_text_boxes">
          <div class="home-text-group">
            <p>Username:</p>
            <input type="text" value={this.state.userValue} onChange={this.handleUserChange} />
          </div>
          <div class="home-text-group">
            <p>Password:</p>
            <input type="password" value={this.state.passValue} autofocus="autofocus" onChange={this.handlePassChange} />
          </div>
        </div>
        <div class="home_buttons">
          <button onClick={this.signInUser}>Login</button>
          <button onClick={this.signUpUser}>Sign Up</button>
        </div>
        <p>{this.state.errorMsg}</p>
      </div>
    );
  }
}

export default Home;
