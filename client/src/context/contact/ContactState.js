/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import { v4 } from "uuid";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Frank Peter",
        email: "frank.peter@gmail.com",
        phone: "098765412",
        type: "personal",
      },
      {
        id: 2,
        name: "Aron Msindai",
        email: "msindai@gmail.com",
        phone: "098765412",
        type: "professional",
      },
      {
        id: 3,
        name: "Ishk Twaha",
        email: "ixhk@gmail.com",
        phone: "098765412",
        type: "personal",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  // ADD CONTACT
  const addContact = (contact) => {
    contact.id = v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // DELETE CONTACT
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  // SET CURRENT CONTACT
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // UPDATE CONTACT
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // FILTER CONTACTS
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // CLEAR FILTERS
  const clearFiltered = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFiltered,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
