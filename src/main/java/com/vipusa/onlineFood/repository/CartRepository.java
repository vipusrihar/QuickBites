package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.Cart;
import com.vipusa.onlineFood.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {

    Cart findByUser(User user);

}
