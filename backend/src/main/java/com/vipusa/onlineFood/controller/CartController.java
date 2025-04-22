package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.model.Cart;
import com.vipusa.onlineFood.model.Food;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.service.CartService;
import com.vipusa.onlineFood.service.FoodService;
import com.vipusa.onlineFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    @PostMapping("/create")
    public ResponseEntity<Cart> createCart(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = new Cart();
        cart.setUser(user);
        return new ResponseEntity<>(cart, HttpStatus.CREATED);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItemsToCart(
            @RequestHeader("Authorization") String jwt,
            @RequestParam Long foodId) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(foodId);
        Cart cart = cartService.addItemsToCart(user, food);

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeItemsFromCart(
            @RequestHeader("Authorization") String jwt,
            @RequestParam Long foodId) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.removeItemsFromCart(user, foodId);

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/update-quantity")
    public ResponseEntity<Cart> updateQuantity(
            @RequestHeader("Authorization") String jwt,
            @RequestParam Long foodId,
            @RequestParam int quantity) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.updateCartItemQuantity(user, foodId, quantity);

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }
}
