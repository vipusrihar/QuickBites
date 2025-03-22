package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.RestaurantRepository;
import com.vipusa.onlineFood.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest, User user) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(createRestaurantRequest.getName());
        restaurant.setAddress(createRestaurantRequest.getAddress());
        restaurant.setOpeningTime(createRestaurantRequest.getOpeningTime());
        restaurant.setClosingTime(createRestaurantRequest.getClosingTime());
        restaurant.setRestaurantType(createRestaurantRequest.getRestaurantType());
        restaurant.setPhoneNumbers(new ArrayList<>(createRestaurantRequest.getPhoneNumbers()));
        restaurant.setDescription(createRestaurantRequest.getDescription());
        restaurant.setWorking(false);
        restaurant.setOwner(user);
        restaurant.setRegisteredDate(LocalDate.now());

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurantRequest) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        if(restaurant == null){
            throw new Exception("Restaurant not find with id "+restaurantId);
        }

        restaurant.setName(updateRestaurantRequest.getName());
        restaurant.setAddress(updateRestaurantRequest.getAddress());
        restaurant.setOpeningTime(updateRestaurantRequest.getOpeningTime());
        restaurant.setClosingTime(updateRestaurantRequest.getClosingTime());
        restaurant.setRestaurantType(updateRestaurantRequest.getRestaurantType());
        restaurant.setPhoneNumbers(new ArrayList<>(updateRestaurantRequest.getPhoneNumbers()));
        restaurant.setDescription(updateRestaurantRequest.getDescription());

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurantRepository.deleteById(restaurantId);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long restaurantId) throws Exception {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new Exception("Restaurant not found with ID: " + restaurantId));
    }

    @Override
    public List<Restaurant> getRestaurantByOwnerId(Long userId) {
        return restaurantRepository.findByOwnerId(userId);
    }

    @Override
    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurant.setWorking(!restaurant.isWorking());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void addFood(Long restaurantId, Food food) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        // Ensure food list is initialized
        if (restaurant.getFoodsList() == null) {
            restaurant.setFoodsList(new ArrayList<>());
        }

        // Associate the food with the restaurant
        food.setRestaurant(restaurant);
        restaurant.getFoodsList().add(food);

        // Save updated restaurant
        restaurantRepository.save(restaurant);
    }


    @Override
    public void deleteFood(Long restaurantId, Long foodId) {

    }
}
