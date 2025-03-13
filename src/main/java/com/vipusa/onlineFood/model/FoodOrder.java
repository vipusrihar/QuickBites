package com.vipusa.onlineFood.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FoodOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "restaurantId")
    private Restaurant restaurant;

    private Date orderedAt;

    private Date deliveredAt;

    private String orderStatus;

    private Double amount;

    @ManyToMany
    @JoinTable(name = "food_order_items",
            joinColumns = @JoinColumn(name = "food_order_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private List<Food> orderItemList = new ArrayList<>();

}
