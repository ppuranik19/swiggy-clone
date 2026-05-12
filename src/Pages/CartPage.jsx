import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 299,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=150",
      restaurant: "Pizza Hut",
      isVeg: true,
    },
    {
      id: 2,
      name: "Butter Chicken",
      price: 399,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=150",
      restaurant: "Motia Mahal",
      isVeg: false,
    },
    {
      id: 3,
      name: "Veg Biryani",
      price: 249,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21dd4a433?w=150",
      restaurant: "Biryani House",
      isVeg: true,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getDeliveryFee = () => {
    return 40;
  };

  const getTax = () => {
    return getSubtotal() * 0.05; // 5% GST
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee() + getTax();
  };

  const handleCheckout = () => {
    alert("Proceeding to payment gateway...");
    // Here you would integrate your payment gateway
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-[#fc8019] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67312] transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-3">Price</div>
                  <div className="col-span-3">Quantity</div>
                  <div className="col-span-1">Action</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="border-t border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Item Info */}
                      <div className="md:col-span-5 flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}
                            ></span>
                            <span className="text-xs text-gray-500">
                              {item.isVeg ? "Veg" : "Non-Veg"}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.restaurant}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-3">
                        <span className="font-semibold text-gray-800">
                          ₹{item.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">each</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="border border-gray-300 rounded-md p-1 hover:bg-gray-100 transition-colors"
                          >
                            <FaMinus className="w-3 h-3 text-gray-600" />
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="border border-gray-300 rounded-md p-1 hover:bg-gray-100 transition-colors"
                          >
                            <FaPlus className="w-3 h-3 text-gray-600" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Total: ₹{item.price * item.quantity}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div className="md:col-span-1">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <IoCloseOutline className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₹{getDeliveryFee()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5% GST)</span>
                    <span>₹{Math.round(getTax())}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-gray-800 text-lg">
                      <span>Total</span>
                      <span>₹{Math.round(getTotal())}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#fc8019] text-white py-3 rounded-lg font-semibold hover:bg-[#e67312] transition-colors mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full border-2 border-[#fc8019] text-[#fc8019] py-3 rounded-lg font-semibold hover:bg-[#fc8019] hover:text-white transition-colors"
                >
                  Add More Items
                </button>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 text-center">
                    ✅ Safe and secure payments | No hidden charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
