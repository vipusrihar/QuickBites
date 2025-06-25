package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.User;

import java.util.List;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;


    public List<User> findAll();
}
