import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate,Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-1">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Please login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent pt-4 pb-2 text-gray-700 peer"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm peer-focus:text-purple-500">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent pt-4 pb-2 text-gray-700 peer"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm peer-focus:text-purple-500">
              Password
            </label>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-xl font-semibold shadow-md transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-gray-500 text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to={'/signup'}>
          <span className="text-purple-600 font-semibold cursor-pointer">
            Sign up
          </span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
