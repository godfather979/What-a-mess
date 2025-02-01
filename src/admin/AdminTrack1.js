import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingBag,
  User,
  Coffee,
  Check,
  X,
  RefreshCcw,
  Filter,
  ChevronDown,
} from "lucide-react";

const AdminTrack = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Smith",
      items: "Double Cheese Burger, French Fries",
      status: "Processing",
      time: "12:30 PM",
      total: "$24.99",
    },
    {
      id: 2,
      customer: "Emma Watson",
      items: "Margherita Pizza, Coke",
      status: "Processing",
      time: "12:40 PM",
      total: "$18.50",
    },
    {
      id: 3,
      customer: "Liam Parker",
      items: "Alfredo Pasta, Garlic Bread",
      status: "Processing",
      time: "12:45 PM",
      total: "$21.75",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, orders]);

  const handleOrderComplete = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Completed" } : order
      )
    );
  };

  const handleOrderCancel = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Canceled" } : order
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 w-full z-50 overflow-auto">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Order Dashboard
          </h2>
          <p className="text-gray-600 mt-2">
            Manage and track all orders in real-time
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white rounded-full transition-all">
            <RefreshCcw className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-white rounded-full transition-all">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8"
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by customer, items, or status..."
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-indigo-500" />
            <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Active Orders</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {orders.filter((order) => order.status === "Processing").length}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">
              Today
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Completed</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {orders.filter((order) => order.status === "Completed").length}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full">
              Today
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Canceled</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {orders.filter((order) => order.status === "Canceled").length}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-500" />
            <span className="text-xs font-semibold text-purple-500 bg-purple-50 px-2 py-1 rounded-full">
              Average
            </span>
          </div>
          <h3 className="text-gray-600 font-medium">Wait Time</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">15 min</p>
        </motion.div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  variants={itemVariants}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      #{order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {order.customer}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Coffee className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {order.items}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {order.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.status === "Processing" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOrderComplete(order.id)}
                          className="inline-flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Complete
                        </button>
                        <button
                          onClick={() => handleOrderCancel(order.id)}
                          className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTrack;
