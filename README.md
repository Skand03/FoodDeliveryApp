# Food Delivery System - Student Learning Project

A simplified full-stack food delivery application with React frontend and Spring Boot backend, designed for IT students to learn proper layered architecture.

## Project Architecture

This project follows the **3-Layer Architecture** pattern commonly taught in IT courses:

### Backend (Spring Boot)
```
Controller Layer → Service Layer → Repository Layer → Database
```

- **Controller Layer**: Handles HTTP requests and responses (`AuthController`)
- **Service Layer**: Contains business logic (`UserService`)
- **Repository Layer**: Data access using Spring Data JPA (`UserRepository`)
- **Model Layer**: Entity classes (`User`)
- **DTO Layer**: Data Transfer Objects for API communication

### Frontend (React)
- **Components**: UI components (`Login`, `Register`, `Dashboard`)
- **Services**: API communication (`api.js`)
- **Routing**: Navigation between pages

## Project Structure

```
food-delivery-system/
├── src/                           # React Frontend
│   ├── components/
│   │   ├── Login.js              # Login page component
│   │   ├── Register.js           # Registration page component
│   │   └── Dashboard.js          # User dashboard
│   ├── services/
│   │   └── api.js                # API service for backend communication
│   ├── App.js                    # Main app component with routing
│   ├── index.js                  # React entry point
│   └── index.css                 # Styling
├── spring-backend/               # Spring Boot Backend
│   ├── src/main/java/com/fooddelivery/
│   │   ├── controller/
│   │   │   └── AuthController.java      # REST API endpoints
│   │   ├── service/
│   │   │   └── UserService.java         # Business logic layer
│   │   ├── repository/
│   │   │   └── UserRepository.java      # Data access layer
│   │   ├── model/
│   │   │   └── User.java                # User entity
│   │   ├── dto/                         # Data Transfer Objects
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── UserResponse.java
│   │   │   └── ApiResponse.java
│   │   ├── config/
│   │   │   └── WebConfig.java           # CORS configuration
│   │   └── FoodDeliveryApplication.java # Main Spring Boot class
│   ├── src/main/resources/
│   │   └── application.properties       # Database and server config
│   └── pom.xml                         # Maven dependencies
├── package.json                        # React dependencies
└── README.md
```

## Learning Objectives

This project demonstrates:

1. **Spring Boot Layered Architecture**
   - Controller → Service → Repository pattern
   - Dependency Injection with `@Autowired`
   - RESTful API design

2. **Data Validation**
   - Bean Validation with annotations (`@NotBlank`, `@Email`, etc.)
   - Custom error handling

3. **Database Integration**
   - JPA entities and relationships
   - H2 in-memory database for development
   - Spring Data JPA repositories

4. **Frontend-Backend Communication**
   - REST API consumption
   - CORS configuration
   - Error handling

5. **React Fundamentals**
   - Component-based architecture
   - State management with hooks
   - Form handling and validation

## Features

### Current Features
- User registration with validation
- User login authentication
- User dashboard
- Responsive design
- Error handling and user feedback

### Backend API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/users` - Get all users
- `GET /api/auth/users/{id}` - Get user by ID
- `GET /api/auth/check-email` - Check if email exists

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Java 17 or higher
- Maven 3.6 or higher

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd spring-backend
```

2. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

Or using Maven wrapper:
```bash
./mvnw spring-boot:run
```

The backend will run on `http://localhost:8080`

### Database Access

The application uses H2 in-memory database for development. You can access the H2 console at:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:fooddelivery`
- Username: `sa`
- Password: `password`

## Key Learning Points

### 1. Spring Boot Architecture
```java
@RestController  // Controller Layer
public class AuthController {
    @Autowired
    private UserService userService;  // Service Layer injection
}

@Service  // Service Layer
public class UserService {
    @Autowired
    private UserRepository userRepository;  // Repository Layer injection
}

@Repository  // Repository Layer (automatically provided by Spring Data JPA)
public interface UserRepository extends JpaRepository<User, Long> {
}
```

### 2. Data Validation
```java
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be less than 50 characters")
    private String firstName;
    
    @Email(message = "Email should be valid")
    private String email;
}
```

### 3. Error Handling
```java
try {
    User user = userService.registerUser(registerRequest);
    return ResponseEntity.ok(ApiResponse.success("User registered!", userResponse));
} catch (RuntimeException e) {
    return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
}
```

## Important Notes for Students

### Security Considerations
⚠️ **This is a learning project** - In production applications:
- Passwords should be hashed (use BCrypt)
- Implement proper authentication (JWT tokens)
- Add input sanitization
- Use HTTPS
- Implement rate limiting

### Database
- Currently uses H2 in-memory database (data is lost on restart)
- For production, use PostgreSQL, MySQL, or other persistent databases

### Best Practices Demonstrated
- Separation of concerns (layered architecture)
- Dependency injection
- Data validation
- Error handling
- RESTful API design
- Component-based frontend

## Next Steps for Learning

1. **Add Password Hashing**: Implement BCrypt for password security
2. **JWT Authentication**: Add token-based authentication
3. **Database Migration**: Switch to PostgreSQL/MySQL
4. **Add More Entities**: Restaurant, MenuItem, Order entities
5. **Implement Business Logic**: Order processing, payment handling
6. **Add Testing**: Unit tests and integration tests
7. **Deploy**: Learn deployment to cloud platforms

## Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3

### Backend
- Spring Boot 3.2
- Spring Data JPA
- Spring Web
- H2 Database
- Maven
- Bean Validation

This project provides a solid foundation for understanding full-stack development with Spring Boot and React!