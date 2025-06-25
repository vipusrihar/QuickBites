import {api} from '../../components/config/APi'
import {
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURNT_BY_USER_ID_FAILURE,
    GET_RESTAURNT_BY_USER_ID_REQUEST,
    GET_RESTAURNT_BY_USER_ID_SUCCESS,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE
} from './ActionTypes';


export const getAllRestaurants = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const { data } = await api.get('/api/restaurant/allRest', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data })
            console.log("All Restaurants ", data);
        } catch (error) {
            console.error("Error happenend", error)
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error })
        }

    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/restaurant/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            console.log("restaurant fetched sucessfully :", response)
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data })
        } catch (error) {
            console.error("Error happenend", error)
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error })
        }

    }
}


export const getRestaurantByUserId = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURNT_BY_USER_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/restaurant/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_RESTAURNT_BY_USER_ID_SUCCESS, payload: data })
        } catch (error) {
            console.error("Error happenend", error)
            dispatch({ type: GET_RESTAURNT_BY_USER_ID_FAILURE, payload: error })
        }

    }
}

export const createRestaurant = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data })
        } catch (error) {
            console.error("Error happenend", error)
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error })
        }

    }
}



export const updateRestaurant = ({restaurantId, restaurantData , jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const response = await api.put(`/api/admin/restaurant/${restaurantId}`, restaurantData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data})
        } catch (error) {
            console.error("Error happenend", error)
            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error })
        }

    }
}


export const deleteRestaurant = ({restaurantId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const response = await api.delete(`/api/admin/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: response.data})
        } catch (error) {
            console.error("Error happenend", error)
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error })
        }

    }
}

export const updateRestaurantStatus = ({restaurantId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {
            const response = await api.put(`/api/admin/restaurant/${restaurantId}/status`,{}, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data})
        } catch (error) {
            console.error("Error happenend", error)
            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error })
        }

    }
}


//createCategoryAction

export const createCategoryAction = () => {
    
}

//getMenuItemsByRestaurantId
export const getMenuItemsByRestaurantId = () => {

}

// getRestaurantsCategory
export const getRestaurantsCategory = () => {
    
}