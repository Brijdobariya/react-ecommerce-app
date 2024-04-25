import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SearchBox from "../Search/Search";

const { Header, Content, Footer } = Layout;

const NavBar: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <Layout>
        <Header>
          <Menu theme="light" mode="horizontal">
            <Menu.Item key="1" style={{ marginRight: "auto" }}>
              <NavLink to="/">Logo</NavLink>
            </Menu.Item>

            <Menu.Item key="2" style={{ margin: "auto" }}>
              <SearchBox />
            </Menu.Item>

            <Menu.Item key="3" style={{ marginLeft: "auto" }}>
              <NavLink to="/product">Latest Product</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/signup">Sign Up</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/cart" className="flex" onClick={handleClick}>
                <AiOutlineShoppingCart size={25} className="mt-5" />
                {count}
              </NavLink>
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
