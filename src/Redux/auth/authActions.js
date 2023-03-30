import axios from 'axios'
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from './authTypes';


// signup actions
export const signup = (creds) => async(dispatch) =>{
    dispatch({type:SIGNUP_REQUEST})
    try {
        let res = await axios.post(`https://blog-app-5323.onrender.com/user/signup`,creds)
        console.log(res.data);
        dispatch({type:SIGNUP_SUCCESS,payload:res.data})
    } catch (error) {
        dispatch({type:SIGNUP_FAILURE})
    }
}
//login actions
export const login = (creds) => async(dispatch) =>{
    dispatch({type:LOGIN_REQUEST})
    try {
        let res = await axios.post(`https://blog-app-5323.onrender.com/user/login`,creds)
        console.log(res.data);
        dispatch({type:LOGIN_SUCCESS,payload:res.data})
    } catch (error) {
        dispatch({type:LOGIN_FAILURE})
    }
}

//Logout
export const logout = () => ({type:LOGOUT})