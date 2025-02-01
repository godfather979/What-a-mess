import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 via-cyan-600 to-blue-500 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-blue-400 rounded-full opacity-30 blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-36 h-36 bg-cyan-400 rounded-full opacity-20 blur-2xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Title Animation */}
      <motion.h1
        className="text-7xl font-extrabold text-center mb-12 drop-shadow-lg"
        style={{
          fontFamily: "Brasika, sans-serif",
          textShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)",
        }}
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        What A Mess
      </motion.h1>

      {/* Button Container */}
      <div className="flex space-x-8">
        {/* User Button */}
        <motion.button
          className="bg-white text-cyan-600 font-semibold px-8 py-4 rounded-lg shadow-2xl text-lg transition duration-300 hover:bg-cyan-500 hover:text-white"
          style={{ fontFamily: "Brasika, sans-serif" }}
          whileHover={{
            scale: 1.1,
            rotate: -3,
            boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/user/shop">User</Link>
        </motion.button>

        {/* Admin Button */}
        <motion.button
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-2xl text-lg transition duration-300 hover:bg-blue-500 hover:text-white"
          style={{ fontFamily: "Brasika, sans-serif" }}
          whileHover={{
            scale: 1.1,
            rotate: 3,
            boxShadow: "0px 0px 15px rgba(0, 100, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/admin/track">Admin</Link>
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
