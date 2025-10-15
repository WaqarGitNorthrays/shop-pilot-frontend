import { create } from 'zustand';

interface FilterStore {
  category: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating';
  searchQuery: string;
  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: 'name' | 'price-low' | 'price-high' | 'rating') => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: 'All',
  priceRange: [0, 1000],
  sortBy: 'name',
  searchQuery: '',
  
  setCategory: (category) => set({ category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () => set({
    category: 'All',
    priceRange: [0, 1000],
    sortBy: 'name',
    searchQuery: '',
  }),
}));
