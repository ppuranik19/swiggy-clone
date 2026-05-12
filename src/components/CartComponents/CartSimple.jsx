import React, { useState } from "react";

const CartSimple = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Margherita Pizza", price: 299, quantity: 1 },
    { id: 2, name: "Butter Chicken", price: 399, quantity: 2 },
    { id: 3, name: "Garlic Naan", price: 49, quantity: 3 },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity < 1) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Cart is Empty</h2>
        <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border-b py-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price} each</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="bg-gray-200 w-8 h-8 rounded"
              >
                -
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="bg-gray-200 w-8 h-8 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>

            <div className="font-semibold">₹{item.price * item.quantity}</div>
          </div>
        ))}

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{getTotal()}</span>
          </div>
          <button className="w-full mt-4 bg-orange-500 text-white py-3 rounded">
            Checkout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartSimple;
