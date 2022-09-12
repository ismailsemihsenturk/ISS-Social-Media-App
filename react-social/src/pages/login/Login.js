import React, { useContext, useRef } from 'react'
import "../../pages/login/Login.css"
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom'


function Login() {

    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const emailRef = useRef(HTMLInputElement);
    const passwordRef = useRef(HTMLInputElement);

    const handleClick = async (e) => {
        e.preventDefault();
        await loginCall({
            email: emailRef.current.value,
            password: passwordRef.current.value
        }, dispatch)


    }
    // Because we have to click the button the set this event the first time there is no data if you write clg in the func inside you'll get "null" user state. You should call it outside the func. In that way when the comp rendered again it will clg the user state.
    // console.log("user param içi: " + JSON.stringify(user, null, "\t"))


    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className='loginLogo'>ISS Social</h3>
                    <span className="loginDesc">Connect with friends and the world around you on ISS Social</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <form className="loginBox" onSubmit={handleClick}>
                            <input
                                ref={emailRef}
                                placeholder="Email"
                                className="loginInput"
                                type="email"
                                required />

                            <input
                                ref={passwordRef}
                                placeholder="Password"
                                className="loginInput"
                                type="password"
                                minLength={5}
                                required />
                            <button className="loginButton" type='submit' disabled={isFetching}>{isFetching ? "Loading" : "Log In"} </button>
                            <span className="loginForgot">Forgot Password?</span>
                        </form>
                        <Link to="/register" className="loginButton loginRegister" >
                            <button className="loginButton loginRegister" style={{textAlign:"center",width:"100%"}} type='submit' disabled={isFetching}>{isFetching ? "Loading" : "Create a New Account"} </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
