/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useContext} from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {  isAuthenticated, loadUser } = authContext;
  useEffect(()=>{
    loadUser();
  }, []);
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