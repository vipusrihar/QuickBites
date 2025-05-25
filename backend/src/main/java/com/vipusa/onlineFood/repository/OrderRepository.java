package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
