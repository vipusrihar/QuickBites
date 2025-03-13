package com.vipusa.onlineFood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String address;

    @OneToMany
    @JoinColumn( name = "foods")
    private List<Food> foodsList = new ArrayList<> ();

    private boolean isWorking;

    @ElementCollection
    private List<Double> phoneNumbers = new ArrayList<>();

    private Time openingTime;

    private Time closingTime;

}
