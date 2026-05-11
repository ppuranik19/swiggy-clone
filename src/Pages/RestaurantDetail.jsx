// src/components/RestaurantDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import RestaurantCard from "../components/RestaurantComponents/RestaurantCard";
import { IoMdArrowBack } from "react-icons/io";

const RestaurantDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [restaurantCards, setRestaurantCards] = useState([]);

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef(null);
  const hasFetchedRef = useRef(false);

  // Fetch function
  const fetchRestaurantData = async (url) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setLoading(true);
      setError(null);

      const proxyUrl = `http://localhost:5000/api/swiggy-proxy?url=${encodeURIComponent(url)}`;

      const response = await fetch(proxyUrl, {
        signal: abortController.signal,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (isMountedRef.current && !abortController.signal.aborted) {
        // Extract cards from index 4 to 12
        const cards = data?.data?.cards;
        if (cards && Array.isArray(cards)) {
          const targetCards = cards.slice(4, 13);
          const restaurantInfoList = [];

          targetCards.forEach((card, index) => {
            const actualIndex = index + 4;
            const restaurantInfo = card?.card?.card?.info;
            const gridRestaurants =
              card?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            if (restaurantInfo) {
              restaurantInfoList.push({
                cardIndex: actualIndex,
                type: "single",
                data: restaurantInfo,
              });
            } else if (gridRestaurants && Array.isArray(gridRestaurants)) {
              gridRestaurants.forEach((restaurant, idx) => {
                if (restaurant?.info) {
                  restaurantInfoList.push({
                    cardIndex: actualIndex,
                    type: "collection",
                    subIndex: idx,
                    data: restaurant.info,
                  });
                }
              });
            }
          });

          setRestaurantCards(restaurantInfoList);
        }

        setLoading(false);
      }
    } catch (error) {
      if (error.name !== "AbortError" && isMountedRef.current) {
        console.error("Error fetching restaurant data:", error);
        let errorMessage = "Failed to load restaurant data";

        if (
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError")
        ) {
          errorMessage =
            "Cannot connect to backend server. Please make sure backend is running on port 5000";
        } else {
          errorMessage = error.message;
        }

        setError(errorMessage);
        setLoading(false);
      }
    }
  };

  // Load data when component mounts
  useEffect(() => {
    hasFetchedRef.current = false;
    const cardData = location.state?.cardData;

    if (cardData?.url) {
      setSelectedItem(cardData);
      if (!hasFetchedRef.current) {
        hasFetchedRef.current = true;
        fetchRestaurantData(cardData.url);
      }
    } else {
      setError("No restaurant data found. Please go back and try again.");
      setLoading(false);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, location.state?.cardData]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleRetry = () => {
    if (selectedItem?.url) {
      hasFetchedRef.current = false;
      fetchRestaurantData(selectedItem.url);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-600"
        >
          <IoMdArrowBack />
          Back
        </button>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600">Loading restaurant data...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-600"
        >
          <IoMdArrowBack />
          Back
        </button>

        <ErrorState error={error} onRetry={handleRetry} />

        {selectedItem && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Restaurant Information
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedItem.title}
              </p>
              <p>
                <strong>Category:</strong> {selectedItem.category}
              </p>
              <p>
                <strong>API URL:</strong>{" "}
                <span className="text-sm break-all">{selectedItem.url}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Success State - Render cards using RestaurantCard component
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <IoMdArrowBack />
          Back
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">
            Found {restaurantCards.length} Restaurants
          </span>
        </div>
      </div>

      {/* Selected Card Info Section */}
      {selectedItem && (
        <div className="mb-8 bg-gradient-to-r from-orange-50 to-white rounded-lg p-6 border border-orange-100">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <img
                src={
                  selectedItem.image?.startsWith("http")
                    ? selectedItem.image
                    : `http://localhost:5000${selectedItem.image || ""}`
                }
                alt={selectedItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/160x160?text=No+Image";
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {selectedItem.title}
              </h1>
              <p className="text-gray-600">{selectedItem.category}</p>
              <p className="text-sm text-gray-500 mt-2">
                Cards extracted from indices 4-12 of the API response
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Cards Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
          🍽️ Restaurants from API Response
        </h2>

        {restaurantCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {restaurantCards.map((restaurant, idx) => (
              <div key={`${restaurant.cardIndex}-${idx}`} className="relative">
                <RestaurantCard response={{ info: restaurant.data }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-yellow-800">
              No restaurant data found in cards 4-12
            </p>
            <button
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Retry Fetch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
