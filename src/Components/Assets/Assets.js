import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';

import './Assets.css';
import '../../CSS/Chart.css';
import '../../CSS/commonStyle.css';
import fetchAssets from '../../Processing/fetchAssets';
import prepareAssetsChartData from '../../Processing/prepareAssetsChartData';

const Asset = props => (
    <tr style={{ color: 'white' }}>
        <td>{props.asset.assetName}</td>
        <td>{props.asset.amount}</td>
        <td>{props.asset.lastUpdated.substring(0, 10)}</td>
        <td>
            <Link to={"/assets/edit/" + props.asset._id} className='white'>Edit</Link> | <a href="# " onClick={() => { props.deleteAsset(props.asset._id) }}>Delete</a>
        </td>
    </tr>
);

export default class Assets extends Component {
    constructor(props) {
        super(props);

        this.deleteAsset = this.deleteAsset.bind(this);

        this.state = {
            assets: [],
            chartData: []
        };
    }

    async componentDidMount() {
        fetchAssets().then(response => {
            this.setState({ assets: response.data });

            // preparing chart data
            let cData = prepareAssetsChartData(this.state.assets, "Assets");
            this.setState({
                chartData: cData
            });
        })
    }

    deleteAsset(id) {
        axios.delete('/api/assets/delete/' + id)
            .then(res => {
                this.setState({
                    assets: this.state.assets.filter(ele => ele._id !== id)
                });
                
                // Refreshing chart data
                let cData = prepareAssetsChartData(this.state.assets);
                this.setState({
                    chartData: cData
                });
            });
    }

    assetList() {
        return this.state.assets.map(currentAsset => {
            return <Asset asset={currentAsset} deleteAsset={this.deleteAsset} key={currentAsset._id} />;
        });
    }

    render() {
        let textColor = 'white';

        return (
            <div className="AssetViewContainer">
                <h1 className="headingStyle" style={{ color: textColor}}>Assets</h1>

                <div className="charts">
                    <Doughnut data={this.state.chartData}/>
                    <h4 style={{ color: textColor, textAlign: 'center' }}>Asset Allocation</h4>
                </div>

                <div className='container'>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Asset Name</th>
                                <th>Amount</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.assetList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}