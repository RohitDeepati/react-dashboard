import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./sidemenu.css";

export const SideMenu = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  return (
    <div className="SideMenu" style={{ background: "darkblue" }}>
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
      >
        <Menu.Item key="/" icon={<AppstoreOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="/inventory" icon={<ShopOutlined />}>
          Inventory
        </Menu.Item>
        <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
          Orders
        </Menu.Item>
        <Menu.Item key="/customers" icon={<UserOutlined />}>
          Customers
        </Menu.Item>
      </Menu>
    </div>
  );
};
