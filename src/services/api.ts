import axios from "axios";
import type { AuthUser, Dvd, DvdListResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// token jwt interceptor (exclut les routes d'authentification)
api.interceptors.request.use((config) => {
  const isAuthRoute = config.url?.startsWith("/auth/");
  const token = localStorage.getItem("token");
  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 error for expirated/invalide token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.startsWith("/auth/");
    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Authentification

export const register = async (
  nom: string,
  email: string,
  password: string,
): Promise<void> => {
  await api.post("/auth/register", { nom, email, password });
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthUser> => {
  const response = await api.post<AuthUser>("/auth/login", { email, password });
  return response.data;
};

// Dvds

export const getDvds = async (
  page: number = 1,
  limit: number = 30,
): Promise<DvdListResponse> => {
  const response = await api.get<DvdListResponse>("/dvds", {
    params: { page, limit },
  });
  return response.data;
};

export const getDvdById = async (id: number): Promise<Dvd> => {
  const response = await api.get<Dvd>(`/dvds/${id}`);
  return response.data;
};

export const createDvd = async (dvdData: Partial<Dvd>): Promise<Dvd> => {
  const response = await api.post<Dvd>("/dvds", dvdData);
  return response.data;
};

export const updateDvd = async (
  id: number,
  dvdData: Partial<Dvd>,
): Promise<Dvd> => {
  const response = await api.put<Dvd>(`/dvds/${id}`, dvdData);
  return response.data;
};

export const deleteDvd = async (id: number): Promise<void> => {
  await api.delete(`/dvds/${id}`);
};

export const searchDvds = async (query: string): Promise<Dvd[]> => {
  const response = await api.get<Dvd[]>("/dvds/search", {
    params: { q: query },
  });
  return response.data;
};
