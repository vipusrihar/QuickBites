package com.vipusa.onlineFood.request;


import com.vipusa.onlineFood.defaults.FOOD_CATEGORY;
import com.vipusa.onlineFood.defaults.FOOD_TYPE;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodRequest {

    private String name;
    private Double price;

    private String description;

    private String image;

    private FOOD_CATEGORY category;

    private FOOD_TYPE foodType;
}
