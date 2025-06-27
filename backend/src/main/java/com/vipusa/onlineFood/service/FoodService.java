package com.vipusa.onlineFood.service;


import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.request.FoodRequest;

import java.util.List;

public interface FoodService{

    public Food createFood(FoodRequest foodRequest, Long restaurantId);

    public void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood (Long RestaurantId) throws Exception;

    public List<Food> searchFood (String keyword);

    public Food findFoodById (Long foodId) throws Exception;

    public Food updateAvailabilityStatus(Long foodId) throws Exception;

    public List<Food> filterByVegetarian();

    public List<Food> filterByNonVegetarian();

    public List<Food> getAllFoods();

}
