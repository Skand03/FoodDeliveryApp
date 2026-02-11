import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'ADMIN') {
          navigate('/');
          return;
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content">
            <div className="stats-grid admin-stats">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Users</h3>
                  <p className="stat-number">1,245</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏪</div>
                <div className="stat-info">
                  <h3>Active Vendors</h3>
                  <p className="stat-number">28</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>Total Orders</h3>
                  <p className="stat-number">5,678</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>Platform Revenue</h3>
                  <p className="stat-number">₹1,23,450</p>
                </div>
              </div>
            </div>
            
            <div className="admin-overview">
              <div className="overview-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">🏪</span>
                    <div className="activity-info">
                      <p>New vendor "CS Canteen" registered</p>
                      <small>2 hours ago</small>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">👤</span>
                    <div className="activity-info">
                      <p>25 new students registered today</p>
                      <small>4 hours ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>User Management</h3>
              <div className="filter-buttons">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Students</button>
                <button className="filter-btn">Vendors</button>
                <button className="filter-btn">Faculty</button>
              </div>
            </div>
            <div className="coming-soon">
              <h3>User Management Coming Soon</h3>
              <p>You'll be able to view and manage all users here.</p>
            </div>
          </div>
        );
      
      case 'vendors':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>Vendor Management</h3>
              <button className="btn btn-primary">Approve Pending</button>
            </div>
            <div className="coming-soon">
              <h3>Vendor Management Coming Soon</h3>
              <p>You'll be able to approve, manage, and monitor vendors here.</p>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="tab-content">
            <h3>Platform Analytics</h3>
            <div className="coming-soon">
              <h3>Analytics Coming Soon</h3>
              <p>You'll be able to view comprehensive platform analytics here.</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user.firstName}! Manage the Campus Eats platform.</p>
          </div>
          <div className="admin-info">
            <div className="admin-avatar">👨‍💼</div>
            <div className="admin-details">
              <h3>{user.firstName} {user.lastName}</h3>
              <p>Platform Administrator</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <nav className="dashboard-nav">
              <button 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="nav-icon">📊</span>
                Overview
              </button>
              <button 
                className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <span className="nav-icon">👥</span>
                Users
              </button>
              <button 
                className={`nav-item ${activeTab === 'vendors' ? 'active' : ''}`}
                onClick={() => setActiveTab('vendors')}
              >
                <span className="nav-icon">🏪</span>
                Vendors
              </button>
              <button 
                className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <span className="nav-icon">📈</span>
                Analytics
              </button>
            </nav>
          </div>

          <div className="dashboard-main">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;