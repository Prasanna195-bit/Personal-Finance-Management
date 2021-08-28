import React, { Component } from 'react';
import axios from 'axios';

import '../../CSS/commonStyle.css';
import './Transactions.css';

export default class TransactionEdit extends Component {
    constructor(props) {
        super(props);

        this.onChangeTransactionDate = this.onChangeTransactionDate.bind(this);
        this.onChangeTransactionType = this.onChangeTransactionType.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: "0",
            transactionDate: new Date(),
            transactionType: "",
            amount: 0,
            description: "",
            transactions: [],
            displayMessage: "",
        }
    }

    componentDidMount() {
        let splitValues = window.location.pathname.split('/');
        let _id = splitValues[3];
        console.log("id = " + _id);

        // Fetching the transaction which matches the _id
        axios.get('/api/transactions/get/' + _id)
            .then(res => {
                this.setState({
                    id: _id,
                    transactionDate: Date.parse(res.data.transactionDate),
                    transactionType: res.data.transactionType,
                    amount: res.data.amount,
                    description: res.data.description,
                });
            })
            .catch(err => console.log("Transaction Edit GET Error - " + err));
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
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Creating a transaction json object
        const transaction = {
            transactionDate: this.state.transactionDate,
            transactionType: this.state.transactionType,
            amount: this.state.amount,
            description: this.state.description
        };

        // Sending it to server
        axios.post('/api/transactions/update/' + this.state.id, transaction)
            .then(res => {
                console.log(res.data);
                let message = "Transaction updated successfully!";
                this.setState({
                    displayMessage: message
                });
            })
            .catch(err => console.log("Transaction Edit UPDATE POST Error - " + err));

    }

    render() {
        let textColor = 'white';
        let inputBoxWidth = '600px';

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
                        <input type="submit" value="Update Transaction" className="btn btn-primary" />
                        <h3 style={{ color: 'white', paddingTop: '20px' }}>{this.state.displayMessage}</h3>
                    </div>
                </form>
            </div>
        );
    }
}