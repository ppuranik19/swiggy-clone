// App.js
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout

const LandingPage = lazy(() => import("./Pages/LandingPage"));
const UserOnboardingPage = lazy(() => import("./Pages/UserOnboardingPage"));
const NoPageFound = lazy(() => import("./Pages/NoPageFound"));
const SearchPage = lazy(() => import("./Pages/SearchPage"));
const RestaurantPage = lazy(() => import("./Pages/RestaurantPage"));
const RestaurantDetail = lazy(() => import("./Pages/RestaurantDetail"));
const RecommendedPage = lazy(() => import("./Pages/RecommendedPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Pages WITHOUT header */}
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NoPageFound />} />

            {/* Pages WITH header - wrapped in Layout */}
            <Route
              path="/onboarding"
              element={
                <Layout>
                  <UserOnboardingPage />
                </Layout>
              }
            />

            <Route
              path="/search"
              element={
                <Layout>
                  <SearchPage />
                </Layout>
              }
            />

            <Route
              path="/search/:query"
              element={
                <Layout>
                  <SearchPage />
                </Layout>
              }
            />

            <Route
              path="/restaurant"
              element={
                <Layout>
                  <RestaurantPage />
                </Layout>
              }
            />

            <Route
              path="/recommended"
              element={
                <Layout>
                  <RecommendedPage />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <CartPage />
                </Layout>
              }
            />

            <Route
              path="/foodoption/:slug"
              element={
                <Layout>
                  <RestaurantDetail />
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
