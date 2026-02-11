package com.fooddelivery.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vendors")
public class Vendor {
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
    
    @NotBlank(message = "Business name is required")
    @Size(max = 100, message = "Business name must be less than 100 characters")
    @Column(name = "business_name")
    private String businessName;
    
    @NotBlank(message = "Business license is required")
    @Size(max = 50, message = "Business license must be less than 50 characters")
    @Column(name = "business_license", unique = true)
    private String businessLicense;
    
    @Column(name = "is_approved")
    private Boolean isApproved = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "approved_at")
    private LocalDateTime approvedAt;
    
    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Restaurant> restaurants = new ArrayList<>();
    
    // Default constructor
    public Vendor() {
        this.createdAt = LocalDateTime.now();
        this.isApproved = false;
    }
    
    // Constructor
    public Vendor(User user, String phone, String address, String businessName, String businessLicense) {
        this.user = user;
        this.phone = phone;
        this.address = address;
        this.businessName = businessName;
        this.businessLicense = businessLicense;
        this.isApproved = false;
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
    
    public String getBusinessName() {
        return businessName;
    }
    
    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
    
    public String getBusinessLicense() {
        return businessLicense;
    }
    
    public void setBusinessLicense(String businessLicense) {
        this.businessLicense = businessLicense;
    }
    
    public Boolean getIsApproved() {
        return isApproved;
    }
    
    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
        if (isApproved && this.approvedAt == null) {
            this.approvedAt = LocalDateTime.now();
        }
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }
    
    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }
    
    public List<Restaurant> getRestaurants() {
        return restaurants;
    }
    
    public void setRestaurants(List<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }
    
    // Business methods
    public void approve() {
        this.isApproved = true;
        this.approvedAt = LocalDateTime.now();
    }
    
    public void addRestaurant(Restaurant restaurant) {
        restaurants.add(restaurant);
        restaurant.setVendor(this);
    }
    
    public void removeRestaurant(Restaurant restaurant) {
        restaurants.remove(restaurant);
        restaurant.setVendor(null);
    }
    
    @Override
    public String toString() {
        return "Vendor{" +
                "id=" + id +
                ", userId=" + (user != null ? user.getId() : null) +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", businessName='" + businessName + '\'' +
                ", businessLicense='" + businessLicense + '\'' +
                ", isApproved=" + isApproved +
                ", createdAt=" + createdAt +
                '}';
    }
}