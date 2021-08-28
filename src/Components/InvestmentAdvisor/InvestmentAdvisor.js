import React, { Component } from 'react';
import axios from 'axios';
import './CSS/InvestmentAdvisor.css';
import '../../CSS/commonStyle.css';

// TODO - round the displayed values to 2 significant digits after the decimal
// TODO - Allow the user to select the equity and debt from the assets

const Advise = props => {
    let textColor = 'white';
    let marginTopValue = '25px';

    return (
        <div style={{ marginTop: marginTopValue }}>
            <h5 style={{ color: textColor }}>Advisory</h5>
            <p style={{ color: textColor }}>Percentage Invested in Equity = {props.actualEquityPercent}</p>
            <p style={{ color: textColor }}>Expected Percentage to be invested in Equity = {props.expectedEquityPercent}</p>
            <p style={{ color: textColor }}>{props.advisory}</p>
        </div>
    )
}

export default class InvestmentAdvisor extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeEquity = this.onChangeEquity.bind(this);
        this.onChangeDebt = this.onChangeDebt.bind(this);

        this.state = {
            assets: [],
            age: 0,
            equity: 0,
            debt: 0,
            advisory: "",
            actualEquityPercent: 0,
            expectedEquityPercent: 0,
            pageTextColor: 'white'
        }
    }

    componentDidMount() {
        axios.get("/assets")
            .then(response => {
                this.setState({ assets: response.data })
            })
            .catch((err) => { console.log("Error - " + err) });
    }

    onSubmit(e) {
        e.preventDefault();

        let leyway = 5; // The leyway in the allocation percentages

        this.setState({
            expectedEquityPercent: 100 - this.state.age,
            actualEquityPercent: (this.state.equity / (this.state.equity + this.state.debt) * 100)
        });


        if (Math.floor(this.state.expectedEquityPercent) > Math.floor(this.state.actualEquityPercent + leyway)) {
            this.setState({
                advisory: "Your current equity allocation is less than the recommended percentage for your age. More allocation to equity assets might generate more returns on investment"
            });
        }
        else if (Math.floor(this.state.expectedEquityPercent) < Math.floor(this.state.actualEquityPercent) - leyway) {
            this.setState({
                advisory: "Your currently equity allocation is more than the recommended percentage for your age. More allocation to debt assets is suggested to reduce the risk factor"
            });
        }
        else {
            this.setState({
                advisory: "Your currently allocation of equity-debt is optimal for your age. No portfolio rebalancing required!"
            });
        }
    }
    onChangeAge(e) {
        this.setState({
            age: Number(e.target.value)
        });
    }
    onChangeEquity(e) {
        this.setState({
            equity: Number(e.target.value)
        });
    }
    onChangeDebt(e) {
        this.setState({
            debt: Number(e.target.value)
        });
    }

    render() {
        let textColor = this.state.pageTextColor;
        let marginTopValue = '50px';
        let inputBoxWidth = '400px';

        return (
            <div className="background-container">
                <div className="contents">
                    <h1 className="headingStyle" style={{ color: textColor }}>Financial Advisor</h1>
                    <h5 style={{ color: textColor }}>The '100 minus your age' Rule</h5>
                    <p style={{ color: textColor }}>
                        Figuring out how to best allocate your investing portfolio is not always easy.
                        A simple yet effective financial investing rule is the '100 minus your age' rule
                    </p>
                    <p style={{ color: textColor }}>
                        Essentially, we subtract a person's age from 100. The resulting number is the percentage of assets that should be invested in equities
                    </p>
                    <p style={{ color: textColor }}>
                        The remaining percentage is allocated to safer assets such as Debt funds, Government bonds, among others.
                </p>
                </div>

                <form onSubmit={this.onSubmit} style={{ marginTop: marginTopValue }}>
                    <div className="form-group">
                        <label style={{ color: textColor }}>Enter your age: </label>
                        <input type="text" className="form-control" value={this.state.age} onChange={this.onChangeAge} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: textColor }}>Enter the amount currently invested in Equities</label>
                        <input type="text" className="form-control" value={this.state.equity} onChange={this.onChangeEquity} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: textColor }}>Enter the amount currently invested in Debt assets</label>
                        <input type="text" className="form-control" value={this.state.debt} onChange={this.onChangeDebt} style={{ width: inputBoxWidth }} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Evaluate Investments" className="btn btn-primary" onClick={this.onSubmit} style={{ width: inputBoxWidth }} />
                    </div>

                    <Advise actualEquityPercent={this.state.actualEquityPercent} expectedEquityPercent={this.state.expectedEquityPercent} advisory={this.state.advisory} />
                </form>
            </div>
        )
    }
}




