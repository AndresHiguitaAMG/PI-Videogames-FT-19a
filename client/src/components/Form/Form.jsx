
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getGenres, getPlatforms, postVideogames } from '../../Redux/actions';


const Form = () => {
    const { genres, platforms } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        image: "",
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: []
    })
    

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(postVideogames(input))
        alert("Successfully created videogame")
        setInput ({
            image: "",
            name: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: []
        })
        history.push('/home')
    }
    
    useEffect (() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch]);

    const handleOnChange = (e) => {
        //Seteo el input
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectPlatforms = (e) => {
        const selectPlatforms = input.platforms.find(el => el === e.target.value)
        if (selectPlatforms) return
        setInput({
            ...input, 
            platforms: [...input.platforms, e.target.value]
        }) 
    }

    const handleSelectGenres = (e) => {
        const selectGenres = input.genres.find(el => el === e.target.value)
        if (selectGenres) return
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    return (
        <div>
            <h1>Create a videogame</h1>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Image: </label>
                    <input 
                    type = "url"
                    placeholder = "url"
                    name= "image" 
                    value = {input.image}
                    onChange={handleOnChange}
                    />
                </div>

                <div>
                    <label>Name: </label>
                    <input 
                    type = "text"
                    placeholder = "name"
                    name= "name" 
                    value = {input.name}
                    onChange={handleOnChange}
                    />
                </div>

                <div>
                    <label>Description: </label>
                    <input 
                    type = "text"
                    placeholder = "description"
                    name= "description"
                    value = {input.description}
                    onChange={handleOnChange}
                    />
                </div>

                <div>
                    <label>Released: </label>
                    <input 
                    type = "text"
                    placeholder = "description"
                    name= "released"
                    value = {input.released} 
                    onChange={handleOnChange}
                    />
                </div>

                <div>
                    <label>Raiting: </label>
                    <input 
                    type = "text"
                    placeholder = "rating"
                    name= "rating"
                    value = {input.rating}
                    onChange={handleOnChange} 
                    />
                </div>

                <div>
                    <select onChange = {handleSelectPlatforms}>
                        <option value = "">-- Select platforms --</option> 
                        {platforms.map(el => (
                            <option value = {el}>{el}</option>
                        ))}
                    </select>

                    <ul>
                        <li>{input.platforms.map(el => el + ", ")}</li>
                    </ul>
                </div>

                <div>
                    <select onChange = {handleSelectGenres}>
                        <option value = "">-- Select genres --</option>
                        {genres.map(el => (
                            <option value = {el}>{el}</option>
                        ))}
                    </select>
                    <ul>
                        <li>{input.genres.map(el => el + ", ")}</li>
                    </ul>
                </div>

                <button type = "submit">Create</button>
            </form>
        </div>
    );
}
 
export default Form;