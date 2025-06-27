package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.defaults.FOOD_TYPE;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EnumService {

    List<String> getAllFoodTypes();
}
