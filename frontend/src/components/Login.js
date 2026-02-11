import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { setUserSession } from '../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    try {
      const response = await authAPI.login(formData);
      
      // Check if login was successful
      if (response.data.success) {
        // Store user data using utility function
        const userData = response.data.data;
        console.log('Login successful, storing user data:', userData);
        setUserSession(userData);
        
        setSuccess('Login successful! Redirecting...');
        
        // Redirect based on user role after a short delay
        setTimeout(() => {
          if (userData.role === 'VENDOR') {
            navigate('/vendor-dashboard');
          } else if (userData.role === 'ADMIN') {
            navigate('/admin-dashboard');
          } else if (userData.role === 'CUSTOMER') {
            navigate('/customer-dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <div className="login-icon">🎓</div>
          <h2>Login to Campus Eats</h2>
          <p>Welcome back to your campus food delivery</p>
        </div>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
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

        <button type="submit" className="btn login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-link">
          <p>Don't have an account? <Link to="/register">Register as Student</Link></p>
          <p>Want to sell food? <Link to="/vendor-register">Register as Vendor</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;