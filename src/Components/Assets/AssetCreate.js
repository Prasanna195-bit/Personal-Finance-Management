import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './Assets.css';
import '../../CSS/commonStyle.css';

export default class CreateAsset extends Component {
    constructor(props) {
        super(props);

        this.onChangeAssetName = this.onChangeAssetName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeLastUpdated = this.onChangeLastUpdated.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickAddAnotherAsset = this.onClickAddAnotherAsset.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.onClickClearForm = this.onClickClearForm.bind(this);

        let addOnlyOneAsset = false
        this.state = {
            assetName: "",
            amount: 0,
            lastUpdated: new Date(),
            assets: [],
            displayMessage: "",
            addOnlyOneAsset
        }
    }

    // onChange Methods
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
    onChangeLastUpdated(date) {
        this.setState({
            lastUpdated: date
        });
    }

    onSubmit(e) {
        e.preventDefault();  // Prevents default HTML submit action from taking place

        const asset = {
            assetName: this.state.assetName,
            amount: this.state.amount,
            lastUpdated: new Date()
        };

        // Sending the data to the DB via a POST Request
        axios.post('/api/assets/add', asset)
            .then(() => {
                // We will redirect back to the Asset View 
                this.setState({
                    addOnlyOneAsset: true
                })
            }).catch((err) => { console.log("Error - " + err) });


    }

    onClickAddAnotherAsset(e) {
        e.preventDefault();  // Prevents default HTML submit action from taking place

        const asset = {
            assetName: this.state.assetName,
            amount: this.state.amount,
            lastUpdated: new Date()
        };

        // Sending the data to the DB via a POST Request
        axios.post('/api/assets/add', asset)
            .then(() => {
                let message = "Success - '" + this.state.assetName + "' asset added successfully!";
                this.setState({
                    displayMessage: message
                })

                // Clear form
                this.clearForm();
            }).catch((err) => { console.log("Error - " + err) });
    }

    clearForm() {
        this.setState({
            assetName: "",
            amount: 0,
        });
    }

    onClickClearForm(e) {
        this.clearForm();
        this.setState({
            displayMessage: "Form cleared!"
        })
    }


    render() {
        let textColor = 'white';
        let formMarginTop = '50px';
        let formMarginLeft = '50px';
        let inputBoxWidth = '600px';

        if (this.state.addOnlyOneAsset) {
            return <Redirect to='/assets/' />;
        }

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
                        <input type="submit" value="Add New Asset" className="btn btn-primary" />
                        <input type="button" value="Add Another Asset" className="btn btn-primary buttonSideBySide" onClick={this.onClickAddAnotherAsset} />
                        <input type="button" value="Clear Form" className="btn btn-primary buttonSideBySide" onClick={this.onClickClearForm} />
                        < h3 style={{ color: textColor, paddingTop: '20px' }}>{this.state.displayMessage}</h3>
                    </div>

                </form>
            </div >
        )
    }
}