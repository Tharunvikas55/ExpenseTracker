import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import SetAvatar from './Pages/Avatar/setAvatar';
import HomePage from './Pages/Home/HomePage';
const App = () => {
  return (  
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/homepage' element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}
export default App