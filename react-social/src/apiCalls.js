import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {

    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("auth/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("token", JSON.stringify(res.data.acsessToken));
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }

}

export const loginToken = async (dispatch) => {

    dispatch({ type: "LOGIN_START" });
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        const res = await axios.post("auth/jwt", { acsessToken: token });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
}