import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div>
            <NavLink to = "/home">
                Home
            </NavLink>

            <NavLink to = "/home/create">
                Create a videogame
            </NavLink>
        </div>
    );
}
 
export default NavBar;