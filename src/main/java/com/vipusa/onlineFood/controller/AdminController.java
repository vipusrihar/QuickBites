package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private RestaurantService restaurantService;

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> allowRestaurant(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception{
        Restaurant restaurant = restaurantService.findRestaurantById(id);

        restaurant.setStatus(true);
        restaurant.setAdminPermission(true);

        return new ResponseEntity<>(restaurant,HttpStatus.OK);

    }

    @PutMapping("/{id}/changeStatus")
    public ResponseEntity<Restaurant> changeStatusRestaurant(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception{
        Restaurant restaurant = restaurantService.findRestaurantById(id);

        restaurant.setStatus(!restaurant.getStatus());

        return new ResponseEntity<>(restaurant,HttpStatus.OK);

    }

}
