package com.vipusa.onlineFood.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Favourite {
    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "relevantUser")
    private User user;

    @ElementCollection
    private List<Restaurant> favouritlist = new ArrayList<>();

}
