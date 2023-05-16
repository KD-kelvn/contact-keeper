import { useReducer } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS
} from "../types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";


const AuthState = props => {
    const initialState = [
        {
            token: localStorage.getItem("token"), // token is stored in local storage
            isAuthenticated: null, // true when user is logged in
            loading: true, // true when we are making a request and waiting for a response
            user: null, // user data
            error: null // error data
       }
   ];
    
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    // Load User
    const loadUser = async () => {
        if(localStorage.token){
          setAuthToken(localStorage.token);
        }
      try {
        const res = await axios.get("/api/auth");
        dispatch({type: USER_LOADED, payload: res.data.user});
      } catch (error) {
        dispatch({type: AUTH_ERROR});
      }
    };
    
    // Register User
    const register = async formData => {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post("/api/users", formData, config);
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
            loadUser();
        } catch (error) {
            dispatch({type: REGISTER_FAIL, payload: error.response.data.msg});
            // console.error(error.message);
        }
    };
    
    // Login User
    const login = formData => console.log("login");
    
    // Logout
    const logout = () => console.log("logout");
    
    // Clear Errors
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS});
    };
    
    return (
        <AuthContext.Provider
        value={{
            token: state.token, // token is stored in local storage
            isAuthenticated: state.isAuthenticated, // true when user is logged in
            loading: state.loading, // true when we are making a request and waiting for a response
            user: state.user, // user data
            error: state.error, // error data
            loadUser,
            register,
            login,
            logout,
            clearErrors
        }}
        >
           {props.children}
        </AuthContext.Provider>
    );
}
export default AuthState;
