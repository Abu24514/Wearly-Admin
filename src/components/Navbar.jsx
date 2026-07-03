import { GoDotFill } from "react-icons/go";
import { PiCrownSimple } from "react-icons/pi";
import axiosInstance from "../api/axios";

const Navbar = ({ onLogout }) => {

  return (
    <nav className="h-18 bg-white border-b border-neutral-200 px-4 sm:px-8 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-3">

        <div className="font-display text-2xl font-semibold tracking-tight text-gray-900 relative inline-flex items-end gap-0.5">
          Wearly
          <span className='mb-1'>
            <GoDotFill size={8} className='text-red-500' />
          </span>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-500">
          <GoDotFill className="text-green-500" />
          Online
        </div>

        <button
         onClick={onLogout} className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors">
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;