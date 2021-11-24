import { GET_VIDEOGAMES, SET_NAME } from '../actions/index';

const initialState = {
    videogames: [],
    name: "",
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload
            }

        case SET_NAME: 
            return {
                ...state,
                name: payload
            }    
        default:
            return state;
    }
}