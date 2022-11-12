import React from 'react';
import axios from 'axios';
import '../App.css';

class Assignment extends React.Component {
    constructor(props) {
        super(props);
        this.deleteAssignment = this.deleteAssignment.bind(this);
        this.editAssignment = this.editAssignment.bind(this);
    }
    
    editAssignment() {
        this.props.appSetCurrAssignment(this.props.currAssignment);
        this.props.appEditer();
    }
    
    deleteAssignment() {
        let uri = '/api/assignments/' + this.props.loggedUser + '/' + this.props.currAssignment.assignment_id;
        axios.delete(uri).then(response => {
            console.log(response);
            this.props.callBackUpdate(this.props.loggedUser);
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        return(
            <div class = 'assignment-box'>
                <div class='ind-assignment-buttons'>
                    <button onClick={this.editAssignment}>Edit</button>
                    <button onClick={this.deleteAssignment}>Delete</button>
                </div>
                <p>{this.props.currAssignment.name}</p>
                <p>{this.props.currAssignment.className}</p>
                <p>{this.props.currAssignment.dueDate}</p>
                <p>{this.props.currAssignment.description}</p>
            </div>
            );
    }
}

export default Assignment;