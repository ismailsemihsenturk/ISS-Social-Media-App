import './App.css';
import Home from './pages/home/Home.js';
import Login from './pages/login/Login.js';
import Register from './pages/register/Register.js';
import Profile from './pages/profile/Profile.js';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messenger/Messenger.js';
import { loginToken } from "./apiCalls.js"



function App() {

  const { user, dispatch } = useContext(AuthContext)

  // Security aspects need to be improved.
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('token')) !== null) {
      loginToken(dispatch)
    }

  }, [dispatch]);


  return (

    user ?
      (
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Navigate to="/" />} />

            <Route path="/register" element={<Navigate to="/" />} />

            <Route path="/messenger" element={<Messenger />} />

            <Route path="/profile/:username" element={<Profile />} />

          </Routes>
        </BrowserRouter>
      )
      :
      (
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/profile/:username" element={<Profile />} />

          </Routes>
        </BrowserRouter>
      )


  );
}

export default App;
