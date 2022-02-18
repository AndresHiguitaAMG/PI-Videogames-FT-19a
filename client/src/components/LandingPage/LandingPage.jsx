import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.modules.css';


const LandingPage = () => {
    return (
        <div className="contenedor">
            <NavLink to="/home">
                <img className="logo" src="https://www.flaticon.es/icono-gratis/versus-juego_37933?related_id=37933&origin=pack" alt="to home" />
                <h1>Welcome</h1>
            </NavLink>
        </div>
    )
}

export default LandingPage;