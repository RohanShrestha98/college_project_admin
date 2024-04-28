import { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher, FaLayerGroup } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";

export default function Sidebar() {
  const [active, setActive] = useState(window.location.pathname);
  const navigate = useNavigate();
  const sidebar = [
    {
      id: 1,
      name: "Dashboard",
      icon: <MdDashboard />,
      link: "/",
    },
    {
      id: 2,
      name: "Category",
      icon: <FaLayerGroup />,
      link: "/category",
    },
    {
      id: 3,
      name: "Product",
      icon: <FaStore />,
      link: "/product",
    },
    {
      id: 3,
      name: "Ordered Product",
      icon: <FaCartPlus />,
      link: "/order-product",
    },
  ];

  const handleActive = (item) => {
    setActive(item?.link);
    navigate(`${item?.link}`);
  };

  return (
    <div className="border-r bg-black h-full w-full flex flex-col gap-4 p-4">
      <img src={logo} alt="" className="w-[120px]" />
      <div className="flex flex-col gap-2 mt-6">
        {sidebar?.map((item) => {
          return (
            <div
              key={item?.id}
              onClick={() => handleActive(item)}
              className={`flex font-medium items-center  gap-2 ${
                item?.link === active
                  ? "text-blue-500 cursor-default"
                  : "text-gray-100 cursor-pointer"
              }`}
            >
              <div>{item?.icon}</div>
              <div>{item?.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
