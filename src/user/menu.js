import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import menuData from "../assets/food.json"; // Import the JSON file directly

export function MenuPage() {
  const [menuItems, setMenuItems] = useState(
    menuData.menu.map((item) => ({ ...item, quantity: 1 })) // Initialize quantity to 1 for each item
  ); // Set the imported menu data as state
  const [cart, setCart] = useState([]); // Track items in the cart

  // Function to handle adding items to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((cartItem) => cartItem.id === item.id);
      if (itemInCart) {
        // If item already exists in cart, increase quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity }];
    });
  };

  // Function to handle increasing quantity for a specific item
  const increaseQuantity = (itemId) => {
    setMenuItems((prevItems) =>
      prevItems.map((menuItem) =>
        menuItem.id === itemId
          ? { ...menuItem, quantity: menuItem.quantity + 1 }
          : menuItem
      )
    );
  };

  // Function to handle decreasing quantity for a specific item
  const decreaseQuantity = (itemId) => {
    setMenuItems((prevItems) =>
      prevItems.map((menuItem) =>
        menuItem.id === itemId && menuItem.quantity > 1
          ? { ...menuItem, quantity: menuItem.quantity - 1 }
          : menuItem
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {menuItems.map((item, index) => (
        <div key={index} className="flex justify-center">
          <CardContainer className="w-full max-w-xs bg-gradient-to-br from-pink-500 via-yellow-500 to-green-500 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CardBody className="p-4 bg-white dark:bg-gray-500 rounded-lg">
              <CardItem
                translateZ="50"
                className="text-lg font-semibold text-neutral-800 dark:text-white"
              >
                {item.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-600 text-sm mt-2 dark:text-neutral-300"
              >
                {item.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded-lg transition-transform transform hover:scale-105"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-4">
                <CardItem
                  translateZ={20}
                  as="span"
                  className="text-lg font-bold text-neutral-800 dark:text-white"
                >
                  ₹{item.cost}
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="span"
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {item.preferences.join(", ")}
                </CardItem>
              </div>

              {/* Quantity controls and Add to Cart button */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 bg-gray-300 rounded-full text-lg"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-300 rounded-full text-lg"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded-full mt-2 hover:bg-green-600"
                >
                  Add to Cart
                </button>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      ))}
    </div>
  );
}
