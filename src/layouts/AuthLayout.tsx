
import { Outlet } from "react-router-dom";
import login from "../assets/login.jpg";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="w-full h-full">
        <img src={login} className="w-full h-full object-cover " alt="" />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
