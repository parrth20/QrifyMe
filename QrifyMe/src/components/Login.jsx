import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // Update form state when inputs change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/login", {
        username: form.username,
        password: form.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        swal({
          text: "Login Successfully!",
          icon: "success",
          buttons: false,
          timer: 2000,
        }).then(() => {
          navigate("/dashboard");
        });
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            buttons: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to{" "}
          <span className="text-3xl font-semibold text-black">QrifyMe</span>
        </h1>
        <p className="text-sm text-gray-500">
          Effortlessly update your digital menu.
        </p>
        <br />
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-left text-gray-700"
            >
              Username / ID
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-left text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-900 transition-colors"
          >
            Login
          </button>
        </form>
        <br />
        <p className="text-sm text-gray-700">
          Don't have an account?{" "}
          <button
            className="text-blue-700 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
    <Footer></Footer>
    </>

  );
};

export default Login;
