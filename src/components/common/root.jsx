import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import { Layout } from 'antd';

import NavigationBar from "./navigationBar";
import Users from '../users/index';
import Members from '../members/index';
import Transactions from '../transactions/index';
import Employees from '../employees/index';
import Dashboard from '../dashboard';


const { Header, Content, Footer } = Layout;
var Root = () => {
  const authSelector = useSelector((state) => state.auth);
  const [permissions, setPermissions] = useState([]);

  const { Sider, Content, Header, Footer } = Layout;

  // useEffect(() => {
  //   if (authSelector.permissions) {
  //     //setPermissions(authSelector.permissions);
  //   }
  // }, [authSelector]);

  //TODO:
  const isAuthorized = () => {

  };

return(
  <Layout className="layout">
  <Header className="bg-dark">
    <NavigationBar />
  </Header>

  <Content style={{ padding: '20px 50px 5px 50px ' }} >
       <div className="site-layout-content">
       <Routes>
            <Route path="/users"  element={<Users/>} />
            <Route path="/members"  element={<Members/>} />
            <Route path="/transactions"  element={<Transactions/>} />
            <Route path="/employees"  element={<Employees/>} />
            <Route path="/*"  element={<Dashboard/>} />
    </Routes>
    </div>
  </Content>
  <Footer style={{ textAlign: 'center' }}>Parking Lot ©2022 </Footer>
</Layout>
);
    }
export default Root;