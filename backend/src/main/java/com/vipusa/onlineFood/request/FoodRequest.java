package com.vipusa.onlineFood.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodRequest {

    private String name;
    private Double price;

    private String description;

    private Boolean vegetarian;

    private String image;
}
