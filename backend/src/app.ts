import express, { Request, Response } from "express";
import cors from "cors";
import axios, { AxiosError } from "axios";
import NodeCache from "node-cache";
import {
  ErrorResponse,
  FiltersApiResponse,
  RestaurantOpenApiResponse,
  RestaurantsApiResponse,
} from "./models";

export const app = express();

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const API_BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.get(
  "/api/restaurants",
  async (
    _req: Request,
    res: Response<RestaurantsApiResponse | ErrorResponse>,
  ) => {
    try {
      const cacheKey = "restaurants";

      const cachedData = cache.get<RestaurantsApiResponse>(cacheKey);
      if (cachedData) {
        return res.json({ ...cachedData });
      }

      const response = await axios.get<RestaurantsApiResponse>(
        `${API_BASE_URL}/restaurants`,
        {
          timeout: 10000,
        },
      );

      cache.set(cacheKey, response.data);

      return res.json({ ...response.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching restaurants:", axiosError.message);
      return res.status(axiosError.response?.status || 500).json({
        error: "Failed to fetch restaurants",
        message: axiosError.message,
      });
    }
  },
);

app.get(
  "/api/filters",
  async (_req: Request, res: Response<FiltersApiResponse | ErrorResponse>) => {
    try {
      const cacheKey = "filters";

      const cachedData = cache.get<FiltersApiResponse>(cacheKey);
      if (cachedData) {
        return res.json({ ...cachedData });
      }

      const response = await axios.get<FiltersApiResponse>(
        `${API_BASE_URL}/filter`,
        {
          timeout: 10000,
        },
      );

      cache.set(cacheKey, response.data);

      return res.json({ ...response.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching filters:", axiosError.message);
      return res.status(axiosError.response?.status || 500).json({
        error: "Failed to fetch filters",
        message: axiosError.message,
      });
    }
  },
);

app.get(
  "/api/open/:id",
  async (
    req: Request,
    res: Response<RestaurantOpenApiResponse | ErrorResponse>,
  ) => {
    try {
      const { id } = req.params;
      const cacheKey = `restaurant_open_${id}`;

      const cachedData = cache.get<RestaurantOpenApiResponse>(cacheKey);
      if (cachedData) {
        return res.json({ ...cachedData });
      }

      const response = await axios.get(`${API_BASE_URL}/open/${id}`, {
        timeout: 10000,
      });

      cache.set(cacheKey, response.data);

      return res.json({ ...response.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching open status:", axiosError.message);
      return res.status(axiosError.response?.status || 500).json({
        error: "Failed to fetch open status",
        message: axiosError.message,
      });
    }
  },
);
