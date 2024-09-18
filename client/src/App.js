import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { PositionsContext, PositionsProvider } from './context/PositionsContext';
import Login from './pages/Login';
import Main from './pages/Main';
import MyList from './pages/MyList';
import UserPage from './pages/UserPage';
import Post from './pages/Post';
import PlanInfo from './component/plan_info';
import Header from './component/header';
import PlanBanner from './component/banner';
import { LocationProvider } from './context/LocationContext';
import SignUp from './pages/SignUp';

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

const SideBar = () => {
  const [contentId, setContentId] = useState(1);
  const { isAuthenticated, loading, userInfo } = useContext(AuthContext);
  const { positions, setPositions } = useContext(PositionsContext);

  if (loading) {
    return <div className='loading'>Loading...</div>; // 로딩 표시 변경 필요
  }

  return (
    <>
      <PlanInfo setPositions={setPositions} contentId={contentId} />
      <Header isAuthenticated={isAuthenticated} userInfo={userInfo} loading={loading} />
      <PlanBanner positions={positions} setContentId={setContentId} />
    </>
  );
};

function AppContent() {
  const location = useLocation();

  const show = location.pathname !== '/' && location.pathname !== '/sign_up';

  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div className='loading'>Loading...</div>; // 로딩 표시 변경 필요
  }

  return (
    <>
      {show && <SideBar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='/my_plan' element={<ProtectedRoute element={<MyList />} />} />
        <Route path='/profile/:user_id' element={<UserPage />} />
        <Route path='/post/:post_id' element={<Post />} />
        <Route path='/sign_up' element={<SignUp />} />
      </Routes>
    </>
  )

}

function App() {

  return (
    <AuthProvider>
      <PositionsProvider>
        <LocationProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </LocationProvider>
      </PositionsProvider>
    </AuthProvider>
  );
}

export default App;
