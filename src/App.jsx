import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load components for better performance
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const UserOnboardingPage = lazy(() => import("./Pages/UserOnboardingPage"));
const NoPageFound = lazy(() => import("./Pages/NoPageFound"));
const SearchPage = lazy(() => import("./Pages/SearchPage"));
const RestaurantPage = lazy(() => import("./Pages/RestaurantPage"));
const RestaurantDetail = lazy(() => import("./Pages/RestaurantDetail"));

// Loading component shown while lazy-loaded components are being fetched
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
        {/* Suspense boundary handles the loading state for all lazy components */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Landing Page - Home route */}
            <Route path="/" element={<LandingPage />} />

            {/* User Onboarding Page */}
            <Route path="/onboarding" element={<UserOnboardingPage />} />

            {/* Search Page */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:query" element={<SearchPage />} />

            {/* Restaurant Page with dynamic ID parameter */}
            <Route path="/restaurant" element={<RestaurantPage />} />
            {/* <Route path="/restaurant/:id" element={<RestaurantPage />} /> */}

            <Route path="/foodoption/:slug" element={<RestaurantDetail />} />

            {/* 404 Page - Catch all unmatched routes */}
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
