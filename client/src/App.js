import { Routes, Route } from "react-router-dom";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

if(localStorage.token){
  setAuthToken(localStorage.token);
}
function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
        <>
          <Navbar />
          <div className="container">
            <Alert/>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
