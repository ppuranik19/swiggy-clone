import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const showSideMenu = () => {
    setToggle(!toggle);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setToggle(false); // Close sidebar menu on navigation (optional)
  };

  const links = [
    {
      name: "Search",
      icon: <IoIosSearch />,
      path: "/search",
    },
    {
      name: "SignIn",
      icon: "",
      path: "/onboarding",
    },
    {
      name: "Cart",
      icon: <IoCartOutline />,
      path: "/cart",
    },
  ];

  return (
    <React.Fragment>
      <div
        className="black-overlay w-full h-full fixed duration-500 bg-black/50"
        style={{
          opacity: toggle ? 1 : 0,
          visibility: toggle ? "visible" : "hidden",
          zIndex: 40,
        }}
        onClick={showSideMenu}
      >
        <div
          className="w-80 h-full bg-white absolute duration-300 shadow-xl"
          style={{ left: toggle ? "0%" : "-100%" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Sidebar Menu Content */}
          <div className="p-4">
            <div className="mb-6 pb-4 border-b">
              <img
                src="/images/swiggy.webp"
                alt="swiggy-logo"
                loading="lazy"
                className="w-24"
              />
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((link, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(link.path)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-semibold">{link.name}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <header className="p-3 shadow-md bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Navigate to Home */}
          <div
            className="w-24 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <img
              src="/images/swiggy.webp"
              alt="swiggy-logo"
              loading="lazy"
              className="w-full"
            />
          </div>

          {/* Location Selector */}
          <div className="flex items-center gap-1">
            <span className="font-bold border-b-2 border-black">Bangalore</span>
            <span className="text-gray-500">, Karnataka, India</span>
            <RxCaretDown
              className="text-[#fc8019] font-bold cursor-pointer"
              fontSize={22}
              onClick={showSideMenu}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex list-none gap-8 font-semibold text-[16px]">
            {links.map((link, index) => {
              return (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center gap-2 hover:text-[#fc8019] cursor-pointer transition-colors"
                >
                  {link.icon}
                  {link.name}
                  {link.sup && (
                    <sup className="text-green-600 text-xs">{link.sup}</sup>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
