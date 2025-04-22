package com.vipusa.onlineFood.request;

import com.vipusa.onlineFood.model.Food;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private Long userId;

    private Long restaurantId;

    private Double orderRequest;

    private Double amount;

    private List<Food> orderList = new ArrayList<Food>();
}
