import axios from "axios";
import React, { createContext, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }: any) => {
  const [data, setData] = useState<object>();
  // useEffect (()=>{
  //   fach()
  // },[])
  const fach = async () => {
    await axios
      .get("http://localhost:3000/api/data")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  useMemo(() => fach(), []);

  const Login = (values: any) => {
    const logindata = data.filter(
      (item: any) =>
        item.email === values.email && item.password === values.password
    );
    console.log(logindata);
    if (logindata.length > 0) {
      // console.log("login sucess")
      toast.success("login sucessfull...");
    } else {
      // console.log("login failed")
      toast.error("invaild username and password...");
    }
  };

  const Signup = (values: any) => {
    axios
      .post("http://localhost:3000/api/register", values)
      .then(
        (res) => res.status(201).json("sucess"),
        setInterval(() => {
          fach();
        }, 5000)
      )
      .catch((err) => console.log(err));

    // console.log(userame, password, phone, enail);
  };

  const value = {
    Login,
    Signup,
    data,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
