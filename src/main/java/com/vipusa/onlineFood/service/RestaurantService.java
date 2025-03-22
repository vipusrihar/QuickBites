package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.request.CreateRestaurantRequest;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest,
                                       User user);

    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurantRequest) throws Exception;

    public void deleteRestaurant(Long restaurantId)throws Exception;

    public List<Restaurant> getAllRestaurants() throws Exception;

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long restaurantId) throws Exception;

    public List<Restaurant> getRestaurantByOwnerId(Long userId) throws Exception;

    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception;

    public void addFood(Long restaurantId, Food food) throws Exception;

    public void deleteFood(Long restaurantId, Long foodId);

}
