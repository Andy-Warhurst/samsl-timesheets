import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 0.6
            </p>
            <p>
                Date: 11 June 2024
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
