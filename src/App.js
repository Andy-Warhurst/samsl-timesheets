import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './Home'
import About from './About'
import Services from './Services'
import Header from './Header';
import NavBar from './NavBar';
import ErrorPage from './ErrorPage';
import AuthenticationGuard from './authentication-guard';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Header />
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <div style={{ width: '200px', background: '#f0f0f0' }}><NavBar /></div>
                    <div style={{ flexGrow: 1 }}>
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/services"
                                element={<AuthenticationGuard component={Services} />}
                            />
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
