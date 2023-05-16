/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { login, error, clearErrors, isAuthenticated, token } = authContext;

    useEffect(()=>{
        if(isAuthenticated && token !== null){
            navigate('/');
        }
        if(error === 'Invalid credentials'){
            setAlert(error, 'danger');
            clearErrors();
        }
        if(error === 'Please enter a valid Email'){
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, navigate]);
    const { setAlert } = alertContext;
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password} = user;

    const onChange = (e)=> setUser({...user, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if( email === '' && password === '' ){
           return setAlert("Please enter valid credentials", "danger");
        } 
        // make post request 
        login({email,password});
        // return response
        // redirect user
        // navigate('/');
        // clear state
        
    }

  
    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Email address</label>
                    <input type="text" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="text" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Login