#!/bin/bash

echo "Starting Food Delivery Backend..."
echo ""
echo "Make sure you have Java 17 or higher installed."
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please install Java 17 or higher"
    exit 1
fi

echo "Java is installed. Starting the application..."
echo ""

# Start the Spring Boot application
./mvnw spring-boot:run