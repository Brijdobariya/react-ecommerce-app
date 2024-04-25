import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import Layout from "./Layout";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import Search from "./components/Search/Search";

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<App />} />
      </Route>
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{router}</React.StrictMode>
);
