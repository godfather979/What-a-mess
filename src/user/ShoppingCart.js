import React, { useState } from "react";
import {
  X,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Gift,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  MessageCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Masala Dosa",
      price: 120,
      quantity: 2,
      reviews: ["Delicious and creamy!", "Perfect for summer days!"],
    },
    {
      id: 2,
      name: "Chole Bhature",
      price: 149,
      quantity: 1,
      reviews: ["Strong and refreshing.", "Loved the packaging!"],
    },
    {
      id: 3,
      name: "Egg Curry",
      price: 45,
      quantity: 1,
      reviews: ["Soft and fresh.", "Great for sandwiches!"],
    },
  ]);

  const [preference, setPreference] = useState("veg");
  const recommendations = {
    veg: ["Paneer Tikka", "Veg Biryani", "Mango Lassi"],
    nonveg: ["Chicken Biryani", "Fish Curry", "Butter Chicken"],
    jan: ["Dal Khichdi", "Fruit Salad", "Milkshake"],
  };

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="col-span-2 space-y-6">
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-cyan-500 to-cyan-500 text-white p-2 rounded-lg">
                Your Shopping Cart
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <p className="text-blue-600 font-medium">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                        className="p-2 rounded-full hover:bg-red-100 text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendation Section */}
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-cyan-500 to-cyan-500 text-white p-2 rounded-lg">
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setPreference("veg")}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Veg
                </button>
                <button
                  onClick={() => setPreference("nonveg")}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Non-Veg
                </button>
                <button
                  onClick={() => setPreference("jan")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Jain
                </button>
              </div>
              <ul className="list-disc list-inside mt-4">
                {recommendations[preference].map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Reviews and Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-cyan-500 to-cyan-500 text-white p-2 rounded-lg">
                Student Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 rounded-lg bg-gray-50">
                  <h4 className="font-semibold">{item.name}</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {item.reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Checkout Section */}
          <Card className="shadow-lg bg-white p-6 text-center">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md">
              Proceed to Checkout
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
