import logo from './SAMSL_Official_Logo.svg';
import './App.css';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the SAMSL Manager Website
        </p>
        <p>
          Version 0.1
        </p>
        <LoginButton></LoginButton><br/>
        <LogoutButton></LogoutButton>
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}

        {/*  Learn React*/}
        {/*</a>*/}
      </header>
    </div>
  );
}

export default App;
