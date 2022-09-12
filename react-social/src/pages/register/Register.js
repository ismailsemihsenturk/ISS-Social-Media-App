import axios from 'axios';
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../pages/register/Register.css"

function Register() {


    const emailRef = useRef(HTMLInputElement);
    const firstRef = useRef(HTMLInputElement);
    const lastRef = useRef(HTMLInputElement);
    const usernameRef = useRef(HTMLInputElement);
    const passwordRef = useRef(HTMLInputElement);
    const passwordAgainRef = useRef(HTMLInputElement);

    let navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordAgainRef.current.value) {
            passwordRef.current.setCustomValidity("Passwords don't match!");
        } else {
            const userRegister = {
                username: usernameRef.current.value,
                firstname: firstRef.current.value,
                lastname: lastRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
            try {
                await axios.post("/auth/register", userRegister);
                navigate("/login");

            } catch (error) {
                console.log(error)
            }

        }
    }


    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className='registerLogo'>ISS Social</h3>
                    <span className="registerDesc">Connect with friends and the world around you on ISS Social</span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <form onSubmit={handleClick} className="loginBox">
                            <input ref={firstRef} placeholder="First Name" className="registerInput" required />
                            <input ref={lastRef} placeholder="Last Name" className="registerInput" required />
                            <input ref={emailRef} placeholder="Email" className="registerInput" type={"email"} required />
                            <input ref={usernameRef} placeholder="Username" className="registerInput" required />
                            <input ref={passwordRef} placeholder="Password" className="registerInput" type={"password"} required minLength={5} />
                            <input ref={passwordAgainRef} placeholder="Password Again" className="registerInput" type={"password"} required minLength={5} />
                            <button type='submit' className="registerButton"> Sign Up </button>
                            <span className="registerForgot">Forgot Password?</span>
                        </form>
                        <Link to="/login" className='registerRegister' style={{ textAlign: "center" }}>
                            <button className="registerRegister">Log into Account</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
