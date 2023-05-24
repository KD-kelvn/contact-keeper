/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import AuthContext from '../../context/auth/authContext';
const Home = () => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser, loading } = authContext;
  const navigate = useNavigate();
 useEffect(()=>{
  loadUser();
  if(!isAuthenticated){
    navigate('/login');
  }

 },[isAuthenticated])
  return (
    <div className='grid-2'>
        <div>
          <ContactForm/>
        </div>
        <div>
          <Contacts/>
        </div>

    </div>
  )
}

export default Home