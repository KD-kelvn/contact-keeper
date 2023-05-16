import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon}) => {
  return (
    <div className='navbar  bg-primary'>
        <h1>
          <Link to='/'>
            <i className={icon}></i>{title}
          </Link>
        </h1>

        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
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