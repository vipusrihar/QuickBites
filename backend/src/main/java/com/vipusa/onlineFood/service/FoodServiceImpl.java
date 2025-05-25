package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.repository.FoodRepository;
import com.vipusa.onlineFood.repository.RestaurantRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import com.vipusa.onlineFood.request.FoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FoodServiceImpl implements FoodService{

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Food createFood(FoodRequest foodRequest, Restaurant restaurant) {
        Food food = new Food();
        food.setName(foodRequest.getName());
        food.setPrice(foodRequest.getPrice());
        food.setDescription(foodRequest.getDescription());
        food.setAvailable(false);
        food.setVegetarian(foodRequest.getVegetarian());
        food.setRestaurant(restaurant);

        Food saveFood = foodRepository.save(food);
        return saveFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        if(food == null){
            throw new Exception("Food not find With this Id");
        }
        foodRepository.deleteById(foodId);
    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new Exception("Restaurant not found with ID: " + restaurantId));

        List<Food> foodList = foodRepository.findByRestaurantId(restaurantId);
        return foodList;

    }

    @Override
    public List<Food> searchFood(String keyword) {
        List<Food> foodList = foodRepository.findBySearchQuery(keyword);
        return foodList;
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception   {
        Food food = foodRepository.findById(foodId).orElseThrow(() -> new Exception("Food Not Found")) ;
        return food;
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }

    @Override
    public List<Food> filterByVegetarian(){
        List<Food> foodList = foodRepository.findAll();
        List<Food> filteredList = new ArrayList<>();
        for(Food food : foodList){
            if(food.isVegetarian()) {
                filteredList.add(food);
            }
        }
        return filteredList;
    }

    @Override
    public List<Food> filterByNonVegetarian(){
        List<Food> foodList = foodRepository.findAll();
        List<Food> filteredList = new ArrayList<>();
        for(Food food : foodList){
            if(!food.isVegetarian()) {
                filteredList.add(food);
            }
        }
        return filteredList;
    }
}
