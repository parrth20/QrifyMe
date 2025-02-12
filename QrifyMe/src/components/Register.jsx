import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  // Update form state as user types
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle registration
  const register = () => {
    if (form.password !== form.confirm_password) {
      swal({ text: "Passwords do not match", icon: "error" });
      return;
    }

    axios
      .post("http://localhost:3000/register", {
        username: form.username,
        password: form.password,
        confirmPassword: form.confirm_password,
      })
      .then((res) => {
        swal({ text: res.data.title, icon: "success" });
        navigate("/login"); // Redirect to login after successful registration
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
        });
      });
  };

  return (<>
  <Navbar></Navbar>

    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to{" "}
          <span className="text-3xl font-semibold text-black">QrifyMe</span>
        </h1>
        <p className="text-sm text-gray-500">
        Join QrifyMe to effortlessly update your digital menu.
        </p>
        <br />
        <div className="space-y-5">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="User Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={onChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            onClick={register}
            disabled={
              form.username === "" ||
              form.password === "" ||
              form.confirm_password === ""
            }
            className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-900 transition-colors"
          >
            Register
          </button>
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <button
              className="text-blue-700 hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>

  );
};

export default Register;
