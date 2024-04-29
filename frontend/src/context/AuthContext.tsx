import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }: any) => {

const login=async(formData:any)=>{

  console.log("your data",formData)

const username =formData.username;
const password =formData.password;
console.log(username)




}



  const value = {login};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
