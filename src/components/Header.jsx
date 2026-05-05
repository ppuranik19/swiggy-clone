import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const showSideMenu = () => {
    setToggle(!toggle);
  };
  const links = [
    {
      name: "Search",
      icon: <IoIosSearch />,
    },
    {
      name: "Offer",
      icon: <CiDiscount1 />,
      sup: "new",
    },
    {
      name: "Help",
      icon: "",
    },
    {
      name: " SignIn",
      icon: "",
    },
    {
      name: "Cart",
      icon: <IoCartOutline />,
    },
  ];
  return (
    <React.Fragment>
      <div
        className="black-overlay w-full h-full fixed duration-500"
        style={{
          opacity: toggle ? 1 : 0,
          visibility: toggle ? "visible" : "hidden",
        }}
        onClick={showSideMenu}
      >
        <div
          className="w-125 h-full bg-white absolute duration-300 "
          style={{ left: toggle ? "0%" : "-100%" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></div>
      </div>
      <header className="p-3 shadow-xl text-[#686b78] sticky top-0 bg-white -z-[-9999]">
        <div className="max-w-300 mx-auto  flex items-center">
          <div className="w-25">
            <img
              src="/images/swiggy.webp"
              alt="swewwiggy-logo"
              loading="lazy"
              className="w-full"
            />
          </div>
          <div className="">
            <span className="font-bold  border-b-[3px] border-[black]">
              banagalore
            </span>{" "}
            Karnataka India
            <RxCaretDown
              className="inline  text-[#fc8019] font-bold cursor-pointer"
              fontSize={25}
              onClick={showSideMenu}
            />
          </div>
          <nav className="flex list-none gap-10 ml-auto font-semibold text-[18px]">
            {links.map((link, index) => {
              return (
                <>
                  <li
                    className="flex items-center gap-2 hover:text-[#fc8019]"
                    key={index}
                  >
                    {link.icon}
                    {link.name}
                    <sup>{link.sup}</sup>
                  </li>
                </>
              );
            })}
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
