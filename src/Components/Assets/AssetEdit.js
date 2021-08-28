import React, { Component } from 'react';
import axios from 'axios';
import './Assets.css';
import '../../CSS/commonStyle.css';

export default class EditComponent extends Component {
    constructor(props) {
        super(props);

        this.onChangeAssetName = this.onChangeAssetName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: "0",
            assetName: "",
            amount: 0,
            lastUpdated: new Date(),
            displayMessage: "",

        }
    }

    componentDidMount() {
        let urlSplitValues = window.location.pathname.split('/');
        let _id = urlSplitValues[3];
        console.log("id = " + _id);

        // Fetch the asset which matches the given _id
        axios.get('/api/assets/get/' + _id)
            .then(res => {
                this.setState({
                    id: _id,
                    assetName: res.data.assetName,
                    amount: Number(res.data.amount),
                });
            })
            .catch(err => console.log("Asset Edit GET Error -" + err));
    }

    //onChange Methods
    onChangeAssetName(e) {
        this.setState({
            assetName: e.target.value
        });
    }
    onChangeAmount(e) {
        this.setState({
            amount: Number(e.target.value)
        });
    }

    onSubmit(e) {
        e.preventDefault();

        // Creating an asset json object
        const asset = {
            assetName: this.state.assetName,
            amount: this.state.amount,
            lastUpdated: this.state.lastUpdated
        };

        // Sending it to server
        axios.post('/api/assets/update/' + this.state.id, asset)
            .then(res => {
                console.log(res.data);
                let message = "Asset updated successfully!";
                this.setState({
                    displayMessage: message
                });
            })
            .catch(err => console.log("Asset Edit UPDATE POST Error - " + err));
    }


    render() {
        let textColor = 'white';
        let formMarginTop = '50px';
        let formMarginLeft = '50px';
        let inputBoxWidth = '600px';

        return (
            <div className="assetcreate-background">
                <h1 className="headingStyle" style={{ color: textColor }}>Add New Asset</h1>
                <form onSubmit={this.onSubmit} style={{ marginTop: formMarginTop, marginLeft: formMarginLeft }}>
                    <div className="form-group">
                        <label style={{ color: textColor }}>Asset Name: </label>
                        <input type="text" className="form-control" value={this.state.assetName} onChange={this.onChangeAssetName} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: textColor }}>Current Value: </label>
                        <input type="text" className="form-control" value={this.state.amount} onChange={this.onChangeAmount} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Asset" className="btn btn-primary" />
                        < h3 style={{ color: 'white', paddingTop: '20px' }}>{this.state.displayMessage}</h3>
                    </div>

                </form>
            </div >
        )
    }
}