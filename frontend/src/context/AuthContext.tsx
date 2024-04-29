import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }: any) => {
  const Login = ({ username, password }: any) => {
    console.log("usrname", username, "password", password);
  };

  const Signup = ({ userame, password, phone, enail }: any) => {
    console.log(userame, password, phone, enail);
  };

  const value = {
    Login,
    Signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
