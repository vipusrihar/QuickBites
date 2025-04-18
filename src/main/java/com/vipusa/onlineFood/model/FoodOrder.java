package com.vipusa.onlineFood.model;

import com.vipusa.onlineFood.defaluts.ORDER_STATUS;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
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
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "restaurantId")
    private Restaurant restaurant;

    private LocalDate orderedAt;
    private LocalTime orderTime;

    private LocalDate deliveredAt;
    private LocalTime deliverTime;

    private ORDER_STATUS orderStatus;

    private Double amount;

    @ManyToMany
    @JoinTable(name = "food_order_items",
            joinColumns = @JoinColumn(name = "food_order_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private List<Food> orderItemList = new ArrayList<>();

}
