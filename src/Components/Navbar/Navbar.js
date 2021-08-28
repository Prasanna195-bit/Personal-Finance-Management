import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark  navbar-expand-lg" style={{background:'black'}}>
                <Link to="/" className="navbar-brand">PersFinance</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">

                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">Login Page</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/assets/" className="nav-link">Asset View</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/assets/create/" className="nav-link">Create Asset</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/transactions" className="nav-link">Transaction View</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/transactions/create" className="nav-link">Create Transaction</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/advisor" className="nav-link">Financial Advisor</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/todos" className="nav-link">To-do List</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/todos/create" className="nav-link">Create To-do</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                        
                        <li className="navbar-item">
                            <Link to="/about" className="nav-link">About Us</Link>
                        </li>

                        {/*
                        <li className="navbar-item">
                            <Link to="/calendar" className="nav-link">Calendar</Link>
                        </li>   
                        
                        <li className="navbar-item">
                            <Link to="/credit" className="nav-link">Credits</Link>
                        </li>
                        */}
                    </ul>
                </div>
            </nav>
        )
    }
}