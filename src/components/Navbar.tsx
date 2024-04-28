import profile from "../assets/profile.svg"
import { FiUpload } from "react-icons/fi";

export default function Navbar() {
    return (
        <div className="border-b sticky top-0 flex items-center bg-black text-gray-100 justify-between h-14 w-full px-6">
            <h1>User</h1>
            <div className="flex items-center gap-3">
                <div className="border-r pr-3 ">
                    <FiUpload className="border rounded-full p-2" size={36} />
                </div>
                <p className=" font-medium">
                    Rohan
                </p>
                <img src={profile} className="w-9 h-9 rounded-full object-cover" alt="" />
            </div>
        </div>
    )
}
