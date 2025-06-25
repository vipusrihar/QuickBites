package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.config.JwtProvider;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider  jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String token = jwt.startsWith("Bearer ") ? jwt.substring(7) : jwt;
        String email = jwtProvider.getEmailFromJwtToken(token);
        User user = findUserByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new  Exception("User Not Found");
        }
        return user;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
