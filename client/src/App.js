import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Main from './pages/Main';
import MyList from './pages/MyList';
import MyPage from './pages/MyPage';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // 로딩 표시 변경 필요
  }

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
          <Route path='/my_plan' element={<ProtectedRoute element={<MyList />} />} />
          <Route path='/my_page' element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
