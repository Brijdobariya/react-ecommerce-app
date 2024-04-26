import { createContext, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }: any) => {
  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
