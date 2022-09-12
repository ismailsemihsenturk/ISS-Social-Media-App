import './App.css';
import Home from './pages/home/Home.js';
import Login from './pages/login/Login.js';
import Register from './pages/register/Register.js';
import Profile from './pages/profile/Profile.js';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messenger/Messenger.js';



function App() {

  const { user } = useContext(AuthContext)
  // console.log("app user: " + JSON.stringify(user, null, "\t"))
  const [token, setToken] = useState([]);

  useEffect(() => { 
    setToken(JSON.parse(localStorage.getItem("token")));
  }, [])



  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={user ? <Home /> : <Register />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} />

        <Route path="/profile/:username" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
