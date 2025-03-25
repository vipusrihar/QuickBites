package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.FoodOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<FoodOrder,Long> {


}
