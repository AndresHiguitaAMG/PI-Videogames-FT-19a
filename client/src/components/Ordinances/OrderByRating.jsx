import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByRating } from '../../Redux/actions';

const OrderByRating = () => {
    const dispatch = useDispatch();

    const handleSelectRating = (e) => {
        dispatch(orderByRating(e.target.value));
    }

    return (
        <div>
            <span>Order By Rating</span>
            <select onChange = {handleSelectRating}>
                <option value = "asc">-- Ascendente --</option>
                <option value = "desc">-- Descendente --</option>
            </select>
        </div>
    );
}
 
export default OrderByRating;
