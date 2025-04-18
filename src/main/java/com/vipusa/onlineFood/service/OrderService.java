package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.FoodOrder;
import com.vipusa.onlineFood.request.OrderRequest;

import java.util.List;


public interface OrderService {

    public FoodOrder createOrder(OrderRequest orderRequest) throws Exception;

    public void deleteOrder(Long orderID) throws Exception;

    public FoodOrder changeOrderStatus(Long orderId) throws Exception;

    public FoodOrder findById(Long orderId) throws Exception;
    
    public List<FoodOrder> findOrdersByUser(Long UserId);
    
    public List<FoodOrder> findPreparingStatusOrders();

    public  List<FoodOrder> findDeliveredOrders();

    public List<FoodOrder> findAllOrder();

    public List<FoodOrder> findOrdersByRestaurants(Long restaurantId);


}
