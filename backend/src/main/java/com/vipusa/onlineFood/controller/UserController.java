package com.vipusa.onlineFood.controller;


import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.service.FavouritesService;
import com.vipusa.onlineFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FavouritesService favouritesService;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserJwtToken(
            @RequestHeader(value = "Authorization", required = true) String authorizationHeader) throws Exception {

        User user = userService.findUserByJwtToken(authorizationHeader);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{userId}/favorites/add/{restaurantId}")
    public ResponseEntity<?> addToFavourites(
            @PathVariable Long userId,
            @PathVariable Long restaurantId) {
        favouritesService.addRestaurantToFavourites(userId, restaurantId);
        return ResponseEntity.ok("Restaurant added to favourites.");
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllRestaurant(
            @RequestHeader(value = "Authorization", required = true) String authorizationHeader) throws Exception {

        User user = userService.findUserByJwtToken(authorizationHeader);
        List<User> userList = userService.findAll();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }


}
