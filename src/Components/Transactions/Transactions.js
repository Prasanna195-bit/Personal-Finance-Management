import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

import './Transactions.css';
import '../../CSS/Chart.css';
import '../../CSS/commonStyle.css';
import prepareTransactionsChartData from '../../Processing/prepareTransactionsChartData';
import fetchTransactions from '../../Processing/fetchTransactions';


// TODO - Add edit transaction functionality
const Transaction = props => (
    <tr style={{ color: 'white' }}>
        <td>{props.transaction.transactionDate.substring(0, 10)}</td>
        <td>{props.transaction.transactionType}</td>
        <td>{props.transaction.amount}</td>
        <td>{props.transaction.description}</td>
        <td>
            <Link to={"/transactions/edit/" + props.transaction._id}>Edit</Link> | <a href="# " onClick={() => { props.deleteTransaction(props.transaction._id) }}>Delete</a>
        </td>
    </tr>
);

export default class Transactions extends Component {
    constructor(props) {
        super(props);

        this.deleteTransaction = this.deleteTransaction.bind(this);

        this.state = {
            transactions: [],
            chartData: []
        }
    }


    componentDidMount() {
        fetchTransactions().then(response => {
            this.setState({ transactions: response.data });

            // Preparing chart data
            let cData = prepareTransactionsChartData(this.state.transactions, "Transactions");
            this.setState({
                chartData: cData
            })
        })
    }

    deleteTransaction(id) {
        axios.delete('/api/transactions/delete/' + id)
            .then(res => {
                this.setState({
                    transactions: this.state.transactions.filter(ele => ele._id !== id)
                });

                // Refresh chart data
                let cData = prepareTransactionsChartData(this.state.transactions);
                this.setState({
                    chartData: cData
                });
            });
    }

    transactionList() {
        return this.state.transactions.map(currentTransaction => {
            return <Transaction transaction={currentTransaction} key={currentTransaction._id} deleteTransaction={this.deleteTransaction} />;
        });
    }

    render() {
        let textColor = 'white';

        return (
            <div className='transactionview-background'>
                <div className='charts'>
                    <h1 className="headingStyle" style={{ color: textColor }}>Transactions</h1>
                    <Doughnut data={this.state.chartData} />
                </div>
                <div className='container'>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Transaction Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.transactionList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}