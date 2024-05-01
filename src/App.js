import logo from './SAMSL_Official_Logo.svg';
import './App.css';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { isAuthenticated } = useAuth0();

  return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to the SAMSL Manager Website
          </p>


          {!isAuthenticated && (
              <>
                <LoginButton></LoginButton>
              </>
          )}
          {isAuthenticated && (
            <>
              <LogoutButton />
            </>
        )}

          <Link to="/about">About</Link>
        </header>
      </div>
  );
}

function About() {
  return (
      <div>
        <h1>About Page</h1>
              <p>
                Version: 0.1
              </p>
              <p>
                Date: 1 May 2024
              </p>
              <Link to="/">Home</Link>
      </div>
  );

}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
