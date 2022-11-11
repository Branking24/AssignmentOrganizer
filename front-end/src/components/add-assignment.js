import React from 'react';

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
        
    }
    
    cancelAssignment() {
        
    }
    
    render() {
        return (
            <div class="overview">
                <h1>Add Assignment</h1>
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

export default AddAssignment;