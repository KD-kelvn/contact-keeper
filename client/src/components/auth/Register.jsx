/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
        }
        if(error === '!Sorry, User already exists'){
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    });

    const {name, email, password, password_confirm} = user;

    const onChange = (e)=> setUser({...user, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if(name !== '' && email !== '' && password !== '' && password_confirm !== ''){
            if(password !== password_confirm){
                setAlert("Passwords do not match", "danger");
            }else{
                // setUser(user);
                // make post request 
               return register({name, email, password});
                // return response
                // redirect user
                // clear state 
            }
        }
        setAlert("Please enter valid credentials", "danger");
    }

    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email address</label>
                    <input type="text" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input type="text" name="password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Confirm password</label>
                    <input type="text" name="password_confirm" value={password_confirm} onChange={onChange} />
                </div>
                <input type="submit" value="Register" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Register