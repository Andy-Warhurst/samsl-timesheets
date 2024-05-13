import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 0.3
            </p>
            <p>
                Date: 13 May 2024
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
