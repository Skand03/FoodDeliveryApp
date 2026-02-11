import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { setUserSession } from '../utils/auth';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    businessName: '',
    businessType: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const businessTypes = [
    'Canteen',
    'Food Stall',
    'Coffee Shop',
    'Restaurant',
    'Snack Bar',
    'Juice Center',
    'Bakery',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Include business fields for vendor registration
      const { confirmPassword, ...registrationData } = formData;
      
      // Map businessType to businessLicense for backend compatibility
      registrationData.businessLicense = formData.businessType || 'GENERAL';
      
      console.log('Sending vendor registration data:', registrationData);
      
      // Use the vendor registration endpoint (automatically sets VENDOR role)
      const response = await authAPI.registerVendor(registrationData);
      
      console.log('Vendor registration response:', response);
      
      // Check if registration was successful
      if (response.data.success) {
        // Store user data using utility function
        const userData = response.data.data;
        console.log('Vendor registration successful, storing user data:', userData);
        setUserSession(userData);
        
        // Verify the role was set correctly
        if (userData.role !== 'VENDOR') {
          console.error('Role mismatch! Expected VENDOR, got:', userData.role);
          setError('Registration failed: Role not set correctly');
          return;
        }
        
        setSuccess('Vendor registration successful! Welcome to Campus Eats!');
        
        // Redirect to vendor dashboard after a short delay
        setTimeout(() => {
          navigate('/vendor-dashboard');
        }, 1500);
      } else {
        console.error('Registration failed:', response.data);
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(`Registration failed: ${error.message}`);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container vendor-register-container">
      <form className="auth-form vendor-form" onSubmit={handleSubmit}>
        <div className="vendor-header">
          <div className="vendor-icon">🏪</div>
          <h2>Join as Campus Vendor</h2>
          <p>Start selling your delicious food to students and faculty</p>
        </div>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            placeholder="Enter your business name"
          />
        </div>

        <div className="form-group">
          <div className="form-group">
            <label htmlFor="businessType">Business Type</label>
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
            >
              <option value="">Select business type</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Business Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your business address"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <button type="submit" className="btn vendor-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Vendor Account'}
        </button>

        <div className="auth-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
          <p>Want to order food? <Link to="/register">Register as Customer</Link></p>
        </div>
      </form>
    </div>
  );
};

export default VendorRegister;