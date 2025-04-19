package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.defaluts.ORDER_STATUS;
import com.vipusa.onlineFood.model.FoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodOrderRepository extends JpaRepository<FoodOrder,Long> {

    List<FoodOrder> findByUserId(Long userId);

    List<FoodOrder> findByRestaurantId(Long restaurantId);

    List<FoodOrder> findByOrderStatus(ORDER_STATUS status);

}
