import React, { useState } from "react";
import menuData from "../assets/food.json"; // Assuming your menu JSON is in the assets folder
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import sw from "../images/sandwich.jpg"


import { motion } from "framer-motion";


const Shop = () => {

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showTickImage, setShowTickImage] = useState(false); // State for the tick image notification
  const [isShaking, setIsShaking] = useState(false); // State for shake effect

  const filteredMenu = menuData.menu.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Trigger shake effect
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Reset after shake
  };

  const removeFromCart = (productName) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.name !== productName)
    );
  };

  const increaseQuantity = (productName) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productName) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.name === productName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  const handleBuyNowClick = () => {
    navigate("/user/cart");
  };

  const handlePayment = () => {
    // Simulate a successful payment
    setPaymentSuccess(true);
    setCartItems([]); // Clear the cart after successful payment
    setIsPaymentModalOpen(false);

    // Show success notification and tick image
    setShowTickImage(true);
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
      setShowTickImage(false); // Hide the tick image notification after 3 seconds
    }, 3000);
  };

  return (
    <>
    

      
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-white py-12 px-4">
        {/* Centered Search Bar */}
        <motion.div
  className="w-full max-w-lg mx-auto mb-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>

<Link to="/user/wallet">
          <motion.button
            className="absolute top-4 right-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Wallet
          </motion.button>
        </Link>
  <input
    type="text"
    className="w-full py-2 px-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
    placeholder="Search products..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
</motion.div>

<motion.button
  onClick={toggleCart}
  className={`flex items-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out ${
    isShaking ? "animate-shake" : ""
  }`}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 mr-2"
  >
    <path d="M6 2L6 6H20L18 18H6L4 6H1" />
  </svg>
  <span className="text-lg">Cart</span>
  <span className="ml-2 font-bold text-xl">{cartItems.length}</span>
</motion.button>

{/* Cart Modal */}
{isCartOpen && (
  <div
    className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-96 max-h-[70vh] z-50 overflow-y-auto"
    style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
  >
    <div className="flex justify-between items-center border-b p-4 border-cyan-500">
      <h3 className="text-lg font-semibold text-cyan-600">Your Cart</h3>
      <button
        onClick={closeCart}
        className="text-cyan-600 hover:text-cyan-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    {/* Product List Section */}
    <motion.div
      className="p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
    >
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No items in the cart.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.name}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <p className="font-semibold text-cyan-600">{item.name}</p>
              <p className="text-gray-500">₹{item.cost.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-cyan-600 hover:text-cyan-800"
                onClick={() => decreaseQuantity(item.name)}
              >
                -
              </button>
              <span className="text-sm text-gray-600">x{item.quantity}</span>
              <button
                className="text-cyan-600 hover:text-cyan-800"
                onClick={() => increaseQuantity(item.name)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.name)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </motion.div>

    {/* Total Price and Buy Button */}
    <div className="border-t p-4 flex justify-between items-center">
      <div className="font-semibold text-lg">Total:</div>
      <div className="text-cyan-600 text-lg">₹{totalPrice.toFixed(2)}</div>
    </div>
    <button
      className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg mt-4"
      onClick={handleBuyNowClick}
    >
      Buy Now
    </button>
  </div>
)}

{/* Product Grid */}
<motion.div
  className="p-4"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.5,
    delay: 0.25,
    ease: "easeInOut",
  }}
>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
    {filteredMenu.map((item) => (
      <div
        key={sw}
        className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl p-6 flex flex-col justify-between"
      >
        <div className="flex flex-col items-center">
          <img
            src={sw}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-cyan-600 text-center mb-2">
            {item.name}
          </h3>
          <p className="text-gray-600 text-center mb-2">{item.description}</p>
          <p className="text-2xl font-bold text-cyan-600 text-center mb-4">
            ₹{item.cost.toFixed(2)}
          </p>
        </div>
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    ))}
  </div>
</motion.div>

      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <p className="mb-4">Total: ₹{totalPrice.toFixed(2)}</p>
            <button
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
              onClick={handlePayment}
            >
              Pay
            </button>
          </div>
        </div>
      )}

      {/* Stylish Success Notification */}
      {showTickImage && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center"
        >
          <img src= '/tick.png' alt="Payment Successful" className="w-20 h-20 mb-4" />
          <p className="text-green-600 font-semibold text-lg">Payment Successful!</p>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fadeIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4M5 12a7 7 0 0114 0 7 7 0 01-14 0z"
            />
          </svg>
          <span>Order placed successfully!</span>
        </div>
      )}

    
    </>
  );
};

export default Shop;
