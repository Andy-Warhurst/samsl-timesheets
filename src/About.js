import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.1.3 - Fixed Dependancies, and reduced vulnerabilities
            </p>
            <p>
                Date: 29 November 2025
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
