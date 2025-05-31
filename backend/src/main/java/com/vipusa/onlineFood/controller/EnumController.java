package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.service.EnumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/enums")
public class EnumController {

    @Autowired
    private EnumService enumService;

    @GetMapping("/food-types")
    public ResponseEntity<List<String>> getFoodTypes() {
        return ResponseEntity.ok(enumService.getAllFoodTypes());
    }

    @GetMapping("/food-categories")
    public ResponseEntity<List<String>> getFoodCategories() {
        return ResponseEntity.ok(enumService.getAllFoodCategories());
    }
}
