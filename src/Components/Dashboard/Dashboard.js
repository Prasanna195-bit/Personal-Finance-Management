import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

import fetchAssets from '../../Processing/fetchAssets';
import prepareAssetsChartData from '../../Processing/prepareAssetsChartData';
import fetchTransactions from '../../Processing/fetchTransactions';
import prepareTransactionsChartData from '../../Processing/prepareTransactionsChartData';
import '../../CSS/Chart.css';
import './Dashboard.css';


import bgimg from './Images/pavel-neznanov-v8UxS3y9uXI-unsplash.jpg';

const customStyle = {
    backgroundImage: 'url(' + bgimg + ')',
    backgroundSize: 'cover',
    height: '95vh',
}

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        console.log("Redirect props = ", this.props.location.username);

        this.state = {
            transactions: [],
            assets: [],
            assetsChartData: {},
            transactionsChartData: {},
            username: this.props.location.username
        }
    }

    async componentDidMount() {
        // Fetching & preparing chart data for the assets
        fetchAssets().then(response => {
            this.setState({ assets: response.data });

            let cData = prepareAssetsChartData(this.state.assets);
            this.setState({
                assetsChartData: cData
            })
        })
            .catch((err) => { console.log("Error - " + err) });

        // Fetching & preparing chart data for the transactions
        fetchTransactions().then(response => {
            this.setState({ transactions: response.data });

            let cData = prepareTransactionsChartData(this.state.transactions);
            this.setState({
                transactionsChartData: cData
            })
        })
            .catch((err) => { console.log("Error - " + err) });
    }

    render() {
        let chartWidthValue = '50%';

        return (
            <div className="sidebyside" style={customStyle}>
                <h1 className="headingStyle">Dashboard</h1>
                <h3 className="headingStyle">Welcome {this.state.username}!</h3>
                <div className="sideDiv" style={{ width: chartWidthValue }}>
                    <Doughnut data={this.state.assetsChartData} />
                    <h5 className="chartName">Assets</h5>
                </div>
                <div className="sideDiv" style={{ width: chartWidthValue }}>
                    <Doughnut data={this.state.transactionsChartData} />
                    <h5 className="chartName">Transactions</h5>
                </div>
            </div>
        )
    }
}