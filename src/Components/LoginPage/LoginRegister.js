import React, { Component } from 'react';
import axios from 'axios';
import './CSS/LoginRegister.css'
// TODO - WARNING occurs for 'for' property. Change or remove it

export default class LoginRegister extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			displayMessage: "",
		}
	}

	// onChange Methods
	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}
	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		});
	}
	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}
	onChangeConfirmPassword(e) {
		this.setState({
			confirmPassword: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		console.log("In submit");

		// Checks if all the fields are filled
		if (this.state.username !== "" && this.state.password !== "" && this.state.confirmPassword !== "" && this.state.email !== "") {
			// Checks if password & confirm password matches
			if (this.state.password === this.state.confirmPassword) {
				// Creating user json object
				const user = {
					username: this.state.username,
					password: this.state.password,
					email: this.state.email
				};

				// Sending the data to the DB via POST request
				axios.post('/api/users/add', user)
					.then(() => {
						let message = "New User '" + this.state.username + "' added successfully!";
						this.setState({
							displayMessage: message
						});
					})
					.catch(err => console.log("Registration POST Error - " + err));
			}
			else {
				let message = "Password mismatch. Please enter the same password for both the fields";
				this.setState({
					displayMessage: message
				});
			}
		}
		else {
			let message = "Please fill all the fields";
			this.setState({
				displayMessage: message
			})
		}
	}



	render() {
		let textColor = 'white';

		return (
			<div className=" registerBackground ">
				<div className="page-content">
					<div className="form-v2-content">

						<form className="form-detail" style={{ marginTop: '0px' }} onSubmit={this.onSubmit}>
							<h2 style={{ color: textColor,marginTop:'20%' }}>Registration Form</h2>
							<br/>
							<div className="form-row">
								<label style={{ color: textColor,fontWeight:'bold' }} for="name">Username:</label>
								<input type="text" name="name" style={{marginLeft:'5%'}} id="name" className="input-text" value={this.state.username} onChange={this.onChangeUsername} />
							</div>
							<div className="form-row">
								<label style={{ color: textColor,fontWeight:'bold'}} for="email">Email:</label>
								<input type="email" name="email" style={{marginLeft:'16%',marginTop:'2%'}} id="email" className="input-text" required value={this.state.email} onChange={this.onChangeEmail} />
							</div>
							<div className="form-row">
								<label style={{ color: textColor,fontWeight:'bold' }} for="password">Password:</label>
								<input type="password" name="password" style={{marginLeft:'7%',marginTop:'2%'}} id="password" className="input-text" required value={this.state.password} onChange={this.onChangePassword} />
							</div>
							<div className="form-row">
								<label style={{ color: textColor,marginLeft:'-20%',marginRight:'17%',fontWeight:'bold' }} for="confirm-password">Confirm Password:</label>
								<input type="password" name="confirm_password" style={{marginLeft:'-10%',marginTop:'2%'}} id="confirm_password" className="input-text" required value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} />
							</div>

							<div className="form-row">
								<input type="submit" name="register" className="register" style={{marginLeft:'28%'}} value="Register" />
								<h3 style={{ color: textColor }}>{this.state.displayMessage}</h3>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}