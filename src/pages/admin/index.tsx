import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  CloseOutlined,
  ShopOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const links = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Users</Link>,
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: <Link to="/admin/products">Products</Link>,
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/categories">Categories</Link>,
    },
    {
      key: "4",
      icon: <CloseOutlined />,
      label: (
        <Link to="/" className="text-white" type="text">
          Log out
        </Link>
      ),
    },
  ];

  const location = useLocation();

  const selectedLink = links.find(
    (link) => link.label.props.to === location.pathname
  );
  return (
    <div>
      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            className={`p-5 text-white flex ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            <HomeOutlined className="text-2xl" />
            {collapsed ? "" : <h1 className="text-xl font-bold">Nicolas </h1>}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedLink?.key ? selectedLink.key : "1"]}
            items={links}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <div>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
