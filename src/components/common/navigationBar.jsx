import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { logoutUser } from "../../services";
import menuItems from "./menu-items";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
   const [permissions, setPermissions] = useState([]);
   const auth = useSelector((state) => state.auth);
   const dispatch = useDispatch();

  // const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (auth.user.authorities) {
      setPermissions( auth.user.authorities.map((a) => a.authority ) );
    }
  }, [auth]);

  const hasPermission = (perm) => {
    if (perm === 'ALLOW_ALL') return true;
    return permissions ? permissions.find((item) => item === perm) !== undefined : false;
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const userLinks = (
    <>
      <Nav className="mr-auto">

      { (permissions.length) > 0
      
      ? (menuItems.filter((item) => hasPermission(item.permission))
              .map((item) =>
              <Link to={item.route} key={item.key} className="nav-link">
              <span>{item.title}</span>
              </Link>))
             :<></> }
      </Nav>



      <Nav className="navbar-right">
        <Link to={"profile"} className="nav-link" style={{color:"red"}}>
          {((auth && auth.user) ? "["+auth.user.username+"]" :"") }
        </Link>
      </Nav>
      <Nav className="navbar-right">
        <Link to={"logout"} className="nav-link" onClick={logout} style={{color:"red"}}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand" style={{ borderWidth:2, borderStyle:"solid", width: 70, textAlign: "center" }}>
        <FontAwesomeIcon icon={faCar} />
      </Link>
      {userLinks}
    </Navbar>
  );
};

export default NavigationBar;