package com.fooddelivery.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @NotBlank(message = "Phone is required")
    @Size(max = 15, message = "Phone must be less than 15 characters")
    private String phone;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address must be less than 255 characters")
    private String address;
    
    @Column(name = "loyalty_points")
    private Integer loyaltyPoints = 0;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "last_order_date")
    private LocalDateTime lastOrderDate;
    
    // Default constructor
    public Customer() {
        this.createdAt = LocalDateTime.now();
    }
    
    // Constructor
    public Customer(User user, String phone, String address) {
        this.user = user;
        this.phone = phone;
        this.address = address;
        this.loyaltyPoints = 0;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }

    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }
    
    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getLastOrderDate() {
        return lastOrderDate;
    }
    
    public void setLastOrderDate(LocalDateTime lastOrderDate) {
        this.lastOrderDate = lastOrderDate;
    }
    
    public void updateLastOrderDate() {
        this.lastOrderDate = LocalDateTime.now();
    }
    
    // Business methods
    public void addLoyaltyPoints(Integer points) {
        this.loyaltyPoints += points;
    }
    
    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", userId=" + (user != null ? user.getId() : null) +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", loyaltyPoints=" + loyaltyPoints +
                ", createdAt=" + createdAt +
                '}';
    }
}