import React from "react";
import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import SearchBox from "../Search/Search";
import { AiOutlineShoppingCart } from "react-icons/ai";

const { Header, Content, Footer } = Layout;

const NavBar: React.FC = () => {
  return (
    <>
      <Layout>
        <Header className="flex items-center">
          <Menu theme="light" mode="horizontal" className="flex-1 min-w-0">
            <Menu.Item key="1">
              <NavLink to="/">Logo</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <SearchBox />
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/product">Latest Product</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/cart">
                <AiOutlineShoppingCart size={25} className="mt-5" />
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/signup">Sign Up</NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="flex-1 px-12 min-h-full">
          <Outlet />
        </Content>
        <Footer className="text-center">All right received @</Footer>
      </Layout>
    </>
  );
};

export default NavBar;
