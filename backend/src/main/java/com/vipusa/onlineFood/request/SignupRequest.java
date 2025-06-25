package com.vipusa.onlineFood.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vipusa.onlineFood.defaults.USER_ROLE;
import com.vipusa.onlineFood.model.Address;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SignupRequest {

    private String email;
    private String password;
    private USER_ROLE role;
    private String firstName;
    private String lastName;
    private List<Address> addresses;

}
