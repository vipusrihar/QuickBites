package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.defaults.FOOD_TYPE;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class EnumServiceImpl implements EnumService {

    @Override
    public List<String> getAllFoodTypes() {
        return Arrays.stream(FOOD_TYPE.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
