# 🎓 Campus Eats - College Food Delivery App

A full-stack College Food Delivery Web Application built using React for the frontend and Spring Boot for the backend. The app allows students, faculty, and staff to browse campus restaurants, canteens, and food stalls, order food, and get it delivered across the campus. It also provides vendor registration and role-based dashboards.

## 🚀 Features

### 👤 Student/Faculty Features
- User registration & login with college credentials
- Browse campus restaurants, canteens, and food stalls
- Search & filter by department location
- Add/remove items from cart
- Place orders with campus delivery
- Order history and tracking
- Department-wise food browsing

### 🏪 Vendor Features
- Vendor registration for campus food businesses
- Vendor dashboard for managing business
- Menu management (coming soon)
- Order management (coming soon)
- Analytics and reports (coming soon)

### 👨‍💼 Admin Features
- Admin dashboard for platform management
- User management across all roles
- Vendor approval and management
- Platform analytics and monitoring

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Modern CSS with Flexbox/Grid
- Responsive design

### Backend
- Spring Boot
- Spring Data JPA
- REST APIs
- Role-based authentication (CUSTOMER, RESTAURANT_OWNER, ADMIN)
- MySQL/PostgreSQL database

## 🎨 Design Features

### College-Themed UI
- Campus-focused branding and messaging
- College department categorization
- Student-friendly color scheme (blue theme)
- Role-based navigation and dashboards
- Mobile-responsive design

### Role-Based Access
- **Students/Faculty (CUSTOMER)**: Browse, order, track deliveries
- **Vendors (RESTAURANT_OWNER)**: Manage business, view orders, analytics
- **Admins (ADMIN)**: Platform management, user oversight, vendor approval

## 📁 Project Structure

```
FoodDeliveryApp/
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js          # College-themed homepage
│   │   │   ├── Login.js         # Role-aware login
│   │   │   ├── Register.js      # Student registration
│   │   │   ├── VendorRegister.js # Vendor registration
│   │   │   ├── VendorDashboard.js # Vendor management
│   │   │   ├── AdminDashboard.js # Admin panel
│   │   │   ├── Restaurants.js   # Campus food browsing
│   │   │   └── Navbar.js        # Role-based navigation
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main routing with new pages
│   │   └── index.css            # College-themed styling
├── backend/                     # Spring Boot Backend
│   ├── src/main/java/com/fooddelivery/
│   │   ├── model/
│   │   │   └── User.java        # User entity with roles
│   │   └── ...                  # Other backend components
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Java 17+
- Maven
- MySQL/PostgreSQL
- Git

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd FoodDeliveryApp/backend
   ```

2. Configure database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/campus_eats
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```
   Backend runs on: http://localhost:8082

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd FoodDeliveryApp/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   Frontend runs on: http://localhost:3000

## 🔐 User Roles & Access

### Customer (Students/Faculty)
- Register with college credentials
- Browse campus food options
- Place and track orders
- Access to cart and order history

### Restaurant Owner (Vendors)
- Register campus food business
- Access vendor dashboard
- Manage menu and orders (coming soon)
- View business analytics (coming soon)

### Admin
- Platform oversight and management
- User and vendor management
- System analytics and reports

## 🎯 Key Improvements Made

1. **College Theme**: Updated branding, colors, and messaging for campus environment
2. **Role-Based Registration**: Separate registration flows for students and vendors
3. **Vendor Onboarding**: Complete vendor registration with business details
4. **Dashboard System**: Role-specific dashboards for vendors and admins
5. **Campus Navigation**: Department-wise browsing and location-based features
6. **Responsive Design**: Mobile-friendly interface for campus users

## 🚀 Future Enhancements

- Complete vendor dashboard functionality
- Real-time order tracking across campus
- Department-specific delivery zones
- Student ID verification
- Campus payment integration
- Push notifications for orders
- Vendor approval workflow
- Advanced analytics and reporting

## 📄 License

This project is licensed under the MIT License.
