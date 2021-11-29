import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SET_NAME = 'SET_NAME';
export const GET_VIDEOGAMES_BY_ID = 'GET_VIDEOGAMES_BY_ID';
export const REMOVE_VIDEOGAME = 'REMOVE_VIDEOGAME';
export const POST_VIDEOGAMES = 'POST_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const FILTER_BY_ORIGEN = 'FILTER_BY_ORIGEN';
export const SET_ORDER = 'SET_ORDER';

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

export function getVideogamesById (id) {
    return async function (dispatch) {
        try {
            const detail = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch ({
                type: GET_VIDEOGAMES_BY_ID,
                payload: detail.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function removeVideogame () {
    return {
        type: REMOVE_VIDEOGAME,
        payload: {}
    }
}

export function postVideogames (payload) {
    return async function (dispatch) {
        try {
            await axios.post("http://localhost:3001/videogames/create", payload);
            return dispatch ({
                type: POST_VIDEOGAMES
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getGenres () {
    return async function (dispatch) {
        try {
            const genres = await axios.get("http://localhost:3001/genres")
            return dispatch ({
                type: GET_GENRES,
                payload: genres.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getPlatforms () {
    return async function (dispatch) {
        try {
            const platforms = await axios.get("http://localhost:3001/platforms");
            return dispatch ({
                type: GET_PLATFORMS,
                payload: platforms.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterByOrigen (payload) {
    return {
        type: FILTER_BY_ORIGEN,
        payload
    }
}

export function setOrder (order) {
    return {
        type: SET_ORDER,
        payload: order
    }
}