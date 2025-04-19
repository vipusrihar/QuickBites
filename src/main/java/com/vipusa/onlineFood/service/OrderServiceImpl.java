package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.defaluts.ORDER_STATUS;
import com.vipusa.onlineFood.model.FoodOrder;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.FoodOrderRepository;
import com.vipusa.onlineFood.repository.OrderRepository;
import com.vipusa.onlineFood.repository.RestaurantRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import com.vipusa.onlineFood.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
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
    public FoodOrder createOrder(OrderRequest orderRequest) throws Exception {
        FoodOrder foodOrder = new FoodOrder();
        User user = userRepository.findById(orderRequest.getUserId()).orElseThrow( () -> new Exception("User Not Found"));
        foodOrder.setUser(user);

        Restaurant restaurant = restaurantRepository.findById(orderRequest.getRestaurantId()).orElseThrow( () -> new Exception("Restaurant Not Found"));
        foodOrder.setRestaurant(restaurant);

        foodOrder.setAmount(orderRequest.getAmount());
        foodOrder.setOrderTime(LocalTime.now());
        foodOrder.setOrderedAt(LocalDate.now());

        foodOrder.setOrderItemList(orderRequest.getOrderList());
        return foodOrderRepository.save(foodOrder);

    }

    @Override
    public FoodOrder findById(Long orderId) throws Exception{
        FoodOrder foodOrder = foodOrderRepository.findById(orderId).orElseThrow(()->new Exception("Order Not Found"));
        return foodOrder;
    }
    @Override
    public void deleteOrder(Long orderID) throws Exception {
        FoodOrder foodOrder = findById(orderID);
        foodOrderRepository.deleteById(orderID);
    }

    @Override
    public FoodOrder changeOrderStatus(Long orderId) throws Exception {
        FoodOrder foodOrder = findById(orderId);
        ORDER_STATUS orderStatus =foodOrder.getOrderStatus();
        switch (orderStatus){
            case STATUS_ACCEPTED -> {
                foodOrder.setOrderStatus(ORDER_STATUS.STATUS_PACKED);
                break;
            }
            case STATUS_NON_ACCEPTED -> {
                foodOrder.setOrderStatus(ORDER_STATUS.STATUS_NON_ACCEPTED);
                break;
            }
            case STATUS_PACKED -> {
                foodOrder.setOrderStatus(ORDER_STATUS.STATUS_OUT_FOR_DELIVERY);
                break;
            }
            case STATUS_OUT_FOR_DELIVERY -> {
                foodOrder.setOrderStatus(ORDER_STATUS.STATUS_DELIVERED);
                break;
            }
            default -> {
                foodOrder.setOrderStatus(ORDER_STATUS.STATUS_ACCEPTED);
            }
        }
        return foodOrderRepository.save(foodOrder);
    }

    @Override
    public List<FoodOrder> findOrdersByUser(Long userId) {
        List<FoodOrder> foodOrders = foodOrderRepository.findByUserId(userId);
        return foodOrders;
    }

    @Override
    public List<FoodOrder> findPreparingStatusOrders() {
        return foodOrderRepository.findByOrderStatus(ORDER_STATUS.STATUS_PACKED);
    }

    @Override
    public List<FoodOrder> findDeliveredOrders() {
        return foodOrderRepository.findByOrderStatus(ORDER_STATUS.STATUS_DELIVERED);
    }

    @Override
    public List<FoodOrder> findAllOrder() {
        return foodOrderRepository.findAll();
    }

    @Override
    public List<FoodOrder> findOrdersByRestaurants(Long restaurantId) {
        List<FoodOrder> foodOrders = foodOrderRepository.findByRestaurantId(restaurantId);
        return foodOrders;
    }
}
