package com.vipusa.onlineFood.controller;

import com.vipusa.onlineFood.model.Order;
import com.vipusa.onlineFood.model.User;
import com.vipusa.onlineFood.request.OrderRequest;
import com.vipusa.onlineFood.response.PaymentResponse;
import com.vipusa.onlineFood.service.FoodService;
import com.vipusa.onlineFood.service.OrderService;
import com.vipusa.onlineFood.service.PaymentService;
import com.vipusa.onlineFood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    //Create order
    @PostMapping("")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest orderRequest,
                                                       @RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.findUserByJwtToken(jwt);
            Order order = orderService.createOrder(orderRequest,user);
            PaymentResponse response = paymentService.createPaymentLink(order);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    //Get order by ID
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        try {
            Order order = orderService.findById(orderId);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Get orders by user
    @GetMapping("/user")
    public ResponseEntity<List<Order>> getOrdersByUser(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(orderService.findOrdersByUser(user.getId()));
    }

    //Get orders by restaurant
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getOrdersByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(orderService.findOrdersByRestaurants(restaurantId));
    }

    //Get all orders
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAllOrder());
    }

    //Get delivered orders
    @GetMapping("/delivered")
    public ResponseEntity<List<Order>> getDeliveredOrders() {
        return ResponseEntity.ok(orderService.findDeliveredOrders());
    }

    //Get preparing orders (example: packed)
    @GetMapping("/preparing")
    public ResponseEntity<List<Order>> getPreparingOrders() {
        return ResponseEntity.ok(orderService.findPreparingStatusOrders());
    }

    //Change order status (e.g., from accepted → packed → out for delivery → delivered)
    @PutMapping("/status/{orderId}")
    public ResponseEntity<Order> changeOrderStatus(@PathVariable Long orderId) {
        try {
            Order updatedOrder = orderService.changeOrderStatus(orderId);
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
