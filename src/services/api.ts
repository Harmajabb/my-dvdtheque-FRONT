import axios from "axios";
import type { AuthUser, Dvd, DvdListResponse } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// token jwt interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
