import React from "react";
import { Restaurant } from "../types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}) => {
  return (
    <div className={`restaurant-card ${!restaurant.is_open ? "closed" : ""}`}>
      {!restaurant.is_open && restaurant.opens_at && (
        <div className="opens-at">Opens tomorrow at {restaurant.opens_at}</div>
      )}
      <div className="restaurant-image">
        {restaurant.image_url ? (
          <img src={restaurant.image_url} alt={restaurant.name} />
        ) : null}
      </div>
      <button className="restaurant-action">
        <span className="action-arrow">→</span>
      </button>
      <h3 className="restaurant-name">{restaurant.name}</h3>
      <div className="restaurant-content">
        <div className="restaurant-info">
          <div className="restaurant-status">
            <span
              className={`status-dot ${!restaurant.is_open ? "closed" : "open"}`}
            ></span>
            <span className="status-text">
              {!restaurant.is_open ? "Closed" : "Open"}
            </span>
            {restaurant.delivery_time_minutes && restaurant.is_open && (
              <span className="delivery-time">
                {restaurant.delivery_time_minutes} min
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
