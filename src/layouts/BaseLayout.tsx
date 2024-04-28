import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function BaseLayout() {
    return (
        <div className="flex">
            <div className="w-1/6 h-screen overflow-hidden sticky top-0">
                <Sidebar />
            </div>
            <div className="w-5/6 bg-[#edeeee]">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}
