package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.*;
import com.vipusa.onlineFood.repository.FoodRepository;
import com.vipusa.onlineFood.repository.RestaurantRepository;
import com.vipusa.onlineFood.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private static final String RESTAURANT_NOT_FOUND = "Restaurant not found with ID: ";

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    @Transactional
    public Restaurant createRestaurant(CreateRestaurantRequest request, User user) {
        Restaurant restaurant = buildRestaurantFromRequest(request);
        restaurant.setWorking(false);
        restaurant.setOwner(user);
        restaurant.setRegisteredDate(LocalDate.now());

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest request) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        updateRestaurantFromRequest(restaurant, request);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        findRestaurantById(restaurantId); // Ensure it exists
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
                .orElseThrow(() -> new Exception(RESTAURANT_NOT_FOUND + restaurantId));
    }

    @Override
    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        restaurant.setWorking(!restaurant.isWorking());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public boolean addFoodCategories(String category, Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        String normalizedCategory = category.toLowerCase();
        List<String> foodCategories = restaurant.getFoodCategories();

        if (!foodCategories.contains(normalizedCategory)) {
            foodCategories.add(normalizedCategory);
            restaurant.setFoodCategories(foodCategories);
            restaurantRepository.save(restaurant);
            return true;
        }
        return false;
    }

    @Override
    public List<String> getFoodCategories(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        List<String> foodCategories = restaurant.getFoodCategories();
        return foodCategories;
    }

    @Override
    public boolean deleteFoodCategories(String category, Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);
        String normalizedCategory = category.toLowerCase();
        List<String> foodCategories = restaurant.getFoodCategories();

        if (foodCategories.contains(normalizedCategory)) {
            foodCategories.remove(normalizedCategory);
            restaurant.setFoodCategories(foodCategories);
            restaurantRepository.save(restaurant);
            return true;
        }
        return false;
    }

    @Override
    public Restaurant findRestaurantByUserId(Long userId) throws Exception {
        return restaurantRepository.findByOwnerId(userId)
                .orElseThrow(() -> new Exception(RESTAURANT_NOT_FOUND + userId));
    }

    // ----------------------------------
    // Helper Methods
    // ----------------------------------

    private Restaurant buildRestaurantFromRequest(CreateRestaurantRequest request) {
        Restaurant restaurant = new Restaurant();

        restaurant.setName(request.getName());
        restaurant.setOpeningTime(request.getOpeningTime());
        restaurant.setClosingTime(request.getClosingTime());
        restaurant.setType(request.getRestaurantType());
        restaurant.setPhoneNumbers(new ArrayList<>(request.getPhoneNumbers()));
        restaurant.setDescription(request.getDescription());
        restaurant.setImages(request.getImages());

        restaurant.setAddress(buildAddressFromRequest(request));
        restaurant.setSocialMedias(buildSocialMediasFromRequest(request));

        return restaurant;
    }

    private void updateRestaurantFromRequest(Restaurant restaurant, CreateRestaurantRequest request) {
        restaurant.setName(request.getName());
        restaurant.setOpeningTime(request.getOpeningTime());
        restaurant.setClosingTime(request.getClosingTime());
        restaurant.setType(request.getRestaurantType());
        restaurant.setPhoneNumbers(new ArrayList<>(request.getPhoneNumbers()));
        restaurant.setDescription(request.getDescription());
        restaurant.setImages(request.getImages());
        restaurant.setAddress(buildAddressFromRequest(request));
        restaurant.setSocialMedias(buildSocialMediasFromRequest(request));
    }

    private Address buildAddressFromRequest(CreateRestaurantRequest request) {
        Address address = new Address();
        address.setStreet(request.getAddress());
        address.setZipCode(request.getZipCode());
        address.setCity(request.getCity());
        return address;
    }

    private SocialMedias buildSocialMediasFromRequest(CreateRestaurantRequest request) {
        SocialMedias socialMedias = new SocialMedias();
        socialMedias.setFacebook(request.getFacebook());
        socialMedias.setTwitter(request.getTwitter());
        socialMedias.setInstagram(request.getInstagram());
        return socialMedias;
    }
}
