import {
    Link,
} from "react-router-dom";
import * as React from "react";

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>
                Version: 1.1.2 - Combined Players and Guests tabs
            </p>
            <p>
                Date: 16 July 2025
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default About;
