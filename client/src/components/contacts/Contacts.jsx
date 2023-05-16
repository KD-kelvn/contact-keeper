import React, { useContext } from 'react'
import {CSSTransition, TransitionGroup }  from 'react-transition-group'
import ContactContext from '../../context/contact/ContactContext';
import Contact from './Contact'
import FilterContact from './FilterContact';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  if(contacts.length === 0){
    return <h4>Please add a contact !</h4>
  }
  return (
 
    <>
      <FilterContact />
      <TransitionGroup>
        {filtered !== null ? filtered.map((contact) => (
          <CSSTransition timeout={500} classNames='item' key={contact.id}><Contact contact={contact}  /></CSSTransition>
        )) : 
        contacts.map((contact) => (
          <CSSTransition timeout={500} classNames='item' key={contact.id}><Contact contact={contact}  /></CSSTransition>
        ))}
      </TransitionGroup>
   
    </>
  )
}

export default Contacts