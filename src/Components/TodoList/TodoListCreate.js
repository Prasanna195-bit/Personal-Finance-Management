import React, { Component } from 'react';
import axios from 'axios';

import '../../CSS/commonStyle.css';
import './TodoList.css';

export default class TodoListCreate extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todoDescription: "",
            todoResponsible: "",
            todoPriority: "",
            todoCompleted: false
        }
    }

    onChangeTodoDescription = e => {
        this.setState({ todoDescription: e.target.value });
    }

    onChangeTodoResponsible = e => {
        this.setState({ todoResponsible: e.target.value });
    }

    onChangeTodoPriority = e => {
        this.setState({ todoPriority: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newTodo = {
            todoDescription: this.state.todoDescription,
            todoResponsible: this.state.todoResponsible,
            todoPriority: this.state.todoPriority,
            todoCompleted: this.state.todoCompleted
        }

        axios.post('/api/todos/add', newTodo)
            .then(res => console.log(res.data));
    }

    render() {
        let textColor = 'white';

        return (
            <div className="background">
                <h1 className="headingStyle" style={{ color: textColor }}>Create New Todo task</h1>
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

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}