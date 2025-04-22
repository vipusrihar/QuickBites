package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.request.FoodRequest;
import com.vipusa.onlineFood.response.MessageResponse;
import com.vipusa.onlineFood.service.FoodService;
import com.vipusa.onlineFood.service.RestaurantService;
import com.vipusa.onlineFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private FoodService foodService;

    @PostMapping("/{resId}")
    public ResponseEntity<Food> createFood(@RequestBody FoodRequest foodRequest,
                                           @RequestHeader("Authorization") String jwt,
                                           @PathVariable("resId") Long restaurantId) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        Food food = foodService.createFood(foodRequest,restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> findFoodById(@RequestHeader("Authorize") String jwt,
                                             @PathVariable("id") Long foodId) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(foodId);
        return new ResponseEntity<>(food,HttpStatus.OK);
    }

    @DeleteMapping("/{resId}/{foodId}")
    public ResponseEntity<MessageResponse> deleteFood(@RequestHeader("Authorize") String jwt,
                                                      @PathVariable("resId") Long restaurantId,
                                                      @PathVariable("foodId") Long foodId) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        Food food = foodService.findFoodById(foodId);
        foodService.deleteFood(foodId);

        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setMessage("Successfully deleted Food With foodId "+ foodId);

        return new ResponseEntity<>(messageResponse,HttpStatus.OK);

    }

    @GetMapping("getFoods/{restaurantID}")
    public ResponseEntity<List<Food>> getRestaurantsFood(@RequestHeader("Authorization") String jwt,
                                                         @PathVariable("restaurantID") Long restaurantID) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        List<Food> foodList = foodService.getRestaurantsFood(restaurantID);
        return new ResponseEntity<>(foodList,HttpStatus.OK);
    }

    @PutMapping("/updateStatus/{foodId}")
    public ResponseEntity<Food> updateAvailabilityStatus(@RequestHeader("Authorization") String jwt,
                                                         @PathVariable("foodId") Long id) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.updateAvailabilityStatus(id);
        return new ResponseEntity<>(food,HttpStatus.OK);
    }

    @GetMapping("/filterVeg")
    public ResponseEntity<List<Food>> filterByVegetarian(@RequestHeader("Authorization") String jwt)throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        List<Food> vegFood = foodService.filterByVegetarian();
        return new ResponseEntity<>(vegFood,HttpStatus.OK);
    }

    @GetMapping("/filterNonVeg")
    public ResponseEntity<List<Food>> filterByNonVegetarian(@RequestHeader("Authorization") String jwt)throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        List<Food> nonVegFood = foodService.filterByNonVegetarian();
        return new ResponseEntity<>(nonVegFood,HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestHeader("Authorization") String jwt,
                                                 @RequestParam String name) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        List<Food> foodsList = foodService.searchFood(name);
        return new ResponseEntity<>(foodsList,HttpStatus.OK);
    }

}
