/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contact/ContactContext';
import Contact from './Contact'
import FilterContact from './FilterContact';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
  }, []);
  // if ( contacts === null) {
  //   return <h4>Please add a contact !</h4>
  // }
  return (

    <>
    <FilterContact />
      {contacts === null ? <h4>Loading...</h4> : (<> 
      <TransitionGroup>
        {filtered !== null ? filtered.map(contact => (
          <CSSTransition key={contact._id} timeout={500} classNames='item'>
            <Contact contact={contact} />
          </CSSTransition>
        )) : contacts.map(contact => (
          <CSSTransition key={contact._id} timeout={500} classNames='item'>
            <Contact contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      
       </>)}
    </>
  )
}

export default Contacts