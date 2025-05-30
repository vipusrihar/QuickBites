import {api} from '../../config/APi';
import {CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEMS_FAILURE, SEARCH_MENU_ITEMS_REQUEST, SEARCH_MENU_ITEMS_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILTIY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILTIY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILTIY_SUCCESS} from './AcctionType';


export const createMenuItem = ({menu, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/food`,menu, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log("Error happernd", error)
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error })
        }

    }
}


export const getMenuItemByRestaurantId = ({keyword,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/food/search?name=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data })
        } catch (error) {
            console.log("Error happernd", error)
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error })
        }

    }
}

export const searchMenuItem = ({menu, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEMS_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/food`,menu, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: SEARCH_MENU_ITEMS_SUCCESS, payload: data })
        } catch (error) {
            console.log("Error happernd", error)
            dispatch({ type: SEARCH_MENU_ITEMS_FAILURE, payload: error })
        }

    }
}

export const updateMenuItemsAvailability = ({foodId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILTIY_REQUEST });
        try {
            const { data } = await api.put(`/api/food/${foodId}`, {},{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILTIY_SUCCESS, payload: data })
        } catch (error) {
            console.log("Error happernd", error)
            dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILTIY_FAILURE, payload: error })
        }

    }
}


export const deleteFoodAction = ({foodId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.delete(`/api/food/${foodId}`, {},{
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId })
        } catch (error) {
            console.log("Error happernd", error)
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error })
        }

    }
}