package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {


    List<Restaurant> findAll();

    List<Restaurant> findByOwnerId(Long userId);

    @Query("SELECT r FROM Restaurant r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(r.restaurantType) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Restaurant> findBySearchQuery(String name);

}
