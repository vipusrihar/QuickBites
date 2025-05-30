import * as actionType from './ActionType';

const initialState = {
    loading: false,
    error: null,
    order:[]
}

const restaurantOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_RESTAURANTS_OREDER_REQUEST:
        case actionType.UPDATE_ORDER_STATUS_REQUEST:{
            return {
                ...state,
                loading:false,
                error:null,
            }
        }
        case actionType.GET_RESTAURANTS_OREDER_SUCCESS : {
            return{
                ...state,
                loading:false,
                order:action.payload
            }
        }
        case actionType.UPDATE_ORDER_STATUS_SUCCESS:{
            const updateOrders = state.order.map( (order) =>
                order.id === action.payload.id?action.payload:order
            )
            return{
                ...state,
                loading: false,
                orders:updateOrders
            }
        }

        case actionType.GET_RESTAURANTS_OREDER_FAILURE:
        case actionType.UPDATE_ORDER_STATUS_FAILURE:{
            return {
                ...state,
                loading:false,
                error: action.error
            }
        }
        default:
            return state;
    }
}

export default restaurantOrderReducer;