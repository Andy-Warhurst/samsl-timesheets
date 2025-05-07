import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.1.0 - Added Mobile Layouts
            </p>
            <p>
                Date: 7 May 2025
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
