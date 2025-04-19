package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Cart;
import com.vipusa.onlineFood.model.CartItem;
import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.CartRepository;
import com.vipusa.onlineFood.repository.FoodRepository;
import com.vipusa.onlineFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Cart findByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user);
    }

    @Override
    public Cart addItemsToCart(User user, Food food) {
        Cart cart = findByUser(user.getId());

        // Check if food already exists in the cart
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getFood().getId().equals(food.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + 1); // Increase quantity
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setFood(food);
            newItem.setQuantity(1);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    @Override
    public Cart removeItemsFromCart(User user, Long foodId) {
        Cart cart = findByUser(user.getId());

        cart.getItems().removeIf(item -> item.getFood().getId().equals(foodId));

        return cartRepository.save(cart);
    }

    @Override
    public Cart updateCartItemQuantity(User user, Long foodId, int newQuantity) {
        Cart cart = findByUser(user.getId());

        for (CartItem item : cart.getItems()) {
            if (item.getFood().getId().equals(foodId)) {
                if (newQuantity <= 0) {
                    cart.getItems().remove(item); // Remove item if quantity is 0
                } else {
                    item.setQuantity(newQuantity);
                }
                break;
            }
        }

        return cartRepository.save(cart);
    }
}
