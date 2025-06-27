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


export const getAllRestaurants = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const response =  await api.get('/api/restaurant/allRest');
            const data = response.data;
             console.log("All Restaurants ", data);
            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data })
           
        } catch (error) {
            console.error("Axios Error: ", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });

            dispatch({
                type: GET_ALL_RESTAURANTS_FAILURE,
                payload: error.response?.data?.message || error.message,
            });
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
            console.error("Axios Error: ", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });

            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error })
        }

    }
}


export const getRestaurantByUserId = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURNT_BY_USER_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/restaurant/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_RESTAURNT_BY_USER_ID_SUCCESS, payload: data })
        } catch (error) {
            console.error("Axios Error: ", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });

            dispatch({ type: GET_RESTAURNT_BY_USER_ID_FAILURE, payload: error })
        }

    }
}

export const createRestaurant = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });

    try {
      const response = await api.post(`/api/restaurant/`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });

      dispatch({
        type: CREATE_RESTAURANT_SUCCESS,
        payload: response.data,
      });

    } catch (error) {
      console.error("Axios Error: ", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });


      dispatch({
        type: CREATE_RESTAURANT_FAILURE,
        payload: error.response?.data?.message || error.message || "Something went wrong",
      });
    }
  };
};



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
            console.error("Axios Error: ", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });

            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error })
        }

    }
}


export const deleteRestaurant = ({restaurantId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const response = await api.delete(`/api/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: response.data})
        } catch (error) {
            console.error("Axios Error: ", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });

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
            console.error("Axios Error: ", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });

            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error })
        }

    }
}


//createCategoryAction

export const createCategoryAction = () => {
    
}


export const getMenuItemsByRestaurantId = (restaurantId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/menus/${restaurantId}`);
      const data = await response.json();

      dispatch({
        type: 'SET_MENU_ITEMS',
        payload: data
      });
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };
};


export const getRestaurantsCategory = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/categories`);
      const data = await response.json();

      dispatch({
        type: 'SET_CATEGORIES',
        payload: data
      });
    } catch (error) {
      console.error('Error fetching restaurant categories:', error);
    }
  };
};
