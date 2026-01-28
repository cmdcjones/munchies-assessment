import React from "react";
import { DeliveryTime, Filter } from "../types";

interface FilterSidebarProps {
  filters: Filter[];
  selectedFilter: string;
  selectedDeliveryTime: DeliveryTime | "";
  onFilterChange: (filterId: string) => void;
  onDeliveryTimeChange: (time: DeliveryTime) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedFilter,
  selectedDeliveryTime,
  onFilterChange,
  onDeliveryTimeChange,
}) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Filter</h2>

      <div className="filter-section">
        <h3 className="filter-heading">FOOD CATEGORY</h3>
        <div className="filter-list">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(String(filter.id))}
              className={`filter-chip ${selectedFilter === String(filter.id) ? "active" : ""}`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-heading">DELIVERY TIME</h3>
        <div className="filter-chips">
          {(["0-10", "10-30", "30-60", "60+"] as DeliveryTime[]).map((time) => (
            <button
              key={time}
              onClick={() => onDeliveryTimeChange(time)}
              className={`filter-chip ${selectedDeliveryTime === time ? "active" : ""}`}
            >
              {time === "60+" ? "1 hour+" : `${time} min`}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-heading">PRICE RANGE</h3>
        <div className="filter-chips">
          {[1, 2, 3, 4].map((price) => (
            <button key={price} className={`filter-chip`}>
              {"$".repeat(price)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
