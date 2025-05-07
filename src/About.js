import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.0.9 - Mobile Device Modifications - Enable Printing
            </p>
            <p>
                Date: 7 May 2025
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
