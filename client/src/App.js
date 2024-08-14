import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Main from './pages/Main';
import MyList from './pages/MyList';
import Header from './component/header';

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

const HeaderState = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return null; // 로딩 중에는 헤더 랜더링 x
  }

  return <Header isAuthenticated={isAuthenticated} />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderState />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
          <Route path='/my_plan' element={<ProtectedRoute element={<MyList />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
