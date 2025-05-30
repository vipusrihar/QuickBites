package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Favorites;
import com.vipusa.onlineFood.model.Restaurant;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.FavoritesRepository;
import com.vipusa.onlineFood.repository.RestaurantRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class FavouritesServiceImpl implements FavouritesService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    FavoritesRepository favoritesRepository;

    public void addRestaurantToFavourites(Long userId, Long restaurantId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        Favorites favorites = favoritesRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Favorites newFavorites = new Favorites();
                    newFavorites.setUser(user);
                    return newFavorites;
                });

        boolean added = false;

        Set<Restaurant> favRestaurants = favorites.getRestaurants();
        if (favRestaurants.contains(restaurant)) {
            added  = favorites.getRestaurants().remove(restaurant); // toggle logic
        } else {
            added  = favorites.getRestaurants().add(restaurant);
        }



        if (added) {
            favoritesRepository.save(favorites);
        } else {
            throw new RuntimeException("Restaurant already in favourites");
        }

        System.out.println("xasdxa");
    }

}


