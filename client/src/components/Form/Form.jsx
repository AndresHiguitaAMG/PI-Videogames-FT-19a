import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getGenres, getPlatforms, postVideogames } from '../../Redux/actions';


const Form = () => {
    const { genres, platforms } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState(true); 
    const [validations, setValidations] = useState({});
    const [input, setInput] = useState({
        image: "",
        name: "",
        released: "",
        rating: "",
        description: "",
        platforms: [],
        genres: []
    })
    
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
        setValidations(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        // console.log(input)
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

    const validate = (input) => {
        let Validations = {};
        let regexName = /[a-zA-Z0-9:-\s’']/;
        let regexReleased = /\d{2}[-/]\d{2}[-/]\d{4}/;
        let regexRating = /\d{1}[.]\d{2}/;
        let regexDescription = /^.{1,255}$/;

        if (!input.name.trim()) {
            Validations.name = "The name field is required"
        } else if (!regexName.test(input.name.trim())) {
            Validations.name = "The name field only accepts letters, numbers and characters"
        }


    if (!input.released.trim()) {
        Validations.released = "The realeased field is required"
    } else if (!regexReleased.test(input.released.trim())) {
        Validations.released = ""
    }

    if (!input.rating.trim()) {
        Validations.rating = "The realeased field is required"
    } else if (!regexRating.test(input.rating.trim())) {
        Validations.rating = ""
    }

    if (!input.description.trim()) {
        Validations.description = "The description field is required"
    } else if (!regexDescription.test(input.description.trim())) {
        Validations.description = "It must not exceed 255 characters"
    }
    if (!input.platforms.length === 3) {
        Validations.platforms = "Es requerido"
    }

    if (!input.genres.length === 0) {
        Validations.genres = "Es requerido"
    }

    return Validations;
}

let styles = {
    fontWeight: "bold",
    color: "#dc3545",
  };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(postVideogames(input))
        console.log(input);
        alert("Successfully created videogame")
        setInput ({
            image: "",
            name: "",
            released: "",
            rating: "",
            description: "",
            platforms: [],
            genres: []
        })
        history.push('/home')
    }

    useEffect (() => {
        if (input.name.length > 0 && input.released.length > 0 && input.rating > 0) setError(false);
        else setError(true);
    }, [input, setError])


    // const handleOnBlur = (e) => {
    //     handleOnChange(e)
    //     setErrors(validate(input))
    // }

    return (
        <div>
            <h1>Create your own videogame</h1>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Image: </label>
                    <input 
                    type = "url"
                    placeholder = "url"
                    name= "image" 
                    value = {input.image}
                    // onBlur = {handleOnBlur}
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
                    // onBlur = {handleOnBlur}
                    onChange={handleOnChange}
                    />
                    {validations.name && <p style={styles}>{validations.name}</p>}
                </div>

                <div>
                    <label>Released: </label>
                    <input 
                    type = "date"
                    placeholder = "released"
                    name= "released"
                    value = {input.released}
                    // onBlur = {handleOnBlur}
                    onChange={handleOnChange}
                    />
                    {validations.released && <p style={styles}>{validations.released}</p>}
                </div>

                <div>
                    <label>Raiting: </label>
                    <input 
                    type = "text"
                    placeholder = "rating"
                    name= "rating"
                    value = {input.rating}
                    // onBlur = {handleOnBlur}
                    onChange={handleOnChange} 
                    />
                    {validations.rating && <p style={styles}>{validations.rating}</p>}
                </div>

                <div>
                    <label>Description: </label>
                    <textarea
                    cols = "50"
                    rows = "5"
                    placeholder = "description"
                    name= "description"
                    value = {input.description}
                    // onBlur = {handleOnBlur}
                    onChange={handleOnChange}
                    >
                        {validations.description && <p style={styles}>{validations.description}</p>}
                    </textarea>
                </div>

                <div>
                    <select onChange = {handleSelectPlatforms}>
                        <option value = "">-- Select platforms --</option> 
                        {platforms.map(el => (
                            <option value = {el}>{el}</option>
                        ))}
                        {validations.platforms && <p style={styles}>{validations.platforms}</p>}
                    </select>

                    <ul>
                        <li>{input.platforms.map(el => el + ", ")}</li>
                    </ul>
                </div>

                <div>
                    <select onChange = {handleSelectGenres}>
                        <option value = "">-- Select genres --</option>
                        {genres.map(el => (
                            <option value = {el.name} >{el.name}</option>
                        ))}
                        {validations.genres && <p style={styles}>{validations.genres}</p>}
                    </select>
                    <ul>
                        <li>{input.genres.map(el => el + ", ")}</li>
                    </ul>
                </div>

                <button type = "submit" disabled = {error}>Create</button>
            </form>
        </div>
    );
}
 
export default Form;