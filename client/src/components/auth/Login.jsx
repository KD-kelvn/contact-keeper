import React, { useState, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password} = user;

    const onChange = (e)=> setUser({...user, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        if( email !== '' && password !== '' ){
            // make post request 
            // return response
            // redirect user
            // clear state
            setAlert("Login successful", "success");
        }
        setAlert("Please enter valid credentials", "danger");
        
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