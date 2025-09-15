import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.1.2 - Added rounds for cup and plate semi-finals
            </p>
            <p>
                Date: 15 September 2025
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
