import React from "react";
import { RestaurantCard } from "./RestaurantCard";
import { Restaurant } from "../types";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

export const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  restaurants,
  loading,
  error,
}) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading restaurants...</p>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="restaurants-grid">
        <p className="no-results">No restaurants found</p>
      </div>
    );
  }

  return (
    <div className="restaurants-grid">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
