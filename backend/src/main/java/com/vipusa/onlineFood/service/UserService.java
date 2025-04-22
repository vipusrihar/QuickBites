package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.User;

public interface UserService {

    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;


}
