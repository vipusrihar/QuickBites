package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Restaurant;
import org.springframework.stereotype.Service;

@Service
public interface FavouritesService {
    void addRestaurantToFavourites(Long userId, Long restaurantId);
}
