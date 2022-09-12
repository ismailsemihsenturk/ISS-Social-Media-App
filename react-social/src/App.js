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
  const [token, setToken] = useState([]);


  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"))
    setToken(currentToken);
    console.log("token set")

    if (localStorage.getItem("token") !== null) {
      loginToken(dispatch)
    }
    else {
      console.log("undefined")
    }
  }, [dispatch])




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
