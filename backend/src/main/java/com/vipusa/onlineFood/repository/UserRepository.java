package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

    User findByEmail(String username);

    List<User> findAll();

}
