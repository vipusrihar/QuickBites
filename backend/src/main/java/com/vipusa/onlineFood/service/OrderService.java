package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Order;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.request.OrderRequest;

import java.util.List;


public interface OrderService {

    public Order createOrder(OrderRequest orderRequest, User user) throws Exception;

    public void deleteOrder(Long orderID) throws Exception;

    public Order changeOrderStatus(Long orderId) throws Exception;

    public Order findById(Long orderId) throws Exception;
    
    public List<Order> findOrdersByUser(Long UserId);
    
    public List<Order> findPreparingStatusOrders();

    public  List<Order> findDeliveredOrders();

    public List<Order> findAllOrder();

    public List<Order> findOrdersByRestaurants(Long restaurantId);


}
