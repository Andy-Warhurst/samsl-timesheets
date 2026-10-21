import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.1.5 - Realignment
            </p>
            <p>
                Date: 21 October 2026
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
