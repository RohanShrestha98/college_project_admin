import { useLocation, useNavigate } from "react-router-dom";
import profile from "../assets/profile.svg";
import { FiUpload } from "react-icons/fi";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const loaction = useLocation()
  const navigate = useNavigate()
  const [logout, setLogout] = useState(false)

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const headerName = capitalizeFirstLetter(loaction.pathname?.slice(1)).replace(/[-/]/g, " ")

  const { user } = useAuthStore()
  const handleLogout = () => {
    navigate("/login")
    toast.success("Logout successfull")
  }

  console.log("user", user)

  return (
    <div className="border-b relative  top-0 flex items-center bg-black text-gray-100 justify-between h-14 w-full px-6">
      <h1>{headerName}</h1>
      <div className="flex items-center gap-3">
        <div className="border-r pr-3 ">
          <FiUpload className="border rounded-full p-2" size={36} />
        </div>
        <p className=" font-medium">{capitalizeFirstLetter(user?.username)}</p>
        <img
          onClick={() => setLogout(!logout)}
          src={profile}
          className="w-9 h-9 rounded-full object-cover cursor-pointer"
          alt=""
        />
        {
          logout && <div onClick={() => handleLogout()} className="border cursor-pointer absolute top-12 right-8 shadow-md bg-white hover:bg-gray-100  w-160px text-red-600 px-3 py-1">
            Logout </div>
        }
      </div>
    </div>
  );
}
