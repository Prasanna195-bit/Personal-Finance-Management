import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import fetchUsers from '../../Processing/fetchUsers';
//import LoginValidator from './LoginValidator.component';

import './CSS/LoginPage.css';


// TODO - Major Refactoring needed

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    let authenticated = false;
    this.state = {
      users: [],
      username: "",
      password: "",
      displayMessage: "",
      authenticated
    }
  }

  async componentDidMount() {
    fetchUsers()
      .then(response => {
        this.setState({
          users: response.data
        });
      });
  }

  // onChange Methods
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    // Authenticating Username & Password
    this.state.users.forEach(user => {
      if (user.username === this.state.username && user.password === this.state.password) {
        console.log("Username & Password Match!");
        this.setState({
          authenticated: true
        })
      }
    });

    // Incorrect Password
    if (!this.state.authenticated) {
      let message = "Invalid Username or Password";
      this.setState({
        displayMessage: message
      })
    }
  }

  render() {
    let textColor = 'white';
    console.log("auth status = ", this.state.authenticated);

    // If authenticated
    if (this.state.authenticated) {
      return <Redirect to={{pathname: '/dashboard/', username: this.state.username}} />
    }

    // If not authenticated
    return (
      <div className="MainContainer">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" ><i className="fas fa-user"></i></span>
                  </div>
                  <input type="text" id="username" className="form-control" placeholder="username" value={this.state.username} required onChange={this.onChangeUsername} />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input type="password" className="form-control" id="password" placeholder="password" value={this.state.password} required onChange={this.onChangePassword} />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />Remember Me
                </div>
                <div className="form-group" name="LoginButton">
                  {
                    /*
                                      <Link to="/dashboard">
                    <button type="button" className="btn btn-primary">Login</button>
                  </Link>
                    */
                  }
                  <input type="submit" value="Login" className="btn btn-primary" />
                  <h4 style={{ color: textColor }} > {this.state.displayMessage}</h4>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center">
                <Link to="/register">
                  <a href="# " color="white">Register</a>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}