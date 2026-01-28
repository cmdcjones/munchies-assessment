export interface Restaurant {
  id: string;
  name: string;
  filter_ids: string[];
  rating: number;
  image_url: string;
  delivery_time_minutes: number;
  is_open: boolean;
  opens_at: string;
}

export interface Filter {
  id: string | number;
  name: string;
  image_url?: string;
}

export interface OpenStatus {
  is_open: boolean;
  opens_at: string;
}

export type DeliveryTime = "0-10" | "10-30" | "30-60" | "60+";
