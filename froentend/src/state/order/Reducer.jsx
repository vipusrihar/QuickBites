import * as actionTypes from './ActionType'

const initialState = {
    loading : false,
    orders:[],
    error:null,
    notifications:[]
};


export const orderReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case actionTypes.GET_USERS_ORDERS_REQUEST:{
            return {
                ...state, 
                error:null, 
                loading:false
            };
        }
        case actionTypes.GET_USERS_ORDERS_SUCCESS:{
            return {
                ...state,
                error:null,
                loading:false,
                orders:payload
            };

        }
        case actionTypes.GET_USERS_ORDERS_FAILURE:{
            return {
                ...state,
                error:payload,
                loading:false
            };
        }
        default:{
            return{
                state
            }
        }
    }
}

