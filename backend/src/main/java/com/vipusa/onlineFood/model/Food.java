package com.vipusa.onlineFood.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.vipusa.onlineFood.defaults.FOOD_CATEGORY;
import com.vipusa.onlineFood.defaults.FOOD_TYPE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name = "food_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Lob
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    @JsonBackReference
    private Restaurant restaurant;

    @Column(nullable = false)
    private boolean available = true;


    @NotNull
    @Column(nullable = false)
    private String imagePath;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FOOD_CATEGORY category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FOOD_TYPE foodType;
}
