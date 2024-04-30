import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useAuth();

  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
    }
  }, []);
  return (
    <div className="h-full w-full text-3xl font-bold">
      <h1>
        <strong>Username : </strong>
        {user.username}
      </h1>
      <h1>
        <strong>Email : </strong>
        {user.email}
      </h1>
      <h1>
        <strong>Mobile no. : </strong>
        {user.phone}
      </h1>
    </div>
  );
};

export default Profile;
