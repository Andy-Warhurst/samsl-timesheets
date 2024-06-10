import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/home" className={({isActive}) => (isActive ? 'active' : undefined)}>Home</NavLink>
                </li>
                <li><NavLink to="/about" className={({isActive}) => (isActive ? 'active' : undefined)}>About</NavLink>
                </li>
                {/*<li><NavLink to="/services"*/}
                {/*             className={({isActive}) => (isActive ? 'active' : undefined)}>Services</NavLink></li>*/}
                {/*<li><NavLink to="/guests" className={({isActive}) => (isActive ? 'active' : undefined)}>Guests</NavLink>*/}
                {/*</li>*/}
                {/*<li><NavLink to="/print" className={({isActive}) => (isActive ? 'active' : undefined)}>Print</NavLink>*/}
                {/*</li>*/}
                {/*<li><NavLink to="/loadPlayers" className={({isActive}) => (isActive ? 'active' : undefined)}>Load</NavLink>*/}
                {/*</li>*/}
            </ul>
        </nav>
    );
}

export default NavBar;
