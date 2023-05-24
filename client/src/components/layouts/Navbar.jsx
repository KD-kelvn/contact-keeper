/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom';
import ContactContext from '../../context/contact/ContactContext';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon}) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;
  
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    clearContacts();
    navigate('/login');
  }
  const authLinks = (
    <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>{' '}
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!"> 
        <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
     <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </>
  )
  return (
    <div className='navbar  bg-primary'>
        <h1>
          <Link to='/'>
            <i className={icon}></i>{title}
          </Link>
        </h1>

        <ul>
         {isAuthenticated ? authLinks : guestLinks}
        </ul>
    </div>
  )
}

export default Navbar

Navbar.propTypes = {
   title: PropTypes.string.isRequired,
   icon: PropTypes.string
}

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
}