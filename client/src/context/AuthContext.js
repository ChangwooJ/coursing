import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //로그인 상태
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/status', { withCredentials: true });
        setIsAuthenticated(response.data.isAuthenticated);
        setUserInfo(response.data.user_info, response.data.user);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
