import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Header,
  FilterSidebar,
  CategoryPills,
  RestaurantGrid,
  MobileDeliveryTimeFilters,
} from "./components";
import type { Restaurant, Filter, OpenStatus, DeliveryTime } from "./types";

const API_BASE = "http://localhost:3001/api";
const DEFAULT_OPEN_TIME = "12 pm";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<
    DeliveryTime | ""
  >("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [selectedFilter, selectedDeliveryTime]);

  const fetchFilters = async () => {
    try {
      const response = await fetch(`${API_BASE}/filters`);
      if (!response.ok) throw new Error("Failed to fetch filters");
      const data = await response.json();
      setFilters(data.filters || []);
    } catch (err) {
      console.error("Error fetching filters:", err);
      setError("Failed to load filters");
    }
  };

  const fetchOpenStatus = async (
    restaurantId: string,
  ): Promise<OpenStatus | null> => {
    try {
      const response = await fetch(`${API_BASE}/open/${restaurantId}`);
      if (!response.ok) return null;
      const data = await response.json();
      return {
        is_open: data.is_open,
        opens_at: DEFAULT_OPEN_TIME,
      };
    } catch (err) {
      console.error(`Error fetching open status for ${restaurantId}:`, err);
      return null;
    }
  };

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/restaurants`);
      if (!response.ok) throw new Error("Failed to fetch restaurants");

      const data = await response.json();
      let restaurantList: Restaurant[] = data.restaurants || [];

      const restaurantsWithStatus = await Promise.all(
        restaurantList.map(async (restaurant) => {
          const openStatus = await fetchOpenStatus(restaurant.id);
          return {
            ...restaurant,
            is_open: openStatus?.is_open ?? false,
            opens_at: openStatus?.opens_at ?? DEFAULT_OPEN_TIME,
          };
        }),
      );

      let filteredRestaurants = restaurantsWithStatus;

      if (selectedFilter) {
        filteredRestaurants = filteredRestaurants.filter((restaurant) =>
          restaurant.filter_ids?.includes(selectedFilter),
        );
      }

      if (selectedDeliveryTime) {
        filteredRestaurants = filterByDeliveryTime(
          filteredRestaurants,
          selectedDeliveryTime,
        );
      }

      setRestaurants(filteredRestaurants);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterByDeliveryTime = (
    restaurants: Restaurant[],
    time: DeliveryTime,
  ): Restaurant[] => {
    return restaurants.filter((restaurant) => {
      if (!restaurant.delivery_time_minutes) {
        return true;
      }

      if (!restaurant.is_open) {
        return false;
      }

      const deliveryMinutes = restaurant.delivery_time_minutes;

      switch (time) {
        case "0-10":
          return deliveryMinutes <= 10;
        case "10-30":
          return deliveryMinutes > 10 && deliveryMinutes <= 30;
        case "30-60":
          return deliveryMinutes > 30 && deliveryMinutes <= 60;
        case "60+":
          return deliveryMinutes >= 60;
        default:
          return true;
      }
    });
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId === selectedFilter ? "" : filterId);
  };

  const handleDeliveryTimeChange = (time: DeliveryTime) => {
    setSelectedDeliveryTime(time === selectedDeliveryTime ? "" : time);
  };

  return (
    <div className="app">
      <Header />

      <div className="main-container">
        <FilterSidebar
          filters={filters}
          selectedFilter={selectedFilter}
          selectedDeliveryTime={selectedDeliveryTime}
          onFilterChange={handleFilterChange}
          onDeliveryTimeChange={handleDeliveryTimeChange}
        />

        <div className="main">
          <MobileDeliveryTimeFilters
            selectedDeliveryTime={selectedDeliveryTime}
            onDeliveryTimeChange={handleDeliveryTimeChange}
          />

          <CategoryPills
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          <h1 className="restaurant-header">Restaurants</h1>

          <RestaurantGrid
            restaurants={restaurants}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
