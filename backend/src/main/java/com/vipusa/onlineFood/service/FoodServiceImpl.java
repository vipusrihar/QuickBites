package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.defaults.FOOD_TYPE;
import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.repository.FoodRepository;
import com.vipusa.onlineFood.repository.RestaurantRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import com.vipusa.onlineFood.request.FoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    @Transactional
    public Food createFood(FoodRequest foodRequest, Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + restaurantId));

        String requestedCategory = foodRequest.getCategory();
        if (requestedCategory == null || requestedCategory.isBlank()) {
            throw new RuntimeException("Food category must not be empty.");
        }

        String normalizedCategory = requestedCategory.toLowerCase();
        if (!restaurant.getFoodCategories().contains(normalizedCategory)) {
            throw new RuntimeException("Food category '" + normalizedCategory + "' is not supported by this restaurant.");
        }

        Food food = Food.builder()
                .name(foodRequest.getName())
                .price(foodRequest.getPrice())
                .description(foodRequest.getDescription())
                .available(false)
                .restaurant(restaurant)
                .imagePath(foodRequest.getImage())
                .foodType(foodRequest.getFoodType())
                .category(normalizedCategory)
                .build();

        return foodRepository.save(food);
    }


    @Override
    public void deleteFood(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        foodRepository.deleteById(food.getId());
    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId) throws Exception {
        restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new Exception("Restaurant not found with ID: " + restaurantId));
        return foodRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.findBySearchQuery(keyword);
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        return foodRepository.findById(foodId)
                .orElseThrow(() -> new Exception("Food not found with ID: " + foodId));
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }

    @Override
    public List<Food> filterByVegetarian() {
        return filterFoodByType(FOOD_TYPE.VEG);
    }

    @Override
    public List<Food> filterByNonVegetarian() {
        return filterFoodByType(FOOD_TYPE.NONVEG);
    }

    private List<Food> filterFoodByType(FOOD_TYPE type) {
        return foodRepository.findAll().stream()
                .filter(food -> food.getFoodType().equals(type))
                .collect(Collectors.toList());
    }

    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }
}
