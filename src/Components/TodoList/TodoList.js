import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './TodoList.css';
import '../../CSS/commonStyle.css';

// TODO - Split the fetchTodos into a seperate function
// TODO - Add a completed vs not yet completed chart

const Todo = props => (
    <tr style={{ color: 'white' }}>
        <td>{props.todo.todoDescription}</td>
        <td>{props.todo.todoResponsible}</td>
        <td>{props.todo.todoPriority}</td>
        <td>{String(props.todo.todoCompleted)}</td>
        <td>
            <Link to={"/todos/edit/" + props.todo._id}>Edit</Link> | <a href="# " onClick={() => { props.deleteTodo(props.todo._id) }}>Delete</a>
        </td>
    </tr>
)

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        axios.get('/api/todos')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => console.log(err));
    }

    deleteTodo(id) {
        axios.delete('/api/todos/delete/' + id)
            .then(() => {
                this.setState({
                    todos: this.state.todos.filter(ele => ele._id !== id)
                });
            })
    }

    todoList() {
        return this.state.todos.map(
            (todo) => {
                return <Todo todo={todo} key={todo._id} deleteTodo={this.deleteTodo} />
            }
        )
    }

    render() {
        let textColor = 'white';

        return (
            <div className="background">
                <h1 className="headingStyle" style={{ color: textColor }}>To-do List</h1>
                <div className="container">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th>Description</th>
                                <th>Responsible</th>
                                <th>Priority</th>
                                <th>Completed?</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.todoList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}