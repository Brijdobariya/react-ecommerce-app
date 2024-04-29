import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }: any) => {
<<<<<<< Updated upstream

const login=async(formData:any)=>{

  console.log("your data",formData)

const username =formData.username;
const password =formData.password;
console.log(username)




}



  const value = {login};
=======
  const Login: any = (username: any, password: any) => {
    // const username = values.username;
    // const password = values.password;
    console.log("username", username, "password", password);
  };

  const value = { Login };
>>>>>>> Stashed changes

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
