package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Cart;
import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.User;

public interface CartService {

    public Cart findByUser(Long UserId);

    public Cart addItemsToCart(User user, Food food);

    public Cart removeItemsFromCart ( User user, Long foodId);

    public Cart updateCartItemQuantity(User user, Long foodId);


}
