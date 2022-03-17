import React, { useState, useEffect } from "react";

import remoting from '../../services/remoting';
import { loginUser } from '../../services/auth/actions';
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col } from 'antd';


import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faEnvelope,
  faLock,
  faUndo,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
 
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //const history = useHistory();

  useEffect(() => {
    if (authSelector) {
      //history.push('/');
    } else {
    }
  }, [authSelector]);

  const onFinishUserLogin = (values) => {
     dispatch(loginUser(values.username, values.password))
    .then((response) => {
      //console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
      // setShow(true);
      // resetLoginForm();
      // setError("Invalid email and password");
    });
  };

  return (
    <div className="outer-login-container">
       <div>
       <div class="circles"></div>
       <div class="circle1"></div>
       <div class="circle2"></div>
       </div>

        <div className="user-card card card-container login-container ">
          {/* login-form */}
           <Form  onFinish={onFinishUserLogin} className="login-form">
           <p><FontAwesomeIcon icon={faCar} style={{fontSize: 50}}></FontAwesomeIcon> <br/>PARKING LOT</p>
           <p>Login to your account</p>
            <Form.Item className="form-group" name="username" 
              // label="Username"
              rules={[
                { required: true, message: 'Please enter your username' },
                // { type: 'email', message: 'Please enter your username' },
              ]}
            >
              <Input placeholder="your username" />
            </Form.Item>

            <Form.Item className="form-group" name="password" 
            // label="Password" 
            rules={[{ required: true, message: 'Please enter your password' }]}>
              <Input type="password" placeholder="your password" />
            </Form.Item>
            <Row typeof="flex" justify="center">
              <Form.Item className="form-group" name="enter">
                <Button type="primary" htmlType="submit" className="form-submit-btn">
                  Login
                </Button>
              </Form.Item>
            </Row>
          </Form>

         </div>
      </div>
  );
};

export default Login;