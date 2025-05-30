import { isPresentInfavorites } from "../../components/config/logic"
import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT
} from "./ActionTypes"

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    sucess: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case REGISTER_REQUEST:

        case LOGIN_REQUEST:

        case GET_USER_REQUEST:

        case ADD_TO_FAVORITE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                sucess: null
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: true,
                jwt: action.payload,
                sucess: "Authentication successful"
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                favorites: action.payload.favorites?.restaurants || []
            };
        case ADD_TO_FAVORITE_SUCCESS:
            const isAlreadyFav = isPresentInfavorites(state.favorites, action.payload);
            const updatedFavorites = isAlreadyFav
                ? state.favorites.filter((item) => item.id !== action.payload.id)
                : [action.payload, ...state.favorites];

            return {
                ...state,
                isLoading: false,
                error: null,
                favorites: updatedFavorites,
            };


        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                sucess: null
            }

        case LOGOUT:
            return initialState


        default:
            return state;



    }
}