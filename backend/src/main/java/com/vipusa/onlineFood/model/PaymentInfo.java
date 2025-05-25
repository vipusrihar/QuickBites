package com.vipusa.onlineFood.model;

import com.vipusa.onlineFood.defaults.PAYMENT_METHOD;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInfo {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PAYMENT_METHOD method;

    private String transactionId;
    private LocalDateTime paymentTime;
    private boolean successful;


}