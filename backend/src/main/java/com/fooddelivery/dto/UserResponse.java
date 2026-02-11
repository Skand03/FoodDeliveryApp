package com.fooddelivery.dto;

import com.fooddelivery.model.User;
import com.fooddelivery.model.Customer;
import com.fooddelivery.model.Vendor;
import com.fooddelivery.model.Role;

public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private Role role;
    
    // Additional fields for vendors
    private String businessName;
    private String businessLicense;
    private Boolean isApproved;
    
    // Additional fields for customers
    private Integer loyaltyPoints;

    // Default constructor
    public UserResponse() {}

    // Constructor from User entity
    public UserResponse(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole();
        // Note: phone and address will be null, should be set separately
    }

    // Constructor from User and Customer
    public UserResponse(User user, Customer customer) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole();
        if (customer != null) {
            this.phone = customer.getPhone();
            this.address = customer.getAddress();
            this.loyaltyPoints = customer.getLoyaltyPoints();
        }
    }

    // Constructor from User and Vendor
    public UserResponse(User user, Vendor vendor) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.role = user.getRole();
        if (vendor != null) {
            this.phone = vendor.getPhone();
            this.address = vendor.getAddress();
            this.businessName = vendor.getBusinessName();
            this.businessLicense = vendor.getBusinessLicense();
            this.isApproved = vendor.getIsApproved();
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getBusinessLicense() { return businessLicense; }
    public void setBusinessLicense(String businessLicense) { this.businessLicense = businessLicense; }

    public Boolean getIsApproved() { return isApproved; }
    public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }

    public Integer getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(Integer loyaltyPoints) { this.loyaltyPoints = loyaltyPoints; }

    @Override
    public String toString() {
        return "UserResponse{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", role=" + role +
                '}';
    }
}