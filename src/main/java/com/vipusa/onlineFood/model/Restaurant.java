package com.vipusa.onlineFood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
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

    @OneToMany(mappedBy = "restaurant" , cascade = CascadeType.ALL)
    private List<Food> foodsList = new ArrayList<> ();

    private boolean isWorking;

    @Enumerated(EnumType.STRING)
    private RESTAURANT_TYPE restaurantType;

    @ElementCollection
    private List<String> phoneNumbers = new ArrayList<>();

    private LocalTime openingTime;

    private LocalTime closingTime;

    private String description;

    private LocalDate registeredDate;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private Boolean status = false;

    private Boolean adminPermission = false;

}
