import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByGenres, getGenres } from '../../Redux/actions';

const FilterByGenres = () => {
    const genres = useSelector(state => state.genres)
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(getGenres())
    }, [dispatch])

    const handleSelectGenres = (e) => {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
    }
    
    return (
        <div>
            <span>Filter By Genres: </span>
            <select onChange = {handleSelectGenres}>
                <option value = "All">-- All --</option>
                <option name = "genres"></option>
                {
                    genres.map((el) => {
                        return (
                            <option value = {el.name} name = "genres" key={el.id} >{el.name}</option>
                        )
                    })
                }
            </select>
        </div>
    );
}
 
export default FilterByGenres;