import React from "react";
import { useNavigate } from "react-router-dom";

const NoPageFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Helpful Suggestions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-gray-700 font-semibold mb-3">
              You might want to try:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>✓ Checking the URL for typos</li>
              <li>✓ Going back to the previous page</li>
              <li>✓ Starting from the homepage</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Homepage
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Error 404 • Resource Not Found</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoPageFound;
