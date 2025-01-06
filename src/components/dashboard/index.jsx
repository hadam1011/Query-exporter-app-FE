import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import ListDatabaseComponent from '../databases/index.jsx';
import HomeComponent from '../home/index.jsx';
import ListMetricComponent from '../metrics/index.jsx';
import ListQueryComponent from '../queries/index.jsx';
import SideBar from '../layout/SideBar.jsx';
import PrivateRoute from '../../routers/PrivateRoute.jsx';
import ListUserComponent from '../accounts/index.jsx';
import NotAuthorized from '../error403/index.jsx';
import CustomHeader from '../layout/CustomHeader.jsx';

const { Sider, Content, Footer } = Layout;

const DashBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    return (
      <Layout>
        <Layout style={{height: '100vh'}}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <SideBar />
          </Sider>
          <Layout>
            <CustomHeader 
              collapsed={collapsed} 
              setCollapsed={setCollapsed}
              colorBgContainer={colorBgContainer}  
            />
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                overflow: 'auto'
              }}
            >
              <PrivateRoute path="/home" component={HomeComponent} />
              <PrivateRoute path="/user" component={ListUserComponent} />
              <PrivateRoute path="/metrics" component={ListMetricComponent} />
              <PrivateRoute path = "/queries" component = {ListQueryComponent} />
              <PrivateRoute path = "/databases" component = {ListDatabaseComponent}/>
              <PrivateRoute path = "/users" component = {ListUserComponent}/>
              <PrivateRoute path="/not-authorized" component={NotAuthorized} />
            </Content>
            <Footer style={{ textAlign: "center", padding: "0 25px 15px" }}>
              Query-exporter-app v1.8
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
}

export default DashBoard;