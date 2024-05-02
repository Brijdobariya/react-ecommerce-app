import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./Home/Home";
import Layout from "./Layout";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import Search from "./components/Search/Search";
import ProductDetail from "./components/Product/ProductDetail";
import AuthContectProvider from "./context/AuthContext";
import Profile from "./components/Auth/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductAdd from "./components/Product/ProductAdd";
import ProductContextProvider from "./context/ProductContext";

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productd/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<ProductAdd />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<App />} />
      </Route>
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContectProvider>
    <ProductContextProvider>
      <React.StrictMode>{router}</React.StrictMode>
    </ProductContextProvider>
    <ToastContainer />
  </AuthContectProvider>
);
