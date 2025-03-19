package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}
