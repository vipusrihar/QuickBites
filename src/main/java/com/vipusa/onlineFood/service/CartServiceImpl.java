package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Cart;
import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.User;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService{
    @Override
    public Cart findByUser(Long UserId) {
        return null;
    }

    @Override
    public Cart addItemsToCart(User user, Food food) {
        return null;
    }

    @Override
    public Cart removeItemsFromCart(User user, Long FoodId) {
        return null;
    }

    @Override
    public Cart updateCartItemQuantity(User user, Long foodId){
        return null;
    }


}
