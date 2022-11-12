import React from 'react';
import axios from 'axios';

class AddAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          assignmentName: "",
          className: "",
          dueDate: "",
          assignmentDescription: ""
        };
        
        this.handleAssignmentNameChange = this.handleAssignmentNameChange.bind(this);
        this.handleClassNameChange = this.handleClassNameChange.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.submitAssignment = this.submitAssignment.bind(this);
        this.cancelAssignment = this.cancelAssignment.bind(this);
    }
    
    handleAssignmentNameChange(event) {
        event.preventDefault();
        this.setState({assignmentName: event.target.value});
    }
    
    handleClassNameChange(event) {
        event.preventDefault();
        this.setState({className: event.target.value});
    }
    
    handleDueDateChange(event) {
        event.preventDefault();
        this.setState({dueDate: event.target.value});
    }
    
    handleDescriptionChange(event) {
        event.preventDefault();
        this.setState({assignmentDescription: event.target.value});
    }
    
    submitAssignment() {
        let uri = '/api/new-assignment/' + this.props.loggedUser;
        let assignment = {
            name: this.state.assignmentName,
            className: this.state.className,
            dueDate: this.state.dueDate,
            classDescription: this.state.assignmentDescription
            
        };
        axios.post(uri, assignment).then(response => {
            console.log(response);
            this.props.appStateSet("viewer");
        }).catch(error => {
            console.log(error);
        });
    }
    
    cancelAssignment() {
        {this.props.appStateSet("viewer")}
    }
    
    render() {
        return (
            <div class="overview">
                <h1 class='input-title'>Add Assignment</h1>
                <div class="input-boxes">
                    <div class="input-group">
                        <p class='input-label'>Name of Assignment</p>
                        <input class='input-assignment-box' type="text" value={this.state.assignmentName} onChange={this.handleAssignmentNameChange}/>
                    </div>
                    <div class="input-group">
                        <p class='input-label'>Class Name</p>
                        <input class='input-assignment-box' type="text" value={this.state.className} onChange={this.handleClassNameChange} />
                    </div>
                    <div class="input-group">
                        <p class='input-label'>Due Date</p>
                        <input class='input-assignment-box' type="text" value={this.state.dueDate} onChange={this.handleDueDateChange} />
                    </div>
                    <div class="input-group">
                        <p class='input-label'>Description</p>
                        <input class='input-assignment-box' type="text" value={this.state.assignmentDescription} onChange={this.handleDescriptionChange} />
                    </div>
                </div>
                <div class="home_buttons">
                    <button class='input-button' onClick={this.submitAssignment}>Submit</button>
                    <button class='input-button' onClick={this.cancelAssignment}>Cancel</button>
                </div>
            </div>
        
        );
    }
}

export default AddAssignment;