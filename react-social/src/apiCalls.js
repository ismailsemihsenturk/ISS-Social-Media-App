import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {

    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data));
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }

}

export const loginToken = (dispatch) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(localStorage.getItem("token")) });

}