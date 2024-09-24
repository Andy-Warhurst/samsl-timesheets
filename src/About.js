import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.03
            </p>
            <p>
                Date: 24 Spetember 2024
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
