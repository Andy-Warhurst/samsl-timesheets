import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 0.2
            </p>
            <p>
                Date: 2 May 2024
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
