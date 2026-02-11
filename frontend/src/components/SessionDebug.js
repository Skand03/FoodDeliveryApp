import { useState, useEffect } from 'react';
import { getUserSession, setUserSession, clearUserSession } from '../utils/auth';

const SessionDebug = () => {
  const [sessionData, setSessionData] = useState(null);
  const [mockCart, setMockCart] = useState([]);
  const [mockOrders, setMockOrders] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const session = getUserSession();
    setSessionData(session);
    
    const cart = JSON.parse(localStorage.getItem('mockCart') || '[]');
    setMockCart(cart);
    
    const orders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    setMockOrders(orders);
  };

  const testSetSession = () => {
    const testUser = {
      id: 999,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      role: 'CUSTOMER',
      address: '123 Test Street'
    };
    setUserSession(testUser);
    refreshData();
  };

  const clearSession = () => {
    clearUserSession();
    refreshData();
  };

  const clearMockData = () => {
    localStorage.removeItem('mockCart');
    localStorage.removeItem('mockOrders');
    refreshData();
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h3>🔧 Session & Storage Debug Panel</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Session Data:</h4>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {sessionData ? JSON.stringify(sessionData, null, 2) : 'No session data'}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Mock Cart ({mockCart.length} items):</h4>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', maxHeight: '200px', overflow: 'auto' }}>
          {mockCart.length > 0 ? JSON.stringify(mockCart, null, 2) : 'No cart items'}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Mock Orders ({mockOrders.length} orders):</h4>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', maxHeight: '200px', overflow: 'auto' }}>
          {mockOrders.length > 0 ? JSON.stringify(mockOrders, null, 2) : 'No orders'}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={testSetSession} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Set Test Session
        </button>
        <button onClick={clearSession} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Clear Session
        </button>
        <button onClick={clearMockData} style={{ padding: '8px 16px', background: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}>
          Clear Mock Data
        </button>
        <button onClick={refreshData} style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SessionDebug;