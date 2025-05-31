package com.vipusa.onlineFood.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EnumService {
    List<String> getAllFoodCategories();

    List<String> getAllFoodTypes();
}
