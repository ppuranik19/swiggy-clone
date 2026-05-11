import React from "react";
import logo from "../../../public/images/swiggy.webp";
import { Link, Links } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between px-6 md:px-16 py-4 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-md cursor-pointer">
          <img src={logo} alt="logo" className="w-24 " />
          <h1 className="font-bold text-xl">Swiggy</h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8">
          <p>Swiggy Corporate</p>
          <p>Partner with us</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="border border-white px-4 py-2 rounded-full">
            Get the App
          </button>
          <Link to="/onboarding">
            <button className="bg-black px-5 py-2 rounded-full cursor-pointer shadow-2xl">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
