import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import VendorRegister from './components/VendorRegister';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Orders from './components/Orders';
import VendorDashboard from './components/VendorDashboard';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendor-register" element={<VendorRegister />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:restaurantId" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;