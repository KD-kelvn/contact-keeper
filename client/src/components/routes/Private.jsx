import React, { useContext} from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';

const Private = () => {
  const authContext = useContext(AuthContext);
  const {isAuthenticated, loading,token} = authContext;

    return (
      isAuthenticated === true ? <Outlet/> : <Navigate to='/login' replace/>
    )
}

export default Private