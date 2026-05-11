import React from "react";
import Navbar from "../components/LandingPageComponents/Navbar";
import Hero from "../components/LandingPageComponents/Hero";
import Services from "../components/LandingPageComponents/Services";
import FoodOption from "../components/LandingPageComponents/FoodOption";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="bg-[#FC8019]">
        <Navbar />
        <Hero />
        <Services />
      </div>
      <FoodOption />
    </React.Fragment>
  );
};

export default LandingPage;
