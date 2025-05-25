package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.defaults.ORDER_STATUS;
import com.vipusa.onlineFood.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodOrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByUserId(Long userId);

    List<Order> findByRestaurantId(Long restaurantId);

    List<Order> findByStatus(ORDER_STATUS status);

}
