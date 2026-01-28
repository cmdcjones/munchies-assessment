import React from "react";
import { Filter } from "../types";
interface CategoryPillsProps {
  filters: Filter[];
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  filters,
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <div className="category-pills">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(String(filter.id))}
          className={`category-pill ${selectedFilter === String(filter.id) ? "active" : ""}`}
        >
          <span>{filter.name}</span>
          <div className="category-image">
            <img src={filter.image_url} alt={filter.name} />
          </div>
        </button>
      ))}
    </div>
  );
};
