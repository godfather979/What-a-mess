import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-cyan-400 to-blue-600 text-white">
      {/* Title Animation */}
      <motion.h1
        className="text-6xl font-extrabold mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        What A Mess
      </motion.h1>

      {/* Button Container */}
      <div className="flex space-x-6">
        {/* User Button */}
        <motion.button
          className="bg-white text-cyan-600 font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 hover:bg-cyan-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/user/shop">User</Link>
        </motion.button>

        {/* Admin Button */}
        <motion.button
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 hover:bg-blue-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/admin/track">Admin</Link>
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
