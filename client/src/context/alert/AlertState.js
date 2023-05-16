import { useReducer } from "react";
import {v4} from "uuid";
import {
    REMOVE_ALERT,
    SET_ALERT
} from "../types";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";


const AlertState = props => {
    const initialState = [];
    
    const [state, dispatch] = useReducer(alertReducer, initialState);
    
// set alerts
const setAlert=(msg, type, timeout=5000)=>{
   const id = v4();
   dispatch({type: SET_ALERT, payload:{id, type, msg}});
   setTimeout(()=>dispatch({type: REMOVE_ALERT, payload:id}), timeout);
}
// remove alert 
    return (
        <AlertContext.Provider
        value={{
            alerts: state, 
            setAlert
        
        }}
        >
           {props.children}
        </AlertContext.Provider>
    );
}
export default AlertState;
