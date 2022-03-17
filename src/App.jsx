import logo from './logo.svg';
import './App.css';
 import './Custom.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'moment/locale/tr';

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import { getAuthorities } from "./services";

import Login from './components/common/login';
import Root from './components/common/root';


function App() {
  const authSelector = useSelector((state) => state.auth);
  const  dispatch = useDispatch();

  useEffect(() => {
    // console.log("App.jsx..");
    
  });

  
  if (authSelector) {
    if (authSelector.user && !authSelector.user.authorities) {
      console.log("dispatch");
      dispatch(getAuthorities());
    }
  }


  return ( 
    <Router>
         <Routes>
          {(authSelector && authSelector.isLoggedIn) ? (
            <Route path="/*" element={<Root/>}></Route>
          ) : (
            <Route path="/*" element={<Login/>}></Route>
          )} 
        </Routes> 
    </Router>
  );
}

export default App;
