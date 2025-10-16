import { create } from "zustand";
import api from "../lib/axiosInstance";
import { useAuthStore } from "./authStore";

const API_URL = "/products";

interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductPagination {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  pageSize: number;
}

interface ProductStore {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  pageSize: number;
  loading: boolean;
  error: string | null;

  fetchProducts: (page?: number, limit?: number) => Promise<void>;
  addProduct: (product: Omit<Product, "_id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  pageSize: 10,
  loading: false,
  error: null,

  // ✅ Fetch products with pagination
  fetchProducts: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`${API_URL}?page=${page}&limit=${limit}`);

      // Backend returns: { success, message, data: { products, currentPage, ... } }
      const data: ProductPagination = res.data?.data || {
        products: [],
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        pageSize: limit,
      };

      set({
        products: data.products,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
        pageSize: data.pageSize,
        loading: false,
      });
    } catch (err: any) {
      console.error("Fetch products failed:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  // ✅ Add product
  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().user?.token;
      if (!token) throw new Error("Not authorized, please login first");

      await api.post(API_URL, product, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh paginated list
      await get().fetchProducts(get().currentPage);
      set({ loading: false });
    } catch (err: any) {
      console.error("Add product failed:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  // ✅ Update product
  updateProduct: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().user?.token;
      if (!token) throw new Error("Not authorized, please login first");

      await api.put(`${API_URL}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await get().fetchProducts(get().currentPage);
      set({ loading: false });
    } catch (err: any) {
      console.error("Update product failed:", err);
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  // ✅ Delete product
  deleteProduct: async (id) => {
    set({ error: null });
    try {
      const token = useAuthStore.getState().user?.token;
      if (!token) throw new Error("Not authorized, please login first");

      await api.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await get().fetchProducts(get().currentPage);
    } catch (err: any) {
      console.error("Delete product failed:", err);
      set({
        error: err.response?.data?.message || err.message,
      });
    }
  },
}));
