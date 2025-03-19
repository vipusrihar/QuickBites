package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest,
                                       User user);

    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurantRequest);

    public void deleteRestaurant(Long restaurantId)throws Exception;

    public List<Restaurant> getAllRestaurantId(Long restaurantId) throws Exception;

    public List<Restaurant> searchRestaurant();

    public Restaurant findRestaurantById(Long restaurantId) throws Exception;

    public Restaurant getRestaurantById(Long restaurantId) throws Exception;

    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception;
}
