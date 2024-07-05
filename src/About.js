import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.01
            </p>
            <p>
                Date: 5 July 2024
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
