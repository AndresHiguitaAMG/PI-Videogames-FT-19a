import { GET_VIDEOGAMES, SET_NAME, GET_VIDEOGAMES_BY_ID, REMOVE_VIDEOGAME,
GET_GENRES, GET_PLATFORMS, FILTER_BY_ORIGEN, SET_ORDER } from '../actions/index';

const initialState = {
    videogames: [],
    videogame: [],
    name: "",
    genres: [],
    platforms: [],
    order: ""
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                videogame: payload
            }

        case SET_NAME: 
            return {
                ...state,
                name: payload
            }

        case GET_VIDEOGAMES_BY_ID:
            return {
                ...state,
                videogame: payload
            }

        case REMOVE_VIDEOGAME:
            return {
                ...state,
                videogame: payload
            }  
            
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }  
           
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: payload
            }

        case FILTER_BY_ORIGEN:
            const origen = payload === "Created" ? state.videogame.filter(el => el.createdInDatabase) : state.videogame.filter(el => !el.createdInDatabase)
            return {
                ...state,
                videogames: payload === "All" ? state.videogame : origen
            }  
         
        case SET_ORDER:
            return {
                ...state,
                order: payload
            }    
        default:
            return state;
    }
}