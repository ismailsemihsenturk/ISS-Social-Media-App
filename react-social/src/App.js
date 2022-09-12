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
import { loginToken } from "./apiCalls.js"



function App() {

  const { user, dispatch } = useContext(AuthContext)
  const [token, setToken] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"))
    setToken(currentToken);
    setRefresh(true);
    console.log("token set")
  }, [])


  if (refresh) {
    if (localStorage.getItem("token") !== null) {
      loginToken(JSON.stringify(token), dispatch)
      console.log("user: " + JSON.stringify(user))
    }
    else {
      console.log("undefined")
    }
    setRefresh(!refresh)
  }




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
