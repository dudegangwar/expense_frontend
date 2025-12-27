import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "https://expenser-node.vercel.app",
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'income' | 'expense';
  monthly_budget: number;
}

export const getCategories = async () => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

export default api;
