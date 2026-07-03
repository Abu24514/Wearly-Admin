import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { PiCrown } from "react-icons/pi";

const Sidebar = () => {
  const links = [
    {
      name: "Add Product",
      path: "/add",
      icon: <IoIosAddCircleOutline size={22} />,
    },
    {
      name: "Products",
      path: "/list",
      icon: <FaRegListAlt size={18} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <BsBagCheck size={18} />,
    },
  ];

  return (
    <aside className="w-16 md:w-72 min-h-[calc(100vh-72px)] bg-white border-r border-neutral-200 flex flex-col">
      {/* Navigation */}
      <div className="flex-1 p-3 space-y-2">

        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200
              
              ${
                isActive
                  ? "bg-black text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`
            }
          >
            {item.icon}

            <span className="hidden md:block font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}

      </div>

      {/* Bottom Card */}
      <div className="hidden md:block p-4">
        <div className="rounded-3xl border border-neutral-200 p-5 bg-neutral-50">

          <h3 className="font-medium">
            Wearly Admin
          </h3>

          <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
            Manage products, orders and inventory from one place.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Store Active
          </div>

        </div>
      </div>

    </aside>
  );
};

export default Sidebar;