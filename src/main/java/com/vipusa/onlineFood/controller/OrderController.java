package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.model.FoodOrder;
import com.vipusa.onlineFood.request.OrderRequest;
import com.vipusa.onlineFood.service.FoodService;
import com.vipusa.onlineFood.service.OrderService;
import com.vipusa.onlineFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    //Create order
    @PostMapping("")
    public ResponseEntity<FoodOrder> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            FoodOrder order = orderService.createOrder(orderRequest);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //Get order by ID
    @GetMapping("/{orderId}")
    public ResponseEntity<FoodOrder> getOrderById(@PathVariable Long orderId) {
        try {
            FoodOrder order = orderService.findById(orderId);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Get orders by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FoodOrder>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.findOrdersByUser(userId));
    }

    //Get orders by restaurant
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodOrder>> getOrdersByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(orderService.findOrdersByRestaurants(restaurantId));
    }

    //Get all orders
    @GetMapping("/all")
    public ResponseEntity<List<FoodOrder>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAllOrder());
    }

    //Get delivered orders
    @GetMapping("/delivered")
    public ResponseEntity<List<FoodOrder>> getDeliveredOrders() {
        return ResponseEntity.ok(orderService.findDeliveredOrders());
    }

    //Get preparing orders (example: packed)
    @GetMapping("/preparing")
    public ResponseEntity<List<FoodOrder>> getPreparingOrders() {
        return ResponseEntity.ok(orderService.findPreparingStatusOrders());
    }

    //Change order status (e.g., from accepted → packed → out for delivery → delivered)
    @PutMapping("/status/{orderId}")
    public ResponseEntity<FoodOrder> changeOrderStatus(@PathVariable Long orderId) {
        try {
            FoodOrder updatedOrder = orderService.changeOrderStatus(orderId);
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Delete order
    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
