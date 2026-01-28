export interface Restaurant {
  id: string;
  name: string;
  filter_ids: string[];
  rating: number;
  image_url: string;
  delivery_time_minutes: number;
}

export interface Filter {
  id: string;
  name: string;
  image_url: string;
}

export interface RestaurantsApiResponse {
  restaurants: Restaurant[];
}

export interface RestaurantOpenApiResponse {
  restaurant_id: string;
  is_open: boolean;
}

export interface FiltersApiResponse {
  filters: Filter[];
}

export interface ErrorResponse {
  error: string;
  message: string;
}
