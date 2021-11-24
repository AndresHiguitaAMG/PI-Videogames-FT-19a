import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SET_NAME = 'SET_NAME';


export function getVideogames ({ name, order }) {
    return (dispatch) => {
        axios.get(`http://localhost:3001/videogames?order=${order ? order : ""}&name=${name ? name : ""}`)
        .then(apiData => {
            return dispatch ({
                type: GET_VIDEOGAMES,
                payload: apiData.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function setName (name) {
    return {
        type: SET_NAME,
        payload: name
    }
}