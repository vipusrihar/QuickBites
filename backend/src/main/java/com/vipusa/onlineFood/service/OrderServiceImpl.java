package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.defaults.ORDER_STATUS;
import com.vipusa.onlineFood.model.Order;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.FoodOrderRepository;
import com.vipusa.onlineFood.repository.OrderRepository;
import com.vipusa.onlineFood.repository.RestaurantRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import com.vipusa.onlineFood.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodOrderRepository foodOrderRepository;

    @Override
    public Order createOrder(OrderRequest orderRequest) throws Exception {
        Order foodOrder = new Order();
        User user = userRepository.findById(orderRequest.getUserId()).orElseThrow( () -> new Exception("User Not Found"));
        foodOrder.setUser(user);

        Restaurant restaurant = restaurantRepository.findById(orderRequest.getRestaurantId()).orElseThrow( () -> new Exception("Restaurant Not Found"));
        foodOrder.setRestaurant(restaurant);

        foodOrder.setOrderedAt(LocalDateTime.now());

        foodOrder.setItems(orderRequest.getOrderList());
        return foodOrderRepository.save(foodOrder);

    }

    @Override
    public Order findById(Long orderId) throws Exception{
        Order foodOrder = foodOrderRepository.findById(orderId).orElseThrow(()->new Exception("Order Not Found"));
        return foodOrder;
    }
    @Override
    public void deleteOrder(Long orderID) throws Exception {
        Order foodOrder = findById(orderID);
        foodOrderRepository.deleteById(orderID);
    }

    @Override
    public Order changeOrderStatus(Long orderId) throws Exception {
        Order foodOrder = findById(orderId);
        ORDER_STATUS orderStatus =foodOrder.getStatus();
        switch (orderStatus){
            case ACCEPTED -> {
                foodOrder.setStatus(ORDER_STATUS.PACKED);
                break;
            }
            case REJECTED -> {
                foodOrder.setStatus(ORDER_STATUS.REJECTED);
                break;
            }
            case PACKED -> {
                foodOrder.setStatus(ORDER_STATUS.OUT_FOR_DELIVERY);
                break;
            }
            case OUT_FOR_DELIVERY -> {
                foodOrder.setStatus(ORDER_STATUS.DELIVERED);
                break;
            }
            case CANCELLED-> {
                foodOrder.setStatus(ORDER_STATUS.CANCELLED);
                break;
            }
            default -> {
                foodOrder.setStatus(ORDER_STATUS.ACCEPTED);
            }
        }
        return foodOrderRepository.save(foodOrder);
    }

    @Override
    public List<Order> findOrdersByUser(Long userId) {
        List<Order> foodOrders = foodOrderRepository.findByUserId(userId);
        return foodOrders;
    }

    @Override
    public List<Order> findPreparingStatusOrders() {
        return foodOrderRepository.findByStatus(ORDER_STATUS.PACKED);
    }

    @Override
    public List<Order> findDeliveredOrders() {
        return foodOrderRepository.findByStatus(ORDER_STATUS.DELIVERED);
    }

    @Override
    public List<Order> findAllOrder() {
        return foodOrderRepository.findAll();
    }

    @Override
    public List<Order> findOrdersByRestaurants(Long restaurantId) {
        List<Order> foodOrders = foodOrderRepository.findByRestaurantId(restaurantId);
        return foodOrders;
    }
}
