import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Alert from "./Alert";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert msg={error} />}
      <form
        onSubmit={handleSubmit}
        className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="ejemplo@ejemplo.com"
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="******"
          />
        </div>
        <button className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
