import React, { useState } from "react";
import { AlertCircle, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Inventory = () => {
  const currentOrders = [
    {
      id: "ORD001",
      items: ["Chocolate Ice Cream", "Cold Coffee", "White Bread"],
    },
    {
      id: "ORD002",
      items: ["Pepsi", "Plain Dahi", "Tomatoes"],
    },
  ];

  const [inventory, setInventory] = useState({
    "Cold Storage": {
      "Ice Creams": [
        {
          name: "Chocolate Ice Cream",
          brand: "Havmor",
          quantity: 5,
          minThreshold: 3,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Vanilla Ice Cream",
          brand: "Amul",
          quantity: 8,
          minThreshold: 3,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Butterscotch Ice Cream",
          brand: "Kwality Walls",
          quantity: 2,
          minThreshold: 3,
          icon: "/api/placeholder/48/48",
        },
      ],
      Dairy: [
        {
          name: "Plain Dahi",
          brand: "Amul",
          quantity: 12,
          minThreshold: 5,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Greek Yogurt",
          brand: "Epigamia",
          quantity: 6,
          minThreshold: 4,
          icon: "/api/placeholder/48/48",
        },
      ],
      Beverages: [
        {
          name: "Pepsi",
          brand: "Pepsi",
          quantity: 24,
          minThreshold: 10,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Cold Coffee",
          brand: "Raw Pressery",
          quantity: 0,
          minThreshold: 5,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Sprite",
          brand: "Coca-Cola",
          quantity: 15,
          minThreshold: 10,
          icon: "/api/placeholder/48/48",
        },
      ],
    },
    "Fresh Produce": {
      Vegetables: [
        {
          name: "Tomatoes",
          brand: "Local",
          quantity: 3,
          minThreshold: 5,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Onions",
          brand: "Local",
          quantity: 10,
          minThreshold: 5,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Potatoes",
          brand: "Local",
          quantity: 15,
          minThreshold: 8,
          icon: "/api/placeholder/48/48",
        },
      ],
      Fruits: [
        {
          name: "Apples",
          brand: "Local",
          quantity: 20,
          minThreshold: 10,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Bananas",
          brand: "Local",
          quantity: 25,
          minThreshold: 12,
          icon: "/api/placeholder/48/48",
        },
      ],
    },
    "Everyday Essentials": {
      "Bread & Bakery": [
        {
          name: "White Bread",
          brand: "Britannia",
          quantity: 1,
          minThreshold: 4,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Brown Bread",
          brand: "English Oven",
          quantity: 6,
          minThreshold: 4,
          icon: "/api/placeholder/48/48",
        },
      ],
      Staples: [
        {
          name: "Wheat Flour",
          brand: "Aashirvaad",
          quantity: 8,
          minThreshold: 5,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Rice",
          brand: "India Gate",
          quantity: 15,
          minThreshold: 8,
          icon: "/api/placeholder/48/48",
        },
        {
          name: "Sugar",
          brand: "Local",
          quantity: 20,
          minThreshold: 10,
          icon: "/api/placeholder/48/48",
        },
      ],
    },
  });

  const updateQuantity = (category, subcategory, itemName, change) => {
    setInventory((prev) => {
      const newInventory = { ...prev };
      const items = newInventory[category][subcategory];
      const itemIndex = items.findIndex((item) => item.name === itemName);
      if (itemIndex !== -1 && items[itemIndex].quantity + change >= 0) {
        items[itemIndex] = {
          ...items[itemIndex],
          quantity: items[itemIndex].quantity + change,
        };
      }
      return newInventory;
    });
  };

  const checkOrderAlerts = () => {
    const alerts = [];
    currentOrders.forEach((order) => {
      order.items.forEach((itemName) => {
        for (const category in inventory) {
          for (const subcategory in inventory[category]) {
            const item = inventory[category][subcategory].find(
              (i) => i.name === itemName
            );
            if (item && item.quantity === 0) {
              alerts.push(
                `Alert: ${itemName} is out of stock and needed for Order #${order.id}`
              );
            }
          }
        }
      });
    });
    return alerts;
  };

  const alerts = checkOrderAlerts();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full z-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Inventory Management
        </motion.h2>

        {alerts.length > 0 && (
          <div className="mb-8">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg mb-2 shadow-sm"
              >
                <AlertCircle className="h-5 w-5" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {Object.entries(inventory).map(([category, subcategories]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-gray-800">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(subcategories).map(
                      ([subcategory, items]) => (
                        <motion.div
                          key={subcategory}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          viewport={{ once: true }}
                          className="bg-white rounded-lg p-6 shadow-sm"
                        >
                          <h4 className="text-lg font-semibold mb-4 text-gray-800">
                            {subcategory}
                          </h4>
                          <div className="space-y-4">
                            {items.map((item) => (
                              <div
                                key={item.name}
                                className={`p-4 rounded-lg border transition-all duration-200 ${
                                  item.quantity === 0
                                    ? "bg-gradient-to-r from-red-50 to-red-100 border-red-200"
                                    : item.quantity <= item.minThreshold
                                    ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200"
                                    : "bg-gradient-to-r from-green-50 to-green-100 border-green-200"
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-3">
                                    <div>
                                      <h5 className="font-semibold text-gray-800">
                                        {item.name}
                                      </h5>
                                      <p className="text-sm text-gray-600">
                                        {item.brand}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          category,
                                          subcategory,
                                          item.name,
                                          -1
                                        )
                                      }
                                      className="p-1 rounded bg-white/80 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="font-medium w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          category,
                                          subcategory,
                                          item.name,
                                          1
                                        )
                                      }
                                      className="p-1 rounded bg-white/80 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                                {item.quantity <= item.minThreshold && (
                                  <div className="text-sm text-yellow-700 mt-2 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Low stock - Reorder soon
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
