import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    
    const store = useSelector(store =>store.login)
   
    const navigate = useNavigate();

     if(store.token.token){
           return children
        }
        else{
            navigate("/login")
        }
}

export default PrivateRoute;