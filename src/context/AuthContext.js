import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');

    if (token && userEmail) {
      setUser({
        email: userEmail,
        type: userType || 'user',
        id: userId ? parseInt(userId) : null,
      });
    }
    setLoading(false);
  }, []);

  const login = (email, token, userType = 'user', userId = null) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userType', userType);
    if (userId) {
      localStorage.setItem('userId', userId.toString());
    }
    setUser({
      email,
      type: userType,
      id: userId,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    setUser(null);
  };

  const isAdmin = () => {
    return user?.email?.endsWith('@admin.com') || user?.type === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

