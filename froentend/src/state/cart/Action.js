import {ADD_ITEM_TO_CART_REQUEST, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALLCART_ITEMS_FAILURE, GET_ALLCART_ITEMS_REQUEST, GET_ALLCART_ITEMS_SUCCESS, REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS, UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS} from '../cart/ActionType'
import {api} from '../../components/config/APi';

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({type:FIND_CART_REQUEST})
        try{
            const response = await api.get(`/api/cart/`,{
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
            dispatch({type:FIND_CART_SUCCESS,payload:response.data});
        }catch(error){
            dispatch({type:FIND_CART_FAILURE, payload:error});
        }
    }
}


export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_ALLCART_ITEMS_REQUEST})
        try{
            const response = await api.get(`/api/carts/${reqData.cartId}/items`,{
                headers : {
                    Authorization : `Bearer ${reqData.token}`,
                },
            });
            dispatch({type:GET_ALLCART_ITEMS_SUCCESS,payload:response.data});
        }catch(error){
            dispatch({type:GET_ALLCART_ITEMS_FAILURE, payload:error});
        }
    }
}


addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({type:ADD_ITEM_TO_CART_REQUEST})
        try{
            const {data} = await api.put(`/api/cart/add`,{
                headers : {
                    Authorization : `Bearer ${reqData.token}`,
                },
            });
            dispatch({type:GET_ALLCART_ITEMS_SUCCESS,payload:data});
        }catch(error){
            dispatch({type:GET_ALLCART_ITEMS_FAILURE, payload:error});
        }
    }
}

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_CARTITEM_REQUEST});
        try {
           const {data} = await api.put(`/api/cart-item/update`, reqData,{
            headers : {
                Authorization : `Bearer ${reqData.jwt}`
            }
           }) 
           dispatch({type:UPDATE_CARTITEM_SUCCESS , payload:data});
        } catch (error) {
            dispatch({type:UPDATE_CARTITEM_FAILURE, payload:error})
                        
        }
    }
}


export const removeCartItem = ({cartItemId, jwt}) => {
    return async (dispatch) => {
        dispatch({type:REMOVE_CARTITEM_REQUEST});
        try {
           const {data} = await api.delete(`/api/cart-item/${cartItemId}/remove`,{
            headers : {
                Authorization : `Bearer ${jwt}`
            }
           }) 
           dispatch({type:REMOVE_CARTITEM_SUCCESS , payload:data});
        } catch (error) {
            dispatch({type:REMOVE_CARTITEM_FAILURE, payload:error})
                        
        }
    }
}


export const clearCartAction= () => {
    return async (dispatch) => {
        dispatch({type:CLEAR_CART_REQUEST});
        try {
           const {data} = await api.put(`/api/cart/clear`,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("jwt")}`,
            }
           }) 
           dispatch({type:CLEAR_CART_SUCCESS , payload:data});
        } catch (error) {
            dispatch({type:CLEAR_CART_FAILURE, payload:error})               
        }
    }
}

