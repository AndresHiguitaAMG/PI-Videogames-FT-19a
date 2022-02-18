import React from 'react';
import { NavLink } from 'react-router-dom';
import './Cards.modules.css';

const Cards = ({ image, name, genres, id }) => {
    const getGenres = function () {
		let arrayGenres = [];
		if (genres) {
			for (let genre of genres) {
				typeof msj === 'object' ? arrayGenres.push(genre.name) : arrayGenres.push(genre);
			}
		}
		return arrayGenres.length ? arrayGenres.join(', ') : 'Genres Not Found!'
	}
    return (
        <div className = "container">
            <div className = "cards">
                <div className = "card-image">
                    <img src={image} alt="img not found" />
                </div>
                
                <div className = "card-text">
                    <h3>{name}</h3>
                    <p  className = "cards-genres">{getGenres()}</p>
                </div>
                
                <div className = "card-footer">
                    <NavLink to={`/detail/${id}`}>
                        <button>Read More</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Cards;