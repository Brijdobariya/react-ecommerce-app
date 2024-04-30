import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }: any) => {
  const [data, setData] = useState<Object[]>([]);
  const [user, setUser] = useState<object | null>(null);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/data");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Login = (values: any) => {
    const loginData = data.find(
      (item: any) =>
        item.email === values.email && item.password === values.password
    );
    console.log(loginData);
    if (loginData) {
      localStorage.setItem("token", loginData.token);
      setUser(loginData);
      toast.success("Login successful...");
    } else {
      toast.error("Invalid username and password");
    }
  };

  const Signup = (values: any) => {
    axios
      .post("http://localhost:3000/api/register", values)
      .then((res) => {
        if (res.status === 201) {
          console.log("Registration successful");
          fetchData(); // Call fetchData() after successful registration
        } else {
          console.error("Registration failed");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const filteredUser = data.find((item: any) => item.token === storedToken);
      setUser(filteredUser);
    }
  }, [data]);

  console.log(user);

  const value = { Login, Signup, data, user, fetchData };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
