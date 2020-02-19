import React from 'react';
import { Layout } from 'antd';
import { SideBar } from './SideBar';

export const AppLayout = ({ children }) => {
  const { Header, Content } = Layout;
  return (
    <div className="calendar__layout">
      <Layout>
        <SideBar />
        <Layout>
          <Header>
            App Header
          </Header>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
};