// Authentication utility functions
export const AUTH_STORAGE_KEY = 'user';

export const setUserSession = (userData) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    console.log('User session stored:', userData);
  } catch (error) {
    console.error('Error storing user session:', error);
  }
};

export const getUserSession = () => {
  try {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log('User session retrieved:', parsedUser);
      return parsedUser;
    }
  } catch (error) {
    console.error('Error retrieving user session:', error);
    clearUserSession();
  }
  return null;
};

export const clearUserSession = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    console.log('User session cleared');
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};

export const isUserLoggedIn = () => {
  return getUserSession() !== null;
};

export const getUserRole = () => {
  const user = getUserSession();
  return user?.role || null;
};

export const getUserId = () => {
  const user = getUserSession();
  return user?.id || null;
};

export const refreshUserSession = async () => {
  // This function can be used to refresh user data from the server
  // For now, it just returns the current session
  return getUserSession();
};