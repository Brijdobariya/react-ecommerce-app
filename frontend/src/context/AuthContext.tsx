import React, { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }: any) => {
  const Login = ({ username, password }: any) => {
    console.log("usrname", username, "password", password);
  };

  const Signup = (values: any) => {
    axios
      .post("http://localhost:3000/api/register", values)
      .then((res) => res.status(201).json("sucess"))
      .catch((err) => console.log(err));
    // console.log(userame, password, phone, enail);
  };

  const value = {
    Login,
    Signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
