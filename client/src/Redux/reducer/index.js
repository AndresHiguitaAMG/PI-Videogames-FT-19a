import { 
    GET_VIDEOGAMES, SET_NAME, GET_VIDEOGAMES_BY_ID, REMOVE_VIDEOGAME, GET_GENRES, 
    GET_PLATFORMS, FILTER_BY_ORIGEN, SET_ORDER, FILTER_BY_GENRES, ORDER_BY_RATING} 
    from '../actions/index';

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
            
        case FILTER_BY_GENRES:
            const FilteredGenres = payload === "All" ? state.videogame : state.videogame.filter(el => el.genres.includes(payload))
            return {
                ...state,
                videogames: FilteredGenres
            }

        case ORDER_BY_RATING:
            if (payload === "asc") {
                const ratingOrder = state.videogames.sort(function(a, b) {
                    return a.rating - b.rating 
                })
                return {
                    ...state,
                    videogames: ratingOrder
                }
            }
            if (payload === "desc") {
                const ratingOrder = state.videogames.sort(function(a, b) {
                    return b.rating - a.rating 
                })
                return {
                    ...state,
                    videogames: ratingOrder
                }
            }
            return state

        default:
            return state;
    }
}