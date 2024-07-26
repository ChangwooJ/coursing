import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from './pages/Login';
import Main from './pages/Main';
import MyList from './pages/MyList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/main' element={<Main/>} />
        <Route path='/mylist' element={<MyList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
