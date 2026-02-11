package com.fooddelivery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RestaurantRequest {
    @NotBlank(message = "Restaurant name is required")
    @Size(max = 100, message = "Restaurant name must be less than 100 characters")
    private String name;

    @NotBlank(message = "Cuisine type is required")
    @Size(max = 50, message = "Cuisine type must be less than 50 characters")
    private String cuisine;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address must be less than 255 characters")
    private String address;

    @Size(max = 15, message = "Phone must be less than 15 characters")
    private String phone;

    @Size(max = 20, message = "Delivery time must be less than 20 characters")
    private String deliveryTime;

    @Size(max = 10, message = "Image URL must be less than 10 characters")
    private String imageUrl;

    // Default constructor
    public RestaurantRequest() {}

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    @Override
    public String toString() {
        return "RestaurantRequest{" +
                "name='" + name + '\'' +
                ", cuisine='" + cuisine + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}