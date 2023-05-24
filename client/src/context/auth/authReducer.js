/* eslint-disable import/no-anonymous-default-export */
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
export default (state, action)=>{
   switch(action.type){
    case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        };
    case AUTH_ERROR:
        // localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: true,
            user: null,
            error: action.payload
        };
    case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false
        };
    case LOGIN_SUCCESS:
        // console.log(action.payload.token);
        localStorage.setItem('token', action.payload.token);
        console.log(localStorage.getItem('token'));
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false
        };
    case REGISTER_FAIL:
        localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: true,
            user: null,
            error: action.payload
        };
    case LOGIN_FAIL:
        localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: true,
            user: null,
            error: action.payload
        };
    case LOGOUT:
        localStorage.removeItem('token');
        return{
            ...state,
            token: null,
            isAuthenticated: false,
            loading: true,
            user: null,
            error: action.payload
        };
    case CLEAR_ERRORS:
        return {
            ...state,
            error: null
        }
    default:
        return state;
   }
}