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
    if (this.state.userValue === "") {
      this.setState({errorMsg: "Enter a Username"});
    }
    else if (this.state.passValue === "") {
      this.setState({errorMsg: "Enter a Password"});
    }
    else {
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
  }
  
  signUpUser() {
    if (this.state.userValue === "") {
      this.setState({errorMsg: "Enter a Username"});
    }
    else if (this.state.passValue === "") {
      this.setState({errorMsg: "Enter a Password"});
    }
    else {
      axios.post('/api/new-user', {username:this.state.userValue, password:this.state.passValue}).then(response => {
        this.props.appUserSet(response.data.user);
        this.props.appStateSet("viewer");
        console.log(response.data);
      }).catch(error => {
        if (error.response.status === 409) {
          this.setState({errorMsg: "Username Already Taken"});
          console.log("Username Already Taken");
        }
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <h1 className='home-intro'>Class Assignment Organizer</h1>
        <div class="home_text_boxes">
          <div class="home-text-group">
            <p class='input-label'>Username</p>
            <input class='input-box' type="text" value={this.state.userValue} onChange={this.handleUserChange} />
          </div>
          <div class="home-text-group">
            <p class='input-label'>Password</p>
            <input class='input-box' type="password" value={this.state.passValue} onChange={this.handlePassChange} />
          </div>
        </div>
        <div class="home_buttons">
          <button class='home-button' onClick={this.signInUser}>Login</button>
          <button class='home-button' onClick={this.signUpUser}>Sign Up</button>
        </div>
        <p class='error-msg'>{this.state.errorMsg}</p>
      </div>
    );
  }
}

export default Home;
