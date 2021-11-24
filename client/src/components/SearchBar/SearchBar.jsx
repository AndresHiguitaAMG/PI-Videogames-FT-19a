import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames, setName } from '../../Redux/actions';

const SearchBar = () => {
    const [input, setInput] = useState(""); //Tiene el valor a mstrar
    const dispatch = useDispatch();

    const handleOnChange = (e) =>{
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(setName(input)); //Guarda el input en el store
        dispatch(getVideogames({name: input}))
        setInput("")
    }

    return (
        <form>
            <input
            type="text"
            placeholder="search"
            onChange={handleOnChange}
            value={input}
            />
            <button
            type="submit"
            onClick={handleOnSubmit}
            >🔍</button>
        </form>
    );
}
 
export default SearchBar;