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
        let token = localStorage.getItem('token');
        if(token !== null){
          console.log('TRUE')
          setAuthToken(localStorage.getItem('token'));
        }
      try {
        const res = await axios.get("/api/auth");
        dispatch({type: USER_LOADED, payload: res.data.user});
        console.log(true);
      } catch (err) {
        dispatch({type: AUTH_ERROR, payload:err.response.data.msg});
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
    const login = async formData => {
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post("/api/auth", formData, config);
            dispatch({type: LOGIN_SUCCESS, payload: res.data});
            loadUser();
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({type: LOGIN_FAIL, payload: error.response.data.msg});
            // console.error(error.message);
        }
    }
    // Logout
    const logout = () => dispatch({type: LOGOUT});
    
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
