package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.*;
import com.vipusa.onlineFood.repository.FoodRepository;
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

    @Autowired
    private FoodRepository foodRepository;


    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest createRestaurantRequest, User user) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(createRestaurantRequest.getName());
        restaurant.setOpeningTime(createRestaurantRequest.getOpeningTime());
        restaurant.setClosingTime(createRestaurantRequest.getClosingTime());
        SocialMedias socialMedias = new SocialMedias();
        socialMedias.setFacebook(createRestaurantRequest.getFacebook());
        socialMedias.setTwitter(createRestaurantRequest.getTwitter());
        socialMedias.setInstagram(createRestaurantRequest.getInstagram());
        restaurant.setSocialMedias(socialMedias);
        restaurant.setType(createRestaurantRequest.getRestaurantType());
        restaurant.setPhoneNumbers(new ArrayList<>(createRestaurantRequest.getPhoneNumbers()));
        restaurant.setDescription(createRestaurantRequest.getDescription());
        Address address = new Address();
        address.setCity(createRestaurantRequest.getCity());
        address.setZipCode(createRestaurantRequest.getZipCode());
        address.setStreet(createRestaurantRequest.getAddress());
        restaurant.setAddress(address);
        restaurant.setImages(createRestaurantRequest.getImages());
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
        Address  newAddress = new Address();
        newAddress.setStreet(updateRestaurantRequest.getAddress());
        newAddress.setZipCode(updateRestaurantRequest.getZipCode());
        newAddress.setCity(updateRestaurantRequest.getCity());
        restaurant.setAddress(newAddress);
        restaurant.setOpeningTime(updateRestaurantRequest.getOpeningTime());
        restaurant.setClosingTime(updateRestaurantRequest.getClosingTime());
        restaurant.setType(updateRestaurantRequest.getRestaurantType());
        restaurant.setPhoneNumbers(new ArrayList<>(updateRestaurantRequest.getPhoneNumbers()));
        restaurant.setDescription(updateRestaurantRequest.getDescription());

        SocialMedias socialMedias = new SocialMedias();
        socialMedias.setFacebook(updateRestaurantRequest.getFacebook());
        socialMedias.setTwitter(updateRestaurantRequest.getTwitter());
        socialMedias.setInstagram(updateRestaurantRequest.getInstagram());
        restaurant.setSocialMedias(socialMedias);

        restaurant.setImages(updateRestaurantRequest.getImages());


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
        if (restaurant.getMenuItems() == null) {
            restaurant.setMenuItems(new ArrayList<>());
        }

        // Associate the food with the restaurant
        food.setRestaurant(restaurant);
        restaurant.getMenuItems().add(food);

        // Save updated restaurant
        restaurantRepository.save(restaurant);
    }


    @Override
    public void deleteFood(Long restaurantId, Long foodId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        Food foodToDelete = null;
        for (Food food : restaurant.getMenuItems()) {
            if (food.getId().equals(foodId)) {
                foodToDelete = food;
                break;
            }
        }

        if (foodToDelete == null) {
            throw new Exception("Food item not found with id: " + foodId + " in restaurant id: " + restaurantId);
        }

        restaurant.getMenuItems().remove(foodToDelete);

        foodRepository.deleteById(foodId);

        restaurantRepository.save(restaurant);
    }

}
