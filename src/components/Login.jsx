import React, { useState } from "react";
import axiosInstance from "../api/axios";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token); // ✅ save karo
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center min-h-screen items-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-semibold ,mb-4 text-center">Admin Panel</h1>
        <form
          onSubmit={onSubmitHandler}
          className="mt-4">
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full border border-gray-300 outline-none   px-3 py-2" type="email" placeholder="your@email.com" required />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full border border-gray-300 outline-none px-3 py-2" type="password" placeholder="Enter your password" required />
          </div>
          <button
            className="mt-2 rounded-md bg-black text-white py-2 px-4  w-full active:scale-93"
            type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
