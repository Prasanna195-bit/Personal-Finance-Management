import React, { Component } from 'react';
import '../../CSS/commonStyle.css';

const Row = props => (
    <tr>
        <td>{props.dayCount}</td>
        <td>{props.dayCount + 1}</td>
        <td>{props.dayCount + 2}</td>
        <td>{props.dayCount + 3}</td>
        <td>{props.dayCount + 4}</td>
        <td>{props.dayCount + 5}</td>
        <td>{props.dayCount + 6}</td>
    </tr>
)

export default class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="headingStyle">New York City</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Row dayCount={0} />
                        <Row dayCount={8} />
                        <Row dayCount={15} />
                        <Row dayCount={22} />
                    </tbody>
                </table>

            </div>
        )
    }
}