package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {


    List<Restaurant> findAll();

    List<Restaurant> findByOwnerId(Long userId);

    @Query("SELECT r FROM Restaurant r WHERE " +
            "(:query IS NULL OR LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR EXISTS (SELECT 1 FROM r.menuItems f WHERE LOWER(f.name) LIKE LOWER(CONCAT('%', :query, '%'))))")
    List<Restaurant> findBySearchQuery(@Param("query") String query);
}
