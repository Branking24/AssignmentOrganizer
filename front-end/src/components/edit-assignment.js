import React from 'react';
import axios from 'axios';

class EditAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          assignmentName: this.props.currAssignment.name,
          className: this.props.currAssignment.className,
          dueDate: this.props.currAssignment.dueDate,
          assignmentDescription: this.props.currAssignment.description
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
        let uri = '/api/assignments/' + this.props.loggedUser + '/' + this.props.currAssignment.assignment_id;
        let assignment = {
            name: this.state.assignmentName,
            className: this.state.className,
            dueDate: this.state.dueDate,
            classDescription: this.state.assignmentDescription
            
        };
        axios.put(uri, assignment).then(response => {
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
                <h1>Edit Assignment</h1>
                <div class="input-boxes">
                    <div class="input-group">
                        <p>Name of Assignment:</p>
                        <input type="text" value={this.state.assignmentName} onChange={this.handleAssignmentNameChange}/>
                    </div>
                    <div class="input-group">
                        <p>Class Name:</p>
                        <input type="text" value={this.state.className} onChange={this.handleClassNameChange} />
                    </div>
                    <div class="input-group">
                        <p>Due Date:</p>
                        <input type="text" value={this.state.dueDate} onChange={this.handleDueDateChange} />
                    </div>
                    <div class="input-group">
                        <p>Description:</p>
                        <input type="text" value={this.state.assignmentDescription} onChange={this.handleDescriptionChange} />
                    </div>
                </div>
                <div class="submit-buttons">
                    <button onClick={this.submitAssignment}>Submit</button>
                    <button onClick={this.cancelAssignment}>Cancel</button>
                </div>
            </div>
        
        );
    }
}

export default EditAssignment;