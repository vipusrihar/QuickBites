package com.vipusa.onlineFood.request;

import com.vipusa.onlineFood.defaults.RESTAURANT_TYPE;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class CreateRestaurantRequest {
    private String name;
    private String city;
    private String address;
    private String description;
    private RESTAURANT_TYPE restaurantType;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private List<String> phoneNumbers;
    private String instagram;
    private String facebook;
    private String twitter;
    private String zipCode;
    private List<String> images;

}
