import React from 'react';
import Assignment from './assignment';
import axios from 'axios';
import '../App.css';


class AssignmentViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: []
        };
        this.logoutUser = this.logoutUser.bind(this);
        this.addAssignment = this.addAssignment.bind(this);
        this.getAssignments = this.getAssignments.bind(this);
        this.goToEditer = this.goToEditer.bind(this);
        this.getAssignments(this.props.loggedUser);
    }
    
    logoutUser() {
        {this.props.appStateSet("home")}
    }
    
    addAssignment() {
        {this.props.appStateSet("adder")}
    }
    
    getAssignments(user) {
        let uri = '/api/assignments/' + user;
        axios.get(uri).then(response => {
            this.setState({assignments: response.data.assignments});
            console.log(response.data);
        });
    }
    
    goToEditer() {
        this.props.appStateSet("editer");
    }
    
    render() {
        return(
            <div class='all'>
                <div class='assignment-viewer-menu'>
                    <button onClick={this.logoutUser}>Logout</button>
                    <button onClick={this.addAssignment}>Add Assignment</button>
                </div>
                <h1>Assignments</h1>
                <div class='assignments-list'>
                    {this.state.assignments.map(assignment => (
                        <Assignment currAssignment={assignment} loggedUser={this.props.loggedUser} callBackUpdate={this.getAssignments} appEditer={this.goToEditer} appSetCurrAssignment={this.props.appAssignment}/>
                    ))}
                </div>
            </div>
            );
    }
}

export default AssignmentViewer;