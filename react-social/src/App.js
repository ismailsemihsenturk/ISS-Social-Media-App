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
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"))
    setToken(currentToken);
    console.log("token set")

    if (localStorage.getItem("token") !== null) {
      loginToken(dispatch)
      setIsLoggedIn(true)
    }
    else {
      console.log("undefined")
    }
  }, [dispatch])

  console.log(isLoggedIn)
  console.log("object: " + isLoggedIn ? "aaa" : "bbb")


  return (

    isLoggedIn ?
      (
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Home />} />

            <Route path="/register" element={<Home />} />

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
