import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/main' element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
