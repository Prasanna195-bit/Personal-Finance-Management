import React from 'react';
import './About.css';


const About = () => {
    let textAlign = "center";
    let margin = "auto";

    return (
        <div className="aboutContainer">
            <div className="aboutContents">
                <br />
                <h2 style={{ margin: margin, textAlign: textAlign, paddingBottom: "100px" }}>Creators</h2>
                <p id="creators" style={{ margin: margin, textAlign: textAlign }}>Santhosh C P &nbsp; & &nbsp; Prasanna Ganapathi S</p>
                <br />
                <p id="contents" style={{ margin: margin, textAlign: textAlign }}>
                    Personal Finance Management Software provides a comprehensive suite of budgeting tools required to manage day-to-day finances.<br />
                    Budgeting plays a major role in managing one's assets and helps in optimal usage of money.
                    Textual representation of data is often hard to understand.Charts & graphs help show the data in a easy-to-comprehend manner.
                    </p>
            </div>
        </div>
    );
}
export default About;