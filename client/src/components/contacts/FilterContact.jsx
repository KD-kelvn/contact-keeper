import React,{useRef, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext';

const FilterContact = () => {
    useEffect(()=> {
        if(filtered === null){
            text.current.value = '';
        }
    });
    const text = useRef('');
    const contactContext = useContext(ContactContext);
    const { filtered, clearFiltered, filterContacts} = contactContext;
    const onChange = e => {
        if(text.current.value !== ''){
            filterContacts(e.target.value);
        }else{
            clearFiltered();
        }
    }
  return (
    <form>
        <input ref={text} type="text" placeholder='filter contacts ....' onChange={onChange}/>
    </form>
  )
}

export default FilterContact