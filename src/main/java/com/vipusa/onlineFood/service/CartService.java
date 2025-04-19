package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Cart;
import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.User;

public interface CartService {

    Cart findByUser(Long userId);

    public Cart addItemsToCart(User user, Food food);

    public Cart removeItemsFromCart ( User user, Long foodId);

    Cart updateCartItemQuantity(User user, Long foodId, int newQuantity);


}
