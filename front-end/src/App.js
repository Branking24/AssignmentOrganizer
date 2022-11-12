import React from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import AssignmentViewer from './components/assignment-viewer';
import AddAssignment from './components/add-assignment';
import Home from './components/home';
import EditAssignment from './components/edit-assignment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
    this.state = {
      pageValue: "home",
      loggedUser: "",
      currAssignment: {}
    };
    
    this.callBackStateSetter = this.callBackStateSetter.bind(this);
    this.callBackUserSetter = this.callBackUserSetter.bind(this);
    this.setCurrAssignment = this.setCurrAssignment.bind(this);
  }
  
  setCurrAssignment(assignment) {
    this.setState({currAssignment: assignment});
  }
  
  callBackStateSetter(val) {
    this.setState({pageValue: val});
  }
  
  callBackUserSetter(user) {
    this.setState({loggedUser: user});
  }
  
  renderComponent() {
    switch(this.state.pageValue) {
      case "home":
        return <Home appStateSet={this.callBackStateSetter} appUserSet={this.callBackUserSetter}/>;
      case "viewer":
        return <AssignmentViewer appStateSet={this.callBackStateSetter} loggedUser={this.state.loggedUser} appAssignment={this.setCurrAssignment} />;
      case "adder":
        return <AddAssignment appStateSet={this.callBackStateSetter} loggedUser={this.state.loggedUser}/>;
      case "editer":
        return <EditAssignment appStateSet={this.callBackStateSetter} loggedUser={this.state.loggedUser} currAssignment={this.state.currAssignment} />;
    }
  }
  
  render() {
    return (
      <div className="App">
        {this.renderComponent()}
      </div>
    );
  }
}

export default App;