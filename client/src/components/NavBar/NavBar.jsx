import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="NavBarContainer">
            <div className = "home">
            <NavLink to = "/home">
                Home
            </NavLink>
            </div>

            <NavLink to = "/home/create">
                Create a videogame
            </NavLink>
        </div>
    );
}
 
export default NavBar;