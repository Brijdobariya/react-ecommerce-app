import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SearchBox from "../Search/Search";
import { useAuth } from "../../context/AuthContext";

const { Header, Content, Footer } = Layout;

const NavBar: React.FC = () => {
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    setInterval(() => {
      localStorage.getItem("token");
      if (!!localStorage.getItem("token")) {
        setLoggedIn(!loggedIn);
      }
    }, 1000);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.href = "/";
  }, []);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <>
      <Layout>
        <Header className="w-full">
          <Menu theme="dark" mode="horizontal" className="w-full">
            <Menu.Item key="1" style={{ marginRight: "auto" }}>
              <NavLink to="/">Logo</NavLink>
            </Menu.Item>
            <Menu.Item key="2" style={{ margin: "auto" }}>
              <SearchBox />
            </Menu.Item>
            <Menu.Item key="3" style={{ marginLeft: "auto" }}>
              <NavLink to="/product">Latest Product</NavLink>
            </Menu.Item>
            {!loggedIn ? (
              <>
                <Menu.Item key="4">
                  <NavLink to="/login">Login</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                  <NavLink to="/signup">Sign Up</NavLink>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="7">
                  <NavLink to="/profile">{user.username}</NavLink>
                </Menu.Item>
                <Menu.Item key="8">
                  <NavLink to="" onClick={handleLogout}>
                    Log out
                  </NavLink>
                </Menu.Item>
              </>
            )}
            <Menu.Item key="6">
              <NavLink to="/cart" className="flex" onClick={handleClick}>
                <AiOutlineShoppingCart size={25} className="mt-5" />
                {count}
              </NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="flex-1 md:px-12 p-5 min-h-full">
          <Outlet />
        </Content>
        <Footer className="text-center">All right received @</Footer>
      </Layout>
    </>
  );
};

export default NavBar;
