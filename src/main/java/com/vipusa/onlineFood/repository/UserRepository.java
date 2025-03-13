package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {


    User findByEmail(String username);

}
