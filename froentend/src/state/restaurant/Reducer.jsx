import * as actionTypes from './ActionTypes';

const initialState = {
    restaurants: [],          // all restaurants
    usersRestsurants: null,   // restaurants created by user
    restaurant: null,         // single restaurant details
    loading: false,           // loading state
    error: null               // error messages
}

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_ID_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }

        case actionTypes.CREATE_RESTAURANT_SUCCESS: {
            return {
                ...state,
                loading: false,
                usersRestsurants: action.payload,
            };
        }

        case actionTypes.GET_ALL_RESTAURANTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
            };
        }

        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS: {
            return {
                ...state,
                loading: false,
                restaurant: action.payload,
            };
        }

        case actionTypes.GET_RESTAURNT_BY_USER_ID_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS: {
            return {
                ...state,
                loading: false,
                usersRestsurants: action.payload,
            };
        }

        case actionTypes.DELETE_RESTAURANT_SUCCESS: {
            return {
                ...state,
                error: null,
                loading: false,
                restaurants: state.restaurants.filter(
                    (item) => item.id !== action.payload
                ),
                usersRestsurants: state.usersRestsurants
                    ? state.usersRestsurants.filter((item) => item.id !== action.payload)
                    : null,
            };
        }

        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
