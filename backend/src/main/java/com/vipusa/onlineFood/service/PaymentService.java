package com.vipusa.onlineFood.service;

import com.vipusa.onlineFood.model.Order;
import com.vipusa.onlineFood.response.PaymentResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentService {

    public PaymentResponse createPaymentLink(Order order);
}
