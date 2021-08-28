import React, { Component } from 'react';
import axios from 'axios';

import '../../CSS/commonStyle.css';
import './TodoList.css';

// Probably needs reworking 

export default class TodoListEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            todoDescription: '',
            todoResponsible: '',
            todoPriority: '',
            todoCompleted: false
        }
    }

    componentDidMount() {
        let splitValues = window.location.pathname.split('/');
        let _id = splitValues[3]; // Last value is the id
        console.log(_id);
        axios.get('/api/todos/get/' + _id)
            .then(res => {
                this.setState({
                    id: _id,
                    todoDescription: res.data.todoDescription,
                    todoResponsible: res.data.todoResponsible,
                    todoPriority: res.data.todoPriority,
                    todoCompleted: res.data.todoCompleted
                })
            })
            .catch(err => console.log(err));
    }

    onChangeTodoDescription = (e) => {
        this.setState({
            todoDescription: e.target.value
        });
    }

    onChangeTodoResponsible = (e) => {
        this.setState({
            todoResponsible: e.target.value
        });
    }

    onChangeTodoPriority = (e) => {
        this.setState({
            todoPriority: e.target.value
        });
    }

    onChangeTodoCompleted = (e) => {
        this.setState({
            todoCompleted: !this.state.todoCompleted
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            todoDescription: this.state.todoDescription,
            todoResponsible: this.state.todoResponsible,
            todoPriority: this.state.todoPriority,
            todoCompleted: this.state.todoCompleted
        };
        axios.post('/api/todos/update/' + this.state.id, obj)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error - " + err));
    }

    render() {
        let textColor = 'white';
        return (
            <div className="background">
                <h1 className="headingStyle" style={{ color: textColor }}>Update Todo Entry</h1>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{ color: textColor }}>Description:</label>
                        <input type="text" className="form-control" value={this.state.todoDescription} onChange={this.onChangeTodoDescription} style={{ width: '400px' }} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: textColor }}>Responsible:</label>
                        <input type="text" className="form-control" value={this.state.todoResponsible} onChange={this.onChangeTodoResponsible} style={{ width: '400px' }} />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="Low"
                                checked={this.state.todoPriority === "Low"} onChange={this.onChangeTodoPriority} />
                            <label className="form-check-label" style={{ color: textColor }}>Low</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium"
                                checked={this.state.todoPriority === "Medium"} onChange={this.onChangeTodoPriority} />
                            <label className="form-check-label" style={{ color: textColor }}>Medium</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High"
                                checked={this.state.todoPriority === "High"} onChange={this.onChangeTodoPriority} />
                            <label className="form-check-label" style={{ color: textColor }}>High</label>
                        </div>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="completedCheckbox" name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted} checked={this.state.todoCompleted} value={this.state.todoCompleted} />
                        <label className="form-check-label" htmlFor="completedCheckbox" style={{ color: textColor }}>Completed</label>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}