package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.USER_ROLE;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(username);

        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }

        USER_ROLE role = user.getRole();
        if(role == null) {
            role = USER_ROLE.ROLE_USER;
        }

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(role.toString()));

        return new
                org.springframework.security.core.userdetails.User
                (user.getEmail(),user.getPassword(),authorities);

    }
}
