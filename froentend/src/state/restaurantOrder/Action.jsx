import {GET_RESTAURANTS_OREDER_FAILURE, GET_RESTAURANTS_OREDER_REQUEST, GET_RESTAURANTS_OREDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS} from './ActionType';

export const updateOrderStatus = ({orderId,orderStatus,jwt}) => {
    return async (dispatch) => {
        try{
            dispatch({type : UPDATE_ORDER_STATUS_REQUEST});

            const response = await api.put(
                `/api/admin/orders/${orderId}/${orderStatus}`, {},{
                    headers :{
                        Authorization : `Bearer ${jwt}`,
                    },
                }
            );

            const updatedOrder = response.data;

            console.log("updated order ",updatedOrder)

            dispatch({
                type: UPDATE_ORDER_STATUS_SUCCESS,
                payload: updateOrder,
            });

        }catch (error) {
            console.log("catch error", error)
            dispatch({type: UPDATE_ORDER_STATUS_FAILURE, error})
        }
    }
}

export const fetchRestaurantOrders =({restaurantId,jwt}) => {
    return async (dispatch) => {
        try{
            dispatch({type: GET_RESTAURANTS_OREDER_REQUEST});

            const {data} = await api.get(`/api/order/restaurant/${restaurantId}`, {
                params: {order_status:orderStatus },
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            }

            );

            const orders = data;
            console.log("restaurants order ----", orders);
            dispatch({
                type : GET_RESTAURANTS_OREDER_SUCCESS,
                payload: orders,
            });
        }catch (error) {
            dispatch({type : GET_RESTAURANTS_OREDER_FAILURE, error});
        }

            
       
    }
} 