import React from 'react';
import { withRouter } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import { sidebarOptions } from './sideBarOptions';

const { Sider } = Layout;
const { Item } = Menu;

const SideBar = ({ history }) => {

  const renderMenuItems = () => sidebarOptions.map(({ key, link, iconType }) => (
    <Item key={key} onClick={() => history.push(link)}>
      <Icon type={iconType} />
      <span>{key}</span>
    </Item>
  ));

  return (
    <Sider>
      <div className="calendar__sidebar-header d-flex align-items-center">impekable</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['Calendar']}>
        {renderMenuItems()}
      </Menu>
    </Sider>
  )
};

const withRouterSideBar = withRouter(SideBar);

export { withRouterSideBar as SideBar };