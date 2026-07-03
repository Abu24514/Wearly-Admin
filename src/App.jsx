import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import {Toaster} from 'react-hot-toast'
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "./api/axios";

export const currency = '₹';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("adminToken")
  );

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/admin/logout");
    } finally {
      localStorage.removeItem("adminToken"); 
      setIsAuthenticated(false);
    }
  };

  return (
    <>
    <Toaster/>
      {!isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} /> 
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<List />} />
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default App;