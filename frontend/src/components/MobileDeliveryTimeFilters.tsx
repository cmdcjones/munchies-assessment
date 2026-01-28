import React from "react";
import { DeliveryTime } from "../types";

interface MobileDeliveryTimeFiltersProps {
  selectedDeliveryTime: DeliveryTime | "";
  onDeliveryTimeChange: (time: DeliveryTime) => void;
}

export const MobileDeliveryTimeFilters: React.FC<
  MobileDeliveryTimeFiltersProps
> = ({ selectedDeliveryTime, onDeliveryTimeChange }) => {
  return (
    <div className="mobile-delivery-filters">
      <h3 className="mobile-filter-label">DELIVERY TIME</h3>
      <div className="mobile-filter-chips">
        {(["0-10", "10-30", "30-60", "60+"] as DeliveryTime[]).map((time) => (
          <button
            key={time}
            onClick={() => onDeliveryTimeChange(time)}
            className={`mobile-filter-chip ${selectedDeliveryTime === time ? "active" : ""}`}
          >
            {time === "60+" ? "1 hour+" : `${time} min`}
          </button>
        ))}
      </div>
    </div>
  );
};
