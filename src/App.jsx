import React from "react";
import Header from "./components/Header";
import Category from "./components/Category";
import TopRestaurant from "./components/TopRestaurant";
import OnlineDelivery from "./components/OnlineDelivery";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Category />
      <TopRestaurant />
      <OnlineDelivery />
    </React.Fragment>
  );
};

export default App;
