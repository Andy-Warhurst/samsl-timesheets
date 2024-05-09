import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : undefined)}>Home</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>About</NavLink></li>
                <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : undefined)}>Services</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;
