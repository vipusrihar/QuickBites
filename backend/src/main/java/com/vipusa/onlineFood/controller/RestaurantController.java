package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.request.CreateRestaurantRequest;
import com.vipusa.onlineFood.response.MessageResponse;
import com.vipusa.onlineFood.service.RestaurantService;
import com.vipusa.onlineFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<Restaurant> createRestaurant (@RequestBody CreateRestaurantRequest createRestaurantRequest,
                                                        @RequestHeader("Authorization") String jwt) throws Exception{


        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.createRestaurant(createRestaurantRequest,user);

        return new ResponseEntity<>(restaurant,HttpStatus.CREATED);

    }


    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {

        userService.findUserByJwtToken(jwt); // validate token
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return ResponseEntity.ok(restaurant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant (@RequestBody CreateRestaurantRequest req,
                                                        @RequestHeader("Authorization") String jwt,
                                                        @PathVariable Long id )throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurant(id,req);

        return new ResponseEntity<>(restaurant,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(@RequestHeader("Authorization") String jwt,
                                                            @PathVariable Long id) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        restaurantService.deleteRestaurant(id);

        MessageResponse mes = new MessageResponse();
        mes.setMessage("Restaurant Deleted Successfully");

        return new ResponseEntity<>(mes,HttpStatus.OK);

    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus (@RequestHeader("Authorization") String jwt,
                                                              @PathVariable Long id )throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);

        return new ResponseEntity<>(restaurant,HttpStatus.OK);
    }

    @GetMapping("/allRest")
    public ResponseEntity<List<Restaurant>> getAllRestaurants (@RequestHeader("Authorization") String jwt)
                                                                throws Exception{
        List<Restaurant> restaurantList = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurantList,HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) String keyword) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Restaurant> restaurantList = restaurantService.searchRestaurant(keyword);
        return new ResponseEntity<>(restaurantList, HttpStatus.OK);
    }

//
//    @PutMapping("/{id}/addFood")
//    public ResponseEntity<?> addFood(@RequestHeader("Authorization") String jwt,
//                                              @PathVariable Long id,
//                                              @RequestBody Food food) throws Exception{
//        User user = userService.findUserByJwtToken(jwt);
//        Restaurant restaurant = restaurantService.findRestaurantById(id);
//        restaurantService.addFood(id,food);
//
//        MessageResponse messageResponse = new MessageResponse();
//        messageResponse.setMessage(food.getName() + " added to " + user.getFirstName() +restaurant.getName());
//
//        return new ResponseEntity<>(messageResponse,HttpStatus.OK);
//
//    }
}
