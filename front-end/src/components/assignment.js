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
                <div class='due-box'>
                    <p class='due-date'>{this.props.currAssignment.dueDate}</p>
                </div>
                <div class='name-description'>
                    <p class='assignment-name'>{this.props.currAssignment.name}</p>
                    <div class='class-description'>
                        <p class='class-name'>{this.props.currAssignment.className}</p>
                        <p class='description'>{this.props.currAssignment.description}</p>
                    </div>
                </div>
                <div class='ind-assignment-buttons'>
                    <button class='assignment-button' id='edit-button' onClick={this.editAssignment}>Edit</button>
                    <button class='assignment-button' id='delete-button' onClick={this.deleteAssignment}>Delete</button>
                </div>
            </div>
            );
    }
}

export default Assignment;