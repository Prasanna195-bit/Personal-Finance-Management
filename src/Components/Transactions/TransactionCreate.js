import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './Transactions.css';
import '../../CSS/commonStyle.css';

export default class transactionCreate extends Component {
    constructor(props) {
        super(props);

        this.onChangeTransactionDate = this.onChangeTransactionDate.bind(this);
        this.onChangeTransactionType = this.onChangeTransactionType.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickAddAnotherTransaction = this.onClickAddAnotherTransaction.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.onClickClearForm = this.onClickClearForm.bind(this);

        let addOnlyOneTransaction = false
        this.state = {
            transactionDate: new Date(),
            transactionType: "",
            amount: 0,
            description: "",
            transactions: [],
            displayMessage: "",
            addOnlyOneTransaction
        }
    }

    // onChange Methods
    onChangeTransactionDate(date) {
        this.setState({
            transactionDate: date.target.valueAsDate
        });
    }
    onChangeTransactionType(e) {
        this.setState({
            transactionType: e.target.value
        });
    }
    onChangeAmount(e) {
        this.setState({
            amount: Number(e.target.value)
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        console.log(this.state.transactionDate);

        // Validating if the user has entered data
        if (this.state.transactionType !== "" && this.state.amount !== 0) {
            const transaction = {
                transactionDate: this.state.transactionDate,
                transactionType: this.state.transactionType,
                amount: this.state.amount,
                description: this.state.description
            }

            axios.post('/api/transactions/add', transaction)
                .then(() => {
                    // Redirect back to Transaction View
                    this.setState({
                        addOnlyOneTransaction: true
                    })
                }).catch((err) => { console.log("Error - " + err) });
        }

        else {
            let message = "Please enter the complete details before adding a new transaction";
            this.setState({
                displayMessage: message
            });
        }


    }

    onClickAddAnotherTransaction(e) {
        e.preventDefault();

        // Validating if the user has entered data
        if (this.state.transactionType !== "" && this.state.amount !== 0) {
            const transaction = {
                transactionDate: this.state.transactionDate,
                transactionType: this.state.transactionType,
                amount: this.state.amount,
                description: this.state.description
            }

            axios.post('/api/transactions/add', transaction)
                .then(() => {
                    let message = "Success - " + this.state.transactionType + " Transaction of amount " + this.state.amount + " added successfully!";
                    this.setState({
                        displayMessage: message
                    });

                    this.clearForm();
                }).catch((err) => { console.log("Error - " + err) });
        }

        else {
            let message = "Please enter the complete details before adding a new transaction";
            this.setState({
                displayMessage: message
            });
        }


    }

    clearForm() {
        this.setState({
            transactionDate: "",
            transactionType: "",
            amount: 0,
            description: ""
        });
    }

    onClickClearForm(e) {
        this.clearForm();
        this.setState({
            displayMessage: "Form Cleared!"
        });
    }

    render() {
        let textColor = 'white';
        let inputBoxWidth = '600px';

        if (this.state.addOnlyOneTransaction) {
            return <Redirect to='/transactions/' />;
        }
        return (
            <div className="transactioncreate-background">
                <h1 className="headingStyle" style={{ color: textColor }}>Add New Transaction</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{ color: textColor }}>Transaction Date: </label>
                        <input type="date" className='form-control' onChange={this.onChangeTransactionDate} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: textColor }}>Transaction Type: </label>
                        <input type="text" className='form-control' value={this.state.transactionType} onChange={this.onChangeTransactionType} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: textColor }}>Amount: </label>
                        <input type="text" className="form-control" value={this.state.amount} onChange={this.onChangeAmount} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: textColor }}>Description: </label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add New Transaction" className="btn btn-primary" />
                        <input type="button" value="Add Another Transaction" className="btn btn-primary buttonSideBySide" onClick={this.onClickAddAnotherTransaction} />
                        <input type="button" value="Clear Form" className="btn btn-primary buttonSideBySide" onClick={this.onClickClearForm} />
                        <h3 style={{ color: 'white', paddingTop: '20px' }}>{this.state.displayMessage}</h3>
                    </div>
                </form>
            </div>
        );
    }
}