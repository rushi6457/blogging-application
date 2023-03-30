import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./authTypes"
import Cookies from "js-cookie";
// Login reducer

const token = JSON.parse(localStorage.getItem("user-info")) || [];
    // console.log(token.token);
const initStateLogin = {
    isAuth:!!token,
    isLoading:false,
    isError:false,
    token:token,
    
}
export const loginReducer = (state = initStateLogin,{type,payload}) =>{

    switch(type){
        case LOGIN_REQUEST:{
            return {
                ...state,
                token:'',
                isAuth:false,
                isLoading:true,
                isError:false
            }
        }
        case LOGIN_SUCCESS:{
            // Cookies.set("token",JSON.stringify(payload),{expires:2})
            localStorage.setItem("user-info",JSON.stringify(payload))
            return{
                ...state,
                isAuth:true,
                isError:false,
                isLoading:false,
                token:payload
            }
        }
        case LOGIN_FAILURE:{
            return {
                ...state,
                isAuth:false,
                isLoading:false,
                isError:true,
                token:''
            }
        }
        case LOGOUT:{
           localStorage.removeItem("user-info")
            return {
                ...state,
                isAuth:false,
                isLoading:false,
                isError:false,
                token:''
            }
        }
        default:{
            return state
        }
    }
}  


// Signup reducer
const initStateSignup = {
    isAuth:false,
    isLoading:false,
    isError:false
}
export const signupReducer = (state = initStateSignup,{type,payload}) =>{

    switch(type){
        case SIGNUP_REQUEST:{
            return {
                ...state,
                isAuth:false,
                isLoading:true,
                isError:false
            }
        }
        case SIGNUP_SUCCESS:{
            return{
                ...state,
                isAuth:payload,
                isError:false,
                isLoading:false
            }
        }
        case SIGNUP_FAILURE:{
            return {
                ...state,
                isAuth:false,
                isLoading:false,
                isError:true
            }
        }
        default:{
            return state
        }
    }
}  