import React from 'react';
import { filterByOrigen } from '../../Redux/actions';
import { useDispatch } from 'react-redux' 

const FilterByOrigen = () => {
    const dispatch = useDispatch();

    const handleSelectOrigen = (e) => {
        e.preventDefault();
        dispatch(filterByOrigen(e.target.value))
    }
    return (
        <div>
            <span>Filter By Origen :</span>
            <select onChange={handleSelectOrigen}>
                <option value = "All">-- All --</option>
                <option value = "Existing">Existing</option>
                <option value = "Created">Created</option>
            </select>
        </div>
    );
}
 
export default FilterByOrigen;